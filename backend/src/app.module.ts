import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './controllers/app.controller';
import { AppGateway } from './controllers/app.gateway';
import {
  KafkaProducerProvider,
  KafkaProvider,
} from './providers/kafka.provider';
import {
  RedisPublisherProvider,
  RedisSubscriberProvider,
} from './providers/redis.provider';
import { Job, JobSchema } from './schemas/job.schema';
import { AppService } from './services/app.service';
import { ConsumerService } from './services/consumer.service';
import { ProducerService } from './services/producer.service';
import { RedisService } from './services/redis.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppGateway,
    ProducerService,
    ConsumerService,
    RedisService,

    RedisPublisherProvider,
    RedisSubscriberProvider,
    KafkaProvider,
    KafkaProducerProvider,
  ],
})
export class AppModule {}
