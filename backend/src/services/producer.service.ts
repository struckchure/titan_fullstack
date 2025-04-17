import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Producer, ProducerRecord } from 'kafkajs';

import { KAFKA_PRODUCER } from '../providers/kafka.provider';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  constructor(@Inject(KAFKA_PRODUCER) private readonly producer: Producer) {}

  async onApplicationShutdown() {
    await this.producer.disconnect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }
}
