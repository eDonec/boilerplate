/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import { Consumer as KafkaConsumer, Kafka, KafkaConfig } from "kafkajs";

class Consumer<E extends { [eventName: string]: string }> {
  private kafka: Kafka;

  private consumer: KafkaConsumer;

  private isInitialised = false;

  topic: string;

  events: E;

  constructor(possibleEvents: E, topic: string, kafkaConfig?: KafkaConfig) {
    if (!process.env.KAFKA_BROKERS)
      throw new Error("Missing .env key : KAFKA_BROKERS");
    if (!process.env.MICROSERVICE_NAME)
      throw new Error("Missing .env key : MICROSERVICE_NAME");
    this.events = possibleEvents;
    console.log("initializing Kafka consumer connection");

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

  async subscribeToAll<T extends Record<string, unknown>>(
    onMessageReceived: (message: T) => void
  ) {
    await this.init();
    await this.consumer.subscribe({
      topic: new RegExp(`${this.topic}`, "g"),
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        // TODO: update deserializer to follow the same algorithm as serializer
        onMessageReceived(JSON.parse(message.value?.toString() || ""));
      },
    });
  }

  async subscribe<T extends Record<string, unknown>, K extends string>(
    eventName: keyof E,
    onMessageReceived: (message: T, key?: K) => void
  ) {
    await this.init();
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
        // TODO: update deserializer to follow the same algorithm as serializer
        onMessageReceived(
          JSON.parse(message.value?.toString() || "") as T,
          message.key?.toString() as unknown as K
        );
      },
    });

    return this;
  }

  async init() {
    if (this.isInitialised) return this;
    try {
      await this.consumer.connect();
      console.log(
        "Kafka consumer connected successfully you can now send messages"
      );
      this.isInitialised = true;
    } catch (error) {
      console.error("Error connecting to Kafka producer", error);
    }

    return this;
  }
}

export default Consumer;
