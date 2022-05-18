import { BucketEvents, BucketEventsPayload } from "bucket-types/events";
import Producer from "producer";

const events = Object.values(BucketEvents);

type TSender<EventName extends BucketEvents> = (
  payload: BucketEventsPayload[EventName]
) => Promise<void>;
type EventSenders = {
  [eventName in BucketEvents]: TSender<eventName>;
};
class AuthProducer {
  private producer: Producer<typeof BucketEvents>;

  emit: EventSenders;

  constructor() {
    this.producer = new Producer(BucketEvents);

    const emiter: EventSenders | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      emiter[eventName] = async (
        payload: BucketEventsPayload[typeof eventName]
      ) => {
        await this.producer.send(payload, eventName);
      };
    }
    this.emit = emiter as EventSenders;
  }
}

export default AuthProducer;
