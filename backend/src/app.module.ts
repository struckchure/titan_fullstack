import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
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
import { AppService } from './services/app.service';
import { ConsumerService } from './services/consumer.service';
import { PrismaService } from './services/prisma.service';
import { ProducerService } from './services/producer.service';
import { RedisService } from './services/redis.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    AppGateway,
    PrismaService,
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
