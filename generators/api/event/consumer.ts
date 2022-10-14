import Consumer from "consumer";
import { MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents, MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREventsPayload } from "MICROSERVICE_NAME_PLACEHOLDER-types/events";

const events = Object.values(MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents);

type OnMessageReceivedFunc<EventName extends MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents> = (
  message: MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREventsPayload[EventName],
  key?: EventName
) => void;

type TSubscriber<EventName extends MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents> = (
  onMessageReceived: OnMessageReceivedFunc<EventName>
) => Promise<void>;

type Subscribers = {
  [eventName in MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents]: TSubscriber<eventName>;
};
class MICROSERVICE_NAME_UPPERCACE_PLACEHOLDERConsumer {
  private consumer: Consumer<typeof MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents>;

  subscribe: Subscribers;

  subscribeToAll;

  constructor() {
    this.consumer = new Consumer(MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents, "MICROSERVICE_NAME_PLACEHOLDER");
    const sub: Subscribers | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      sub[eventName] = async (
        onMessageReceived: OnMessageReceivedFunc<typeof eventName>
      ) => {
        await this.consumer.subscribe(eventName, onMessageReceived);
      };
    }
    this.subscribe = sub as Subscribers;
    this.subscribeToAll = (
      onMessageReceived: OnMessageReceivedFunc<MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents>
    ) => {
      this.consumer.subscribeToAll(onMessageReceived);
    };
  }
}

export default MICROSERVICE_NAME_UPPERCACE_PLACEHOLDERConsumer;
