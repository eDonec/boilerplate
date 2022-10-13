import Consumer from "consumer";
import { HealthEvents, HealthEventsPayload } from "health-types/events";

const events = Object.values(HealthEvents);

type OnMessageReceivedFunc<EventName extends HealthEvents> = (
  message: HealthEventsPayload[EventName],
  key?: EventName
) => void;

type TSubscriber<EventName extends HealthEvents> = (
  onMessageReceived: OnMessageReceivedFunc<EventName>
) => Promise<void>;

type Subscribers = {
  [eventName in HealthEvents]: TSubscriber<eventName>;
};
class AuthConsumer {
  private consumer: Consumer<typeof HealthEvents>;

  subscribe: Subscribers;

  subscribeToAll;

  constructor() {
    this.consumer = new Consumer(HealthEvents, "health");
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
      onMessageReceived: OnMessageReceivedFunc<HealthEvents>
    ) => {
      this.consumer.subscribeToAll(onMessageReceived);
    };
  }
}

export default AuthConsumer;
