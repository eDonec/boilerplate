import {
  CategoriesEvents,
  CategoriesEventsPayload,
} from "categories-types/events";
import Consumer from "consumer";

const events = Object.values(CategoriesEvents);

type OnMessageReceivedFunc<EventName extends CategoriesEvents> = (
  message: CategoriesEventsPayload[EventName],
  key?: EventName
) => void;

type TSubscriber<EventName extends CategoriesEvents> = (
  onMessageReceived: OnMessageReceivedFunc<EventName>
) => Promise<void>;

type Subscribers = {
  [eventName in CategoriesEvents]: TSubscriber<eventName>;
};
class CategoriesConsumer {
  private consumer: Consumer<typeof CategoriesEvents>;

  subscribe: Subscribers;

  subscribeToAll;

  constructor() {
    this.consumer = new Consumer(CategoriesEvents, "categories");
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
      onMessageReceived: OnMessageReceivedFunc<CategoriesEvents>
    ) => {
      this.consumer.subscribeToAll(onMessageReceived);
    };
  }
}

export default CategoriesConsumer;
