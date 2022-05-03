/* eslint-disable no-console */
import { CompressionTypes, Kafka, KafkaConfig, Producer } from "kafkajs";

class KafkaProducer<N extends { [eventName: string]: string }> {
  private kafka: Kafka;

  private producer: Producer;

  private topic: string;

  private events: N;

  constructor(possibleEvents: N, kafkaConfig?: KafkaConfig) {
    if (!process.env.KAFKA_BROKERS)
      throw new Error("Missing .env key : KAFKA_BROKERS");
    if (!process.env.MICROSERVICE_NAME)
      throw new Error("Missing .env key : MICROSERVICE_NAME");
    this.events = possibleEvents;
    console.log("initializing Kafka producer connection");

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
    eventName: keyof N
  ) {
    if (!this.events[eventName])
      throw new Error(
        `Event ${eventName} is not defined in the possible events`
      );

    const response = await this.producer.send({
      topic: `${this.topic}-${eventName}`,
      messages: [{ value: JSON.stringify(message) }],
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
    try {
      await this.producer.connect();
      console.log(
        "Kafka producer connected successfully you can now send messages"
      );
    } catch (error) {
      console.error("Error connecting to Kafka producer", error);
    }

    return this;
  }
}

export default KafkaProducer;
