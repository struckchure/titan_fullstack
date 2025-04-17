import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, Partitioners } from 'kafkajs';

export const KAFKA_CONNECTION = 'KAFKA_CONNECTION_TOKEN';

export const KafkaProvider: Provider = {
  provide: KAFKA_CONNECTION,
  useFactory: (configService: ConfigService) => {
    const brokers = configService.get('KAFKA_BROKERS').split(' ');

    return new Kafka({ brokers });
  },
  inject: [ConfigService],
};

export const KAFKA_PRODUCER = 'KAFKA_PRODUCER_TOKEN';

export const KafkaProducerProvider: Provider = {
  provide: KAFKA_PRODUCER,
  useFactory: (kafka: Kafka) => {
    const producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
      allowAutoTopicCreation: true,
    });

    producer.connect();

    return producer;
  },
  inject: [KAFKA_CONNECTION],
};
