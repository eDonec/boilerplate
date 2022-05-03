/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import { Consumer, Kafka, KafkaConfig } from "kafkajs";

class KafkaConsumer<N extends { [eventName: string]: string }> {
  private kafka: Kafka;

  private consumer: Consumer;

  topic: string;

  events: N;

  constructor(possibleEvents: N, topic: string, kafkaConfig?: KafkaConfig) {
    if (!process.env.KAFKA_BROKERS)
      throw new Error("Missing .env key : KAFKA_BROKERS");
    if (!process.env.MICROSERVICE_NAME)
      throw new Error("Missing .env key : MICROSERVICE_NAME");
    this.events = possibleEvents;
    console.log("initializing Kafka producer connection");

    this.topic = topic;
    this.kafka = new Kafka({
      ...(kafkaConfig || {}),
      clientId: process.env.MICROSERVICE_NAME!,
      brokers: [process.env.KAFKA_BROKERS!],
    });
    this.consumer = this.kafka.consumer({
      groupId: process.env.MICROSERVICE_NAME!,
      allowAutoTopicCreation: true,
      heartbeatInterval: 5000,
      retry: {
        retries: 5,
        factor: 2,
      },
    });
  }

  async subscribe<T extends Record<string, unknown>>(
    eventName: keyof N,
    onMessageReceived: (message: T) => void
  ) {
    if (!this.events[eventName])
      throw new Error(
        `Event ${eventName} is not defined in the possible events`
      );

    await this.consumer.subscribe({
      topic: `${this.topic}-${eventName}`,
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        onMessageReceived(JSON.parse(message.value?.toString() || ""));
      },
    });

    return this;
  }

  async init() {
    try {
      await this.consumer.connect();
      console.log(
        "Kafka producer connected successfully you can now send messages"
      );
    } catch (error) {
      console.error("Error connecting to Kafka producer", error);
    }

    return this;
  }
}

export default KafkaConsumer;
