import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { RedisClientType } from 'redis';

import {
  REDIS_PUBLISHER,
  REDIS_SUBSCRIBER,
} from 'src/providers/redis.provider';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private logger = new Logger(RedisService.name);

  constructor(
    @Inject(REDIS_PUBLISHER) private readonly publisher: RedisClientType,
    @Inject(REDIS_SUBSCRIBER) private readonly subscriber: RedisClientType,
  ) {}

  onModuleDestroy() {
    this.publisher.disconnect();
    this.subscriber.disconnect();
  }

  async publish(channel: string, message: string) {
    try {
      await this.publisher.publish(channel, message);
    } catch (err) {
      this.logger.error(`Error publishing to Redis channel ${channel}: ${err}`);
    }
  }

  async subscribe(channel: string, callback: (message: string) => void) {
    try {
      await this.subscriber.subscribe(channel, (message) => {
        callback(message);
      });
    } catch (err) {
      this.logger.error(
        `Error subscribing to Redis channel ${channel}: ${err}`,
      );
    }
  }
}
