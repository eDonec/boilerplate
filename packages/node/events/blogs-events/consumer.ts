import { BlogsEvents, BlogsEventsPayload } from "blogs-types/events";
import Consumer from "consumer";

const events = Object.values(BlogsEvents);

type OnMessageReceivedFunc<EventName extends BlogsEvents> = (
  message: BlogsEventsPayload[EventName],
  key?: EventName
) => void;

type TSubscriber<EventName extends BlogsEvents> = (
  onMessageReceived: OnMessageReceivedFunc<EventName>
) => Promise<void>;

type Subscribers = {
  [eventName in BlogsEvents]: TSubscriber<eventName>;
};
class AuthConsumer {
  private consumer: Consumer<typeof BlogsEvents>;

  subscribe: Subscribers;

  subscribeToAll;

  constructor() {
    this.consumer = new Consumer(BlogsEvents, "blogs");
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
      onMessageReceived: OnMessageReceivedFunc<BlogsEvents>
    ) => {
      this.consumer.subscribeToAll(onMessageReceived);
    };
  }
}

export default AuthConsumer;
