import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { RedisIoAdapter } from './adapter/redis-sockeio.adapter';
import { AppModule } from './app.module';
import { REDIS_PUBLISHER, REDIS_SUBSCRIBER } from './providers/redis.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const redisIoAdapter = new RedisIoAdapter(app);

  const redisClient = app.get<RedisClientType>(REDIS_PUBLISHER);
  const redisSubscriber = app.get<RedisClientType>(REDIS_SUBSCRIBER);
  await redisIoAdapter.connect(redisClient, redisSubscriber);

  await app.listen(3000);
}
bootstrap();
