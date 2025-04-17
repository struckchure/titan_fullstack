import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

export const REDIS_PUBLISHER = 'REDIS_PUBLISHER_TOKEN';

export const RedisPublisherProvider: Provider = {
  provide: REDIS_PUBLISHER,
  useFactory: async (configService: ConfigService) => {
    return createClient({ url: configService.get('REDIS_URL') }).connect();
  },
  inject: [ConfigService],
};

export const REDIS_SUBSCRIBER = 'REDIS_SUBSCRIBER_TOKEN';

export const RedisSubscriberProvider: Provider = {
  provide: REDIS_SUBSCRIBER,
  useFactory: async (configService: ConfigService) => {
    return createClient({ url: configService.get('REDIS_URL') }).connect();
  },
  inject: [ConfigService],
};
