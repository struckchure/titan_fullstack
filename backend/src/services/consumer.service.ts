import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import {
  Consumer,
  ConsumerRunConfig,
  ConsumerSubscribeTopics,
  Kafka,
  KafkaJSProtocolError,
} from 'kafkajs';

import { KAFKA_CONNECTION } from '../providers/kafka.provider';

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: Consumer[] = [];

  constructor(@Inject(KAFKA_CONNECTION) private readonly kafka: Kafka) {}

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }

  async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
    try {
      const consumer = this.kafka.consumer({
        groupId: 'titan-kafka',
        allowAutoTopicCreation: true,
      });
      await consumer.connect();
      await consumer.subscribe(topic);
      await consumer.run(config);

      this.consumers.push(consumer);
    } catch (error) {
      if (error instanceof KafkaJSProtocolError) {
        if (error.type === 'UNKNOWN_TOPIC_OR_PARTITION') {
          console.log('first');
        }
      }
    }
  }
}
