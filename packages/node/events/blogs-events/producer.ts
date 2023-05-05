import { BlogsEvents, BlogsEventsPayload } from "blogs-types/events";
import Producer from "producer";

const events = Object.values(BlogsEvents);

type TSender<EventName extends BlogsEvents> = (
  payload: BlogsEventsPayload[EventName]
) => Promise<void>;
type EventSenders = {
  [eventName in BlogsEvents]: TSender<eventName>;
};
class AuthProducer {
  private producer: Producer<typeof BlogsEvents>;

  emit: EventSenders;

  constructor() {
    this.producer = new Producer(BlogsEvents);

    const emiter: EventSenders | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      emiter[eventName] = async (
        payload: BlogsEventsPayload[typeof eventName]
      ) => {
        await this.producer.send(payload, eventName);
      };
    }
    this.emit = emiter as EventSenders;
  }
}

export default AuthProducer;
