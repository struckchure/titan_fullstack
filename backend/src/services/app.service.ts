import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Job, JobStatus } from 'generated/prisma';
import { REGEX_VALIDATION_TOPIC, VALIDATE_REGEX_RESPONSE } from 'src/constants';
import { sleep } from 'src/utils';
import { JobsListDto, ValidateRegexDto } from '../dto/app.dto';
import { ConsumerService } from './consumer.service';
import { PrismaService } from './prisma.service';
import { ProducerService } from './producer.service';
import { RedisService } from './redis.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume(
      { topics: [REGEX_VALIDATION_TOPIC] },
      {
        eachMessage: async ({ message }) => {
          await this.handleValidateRegex(message.value.toString());
        },
      },
    );
  }

  async listJobs(dto: JobsListDto) {
    const skip = dto.skip ? +dto.skip : 0;
    const take = dto.limit ? +dto.limit : 10;

    return await this.prismaService.job.findMany({
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });
  }

  async getJob(id: string) {
    const job = await this.prismaService.job.findUnique({ where: { id } });
    if (!job) {
      throw new NotFoundException('job not found');
    }

    return job;
  }

  async validateRegex(dto: ValidateRegexDto) {
    const job = await this.prismaService.job.create({ data: dto });

    await this.producerService.produce({
      topic: REGEX_VALIDATION_TOPIC,
      messages: [{ value: JSON.stringify(job) }],
    });

    return job;
  }

  async handleValidateRegex(payload: string) {
    await sleep(this.configService.get('PROCESSING_DELAY_MS'));

    const dto: Job = JSON.parse(payload);

    let status: JobStatus;
    let error: string | null = null;

    try {
      const regex = new RegExp(dto.regex);
      const isValid = regex.test(dto.input);

      status = isValid ? JobStatus.Valid : JobStatus.Invalid;
    } catch (e) {
      status = JobStatus.Invalid;
      error = e.message;
    }

    const job = await this.prismaService.job.update({
      where: { id: dto.id },
      data: { status, error },
    });

    await this.redisService.publish(
      VALIDATE_REGEX_RESPONSE,
      JSON.stringify(job),
    );
  }
}
