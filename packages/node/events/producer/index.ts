/* eslint-disable no-console */
import {
  CompressionTypes,
  Kafka,
  KafkaConfig,
  Producer as KafkaProducer,
} from "kafkajs";

class Producer<E extends { [eventName: string]: string }> {
  private kafka: Kafka;

  private producer: KafkaProducer;

  private isInitialised = false;

  private topic: string;

  private events: E;

  constructor(possibleEvents: E, kafkaConfig?: KafkaConfig) {
    if (!process.env.KAFKA_BROKERS)
      throw new Error("Missing .env key : KAFKA_BROKERS");
    if (!process.env.MICROSERVICE_NAME)
      throw new Error("Missing .env key : MICROSERVICE_NAME");
    this.events = possibleEvents;
    console.log("initializing Kafka producer connection");
    // TODO : make updates to kafka config to user replicas, retries and leader managements
    this.topic = process.env.MICROSERVICE_NAME;
    this.kafka = new Kafka({
      ...(kafkaConfig || {}),
      clientId: process.env.MICROSERVICE_NAME,
      brokers: [process.env.KAFKA_BROKERS],
    });
    this.producer = this.kafka.producer({
      allowAutoTopicCreation: true,
    });
  }

  async send<T extends Record<string, unknown>>(
    message: string | T,
    eventName: keyof E
  ) {
    await this.init();
    if (!this.events[eventName])
      throw new Error(
        `Event ${eventName} is not defined in the possible events`
      );

    const response = await this.producer.send({
      topic: `${this.topic}-${eventName}`,
      // TODO: update serializer to use a more efficient algorithm
      messages: [{ value: JSON.stringify(message), key: eventName as string }],
      compression: CompressionTypes.GZIP,
    });

    if (response[0].errorCode !== 0)
      console.error(
        "Error sending message error code :",
        response[0].errorCode
      );
    else
      console.log(
        `Kafka producer sent message for topic ${response[0].topicName} with base offset ${response[0].baseOffset}`
      );

    return this;
  }

  async init() {
    if (this.isInitialised) return this;
    try {
      await this.producer.connect();
      console.log(
        "Kafka producer connected successfully you can now send messages"
      );
      this.isInitialised = true;
    } catch (error) {
      console.error("Error connecting to Kafka producer", error);
    }

    return this;
  }
}

export default Producer;
