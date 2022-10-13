import { BucketEvents, BucketEventsPayload } from "bucket-types/events";
import Consumer from "consumer";

const events = Object.values(BucketEvents);

type OnMessageReceivedFunc<EventName extends BucketEvents> = (
  message: BucketEventsPayload[EventName],
  key?: EventName
) => void;

type TSubscriber<EventName extends BucketEvents> = (
  onMessageReceived: OnMessageReceivedFunc<EventName>
) => Promise<void>;

type Subscribers = {
  [eventName in BucketEvents]: TSubscriber<eventName>;
};
class AuthConsumer {
  private consumer: Consumer<typeof BucketEvents>;

  subscribe: Subscribers;

  subscribeToAll;

  constructor() {
    this.consumer = new Consumer(BucketEvents, "bucket");
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
      onMessageReceived: OnMessageReceivedFunc<BucketEvents>
    ) => {
      this.consumer.subscribeToAll(onMessageReceived);
    };
  }
}

export default AuthConsumer;
