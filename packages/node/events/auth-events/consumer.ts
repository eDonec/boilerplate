import { AuthEvents, AuthEventsPayload } from "auth-types/events";
import Consumer from "consumer";

const events = Object.values(AuthEvents);

type OnMessageReceivedFunc<EventName extends AuthEvents> = (
  message: AuthEventsPayload[EventName],
  key?: EventName
) => void;

type TSubscriber<EventName extends AuthEvents> = (
  onMessageReceived: OnMessageReceivedFunc<EventName>
) => Promise<void>;

type Subscribers = {
  [eventName in AuthEvents]: TSubscriber<eventName>;
};
class AuthConsumer {
  private consumer: Consumer<typeof AuthEvents>;

  subscribe: Subscribers;

  subscribeToAll;

  constructor() {
    this.consumer = new Consumer(AuthEvents, "auth");
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
      onMessageReceived: OnMessageReceivedFunc<AuthEvents>
    ) => {
      this.consumer.subscribeToAll(onMessageReceived);
    };
  }
}

export default AuthConsumer;
