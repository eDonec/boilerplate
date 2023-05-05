import Consumer from "consumer";
import { MailingEvents, MailingEventsPayload } from "mailing-types/events";

const events = Object.values(MailingEvents);

type OnMessageReceivedFunc<EventName extends MailingEvents> = (
  message: MailingEventsPayload[EventName],
  key?: EventName
) => void;

type TSubscriber<EventName extends MailingEvents> = (
  onMessageReceived: OnMessageReceivedFunc<EventName>
) => Promise<void>;

type Subscribers = {
  [eventName in MailingEvents]: TSubscriber<eventName>;
};
class MailingConsumer {
  private consumer: Consumer<typeof MailingEvents>;

  subscribe: Subscribers;

  subscribeToAll;

  constructor() {
    this.consumer = new Consumer(MailingEvents, "mailing");
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
      onMessageReceived: OnMessageReceivedFunc<MailingEvents>
    ) => {
      this.consumer.subscribeToAll(onMessageReceived);
    };
  }
}

export default MailingConsumer;
