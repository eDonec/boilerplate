/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Consumer as KafkaConsumer, Kafka, KafkaConfig } from "kafkajs";

class Consumer<E extends { [eventName: string]: string }> {
  private kafka: Kafka;

  private consumer: KafkaConsumer;

  private listeners: Record<
    keyof E,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    undefined | ((message: any, key: any) => void)
  >;

  private isRunning = false;

  private isInitialised = false;

  topic: string;

  events: E;

  constructor(possibleEvents: E, topic: string, kafkaConfig?: KafkaConfig) {
    if (!process.env.KAFKA_BROKERS)
      throw new Error("Missing .env key : KAFKA_BROKERS");
    if (!process.env.MICROSERVICE_NAME)
      throw new Error("Missing .env key : MICROSERVICE_NAME");
    this.events = possibleEvents;
    // @ts-expect-error this is just an initilizer the real value is assigned on the go
    this.listeners = {};
    Object.keys(possibleEvents).forEach((event: keyof E) => {
      this.listeners[event] = undefined;
    });
    this.topic = topic;
    this.kafka = new Kafka({
      ...(kafkaConfig || {}),
      clientId: process.env.MICROSERVICE_NAME!,
      brokers: [process.env.KAFKA_BROKERS!],
    });
    this.consumer = this.kafka.consumer({
      groupId: `${process.env.MICROSERVICE_NAME!}-${topic}`,
      allowAutoTopicCreation: true,
      heartbeatInterval: 5000,
      retry: {
        retries: 5,
        factor: 2,
      },
    });
  }

  async subscribeToAll<T>(onMessageReceived: (message: T) => void) {
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

  private async messageHandler<T, K extends string>(
    topic: string,
    message: T,
    key?: K
  ) {
    const eventName = topic.split("-")[1] as keyof E;
    const listener = this.listeners[eventName];

    if (!listener) return;

    listener(message, key);
  }

  async subscribe<T, K extends string>(
    eventName: keyof E,
    onMessageReceived: (message: T, key?: K) => void
  ) {
    await this.init();
    if (!this.events[eventName])
      throw new Error(
        `Event ${eventName.toString()} is not defined in the possible events`
      );

    await this.consumer.subscribe({
      topic: `${this.topic}-${eventName.toString()}`,
      fromBeginning: true,
    });

    this.listeners[eventName] = onMessageReceived;

    if (!this.isRunning) {
      this.isRunning = true;
      await this.consumer.run({
        eachMessage: async ({ message, topic }) => {
          // TODO: update deserializer to follow the same algorithm as serializer
          this.messageHandler(
            topic,
            JSON.parse(message.value?.toString() || "") as T,
            message.key?.toString() as unknown as K
          );
        },
      });
    }

    return this;
  }

  async init() {
    if (this.isInitialised) return this;
    try {
      await this.consumer.connect();
      // eslint-disable-next-line no-console
      console.log(
        "Kafka consumer connected successfully you can now send messages"
      );
      this.isInitialised = true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error connecting to Kafka producer", error);
    }

    return this;
  }
}

export default Consumer;
