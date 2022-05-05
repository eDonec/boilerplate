# Eventing SDK for Apache Kafka

## Table of contents

- [Eventing SDK for Apache Kafka](#eventing-sdk-for-apache-kafka)
  - [Table of contents](#table-of-contents)
  - [The Producer class](#the-producer-class)
    - [Producer example useage](#producer-example-useage)
  - [The Consumer class](#the-consumer-class)
    - [Consumer example useage](#consumer-example-useage)
  - [The Microservice-events packages](#the-microservice-events-packages)
    - [Event typing](#event-typing)
      - [Event typing example](#event-typing-example)
    - [The Microservice-Producer class](#the-microservice-producer-class)
      - [Example useage for Microservice-Producer class](#example-useage-for-microservice-producer-class)
    - [The Microservice-Consumer class](#the-microservice-consumer-class)
      - [Example for Microservice-Consumer class](#example-for-microservice-consumer-class)

## The Producer class

The producer class is wrapper of the kafkajs client that adds typing and a layer of abstraction on top of it.

This class relies heavily on the existance of two environment variables:

- `KAFKA_BROKERS` that defines the port and host of the kafka brokers.
- `MICROSERVICE_NAME` that will be used and as a prefix of the all topics issued by this instance

For initiation the class needs an enum that defines the list of all the possible events that will be streamed beforehand (to sustain the typing).

It also takes optionally a kafka config object as well.

It then exposes one method `send` that takes a payload message and an event name from the enum previously defined and publishes it to the kafka cluster.

The send method is asynchronous by default but it **MUST** be used in all cases synchronously to defer any computational/networking time from the main thread.

All the rest of connection details are handled internally.

### Producer example useage

```typescript
import Producer from "producer";
enum Events {
  EVENT_1 = "EVENT_1",
  EVENT_2 = "EVENT_2",
}
const producer = new Producer(Events);

producer.send(Events.EVENT_1, {
  message: "Hello World",
  timestamp: new Date(),
});
```

## The Consumer class

The consumer class is wrapper of the kafkajs client that adds typing and a layer of abstraction on top of it.

This class relies heavily on the existance of two environment variables:

- `KAFKA_BROKERS` that defines the port and host of the kafka brokers.
- `MICROSERVICE_NAME` that will be used and as a definition of the groupId of the consumer

For initiation the class needs:

- An enum that defines the list of all the possible events that will be consumed beforehand (to sustain the typing).
- A topic that will be the basis for consumption
  - Each topic is represented by a microservice so if you need to subscribe to multiplu microservices multiple instances of the consumer class **MUST** be defined.
- It also takes optionally a kafka config object as well.

It exposes two methods:

- `subscribe` that takes an eventName (from the enum previously defined) and a callback function that will be called when a message is received. In this method the message can be strongly typed
- `subscribeToAll` that takes a callback function that will be called when a message is received from any of the emited messages from that microservice. In this method the message will be loosely typed.

### Consumer example useage

```typescript
import Consumer from "consumer";
enum Events {
  EVENT_1 = "EVENT_1",
  EVENT_2 = "EVENT_2",
}
const consumer = new Consumer(Events, "topic");

// to subscribe to one specific event
consumer.subscribe(Events.EVENT_1, (message) => {
  console.log(message);
});

// to subscribe to all events
consumer.subscribeToAll((message) => {
  console.log(message);
});
```

## The Microservice-events packages

Furthermore, this package is another layer of abstraction over the Producer and Consumer classes.

it will expose a new class even strongly typed based on the event typings.

The initialisation of these classes must be done under the folder `src/events` of each calling microservice.

### Event typing

Eech microservice **MUST** have its event definition in its type package under `packages/node/api-types/events/index.ts`.
This definition will contain:

- One enum that explains the list of all the possible events that will be emitted by this microservice
- A type for each event payload

#### Event typing example

```typescript
import { AUTH_PROVIDERS } from "shared-types";

export enum AuthEvents {
  UserSuspended = "UserSuspended",
  UserCreated = "UserCreated",
}

export type AuthEventsPayload = {
  [AuthEvents.UserSuspended]: {
    authId: string;
    suspentionLiftTime: Date;
    suspentionReason: string;
  };
  [AuthEvents.UserCreated]: {
    email: string;
    userName?: string;
    role: string;
    authType: string;
    authProvider: AUTH_PROVIDERS[];
  };
};
```

### The Microservice-Producer class

This class takes nothing for parameter and exposes one object `emit` that contains the attributes derived from the Events and as a value they will hold a function that sends these events.

#### Example useage for Microservice-Producer class

```typescript
import AuthProducer from "auth-events/producer";

const producer = new AuthProducer();

producer.emit.UserCreated({
  email,
  userName: newAuthClient.userName,
  role: publicRole.name,
  authType: newAuthClient.authType,
  authProvider: newAuthClient.authProvider,
});
```

### The Microservice-Consumer class

This class takes nothing for parameter and exposes one object `subscribe` that contains the attributes derived from the Events and as a value they will hold a function that subscribes to these events and one function `subscribeToAll`.

The callback function that the `subscribe` and `subscribeToAll` methods will take will be called with the message that is strongly typed and a key that will contain the event full name (`<topic>-<EventName>`).

#### Example for Microservice-Consumer class

```typescript
import AuthConsumer from "auth-events/consumer";
const consumer = new AuthConsumer();

consumer.subscribe.UserSuspended((message) => {
  console.log(message);
});
consumer.subscribeToAll((message) => {
  console.log(message);
});
```
