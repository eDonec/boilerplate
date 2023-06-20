import {
  CategoriesEvents,
  CategoriesEventsPayload,
} from "categories-types/events";
import Producer from "producer";

const events = Object.values(CategoriesEvents);

type TSender<EventName extends CategoriesEvents> = (
  payload: CategoriesEventsPayload[EventName]
) => Promise<void>;
type EventSenders = {
  [eventName in CategoriesEvents]: TSender<eventName>;
};
class CategoriesEProducer {
  private producer: Producer<typeof CategoriesEvents>;

  emit: EventSenders;

  constructor() {
    this.producer = new Producer(CategoriesEvents);

    const emiter: EventSenders | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      emiter[eventName] = async (
        payload: CategoriesEventsPayload[typeof eventName]
      ) => {
        await this.producer.send(payload, eventName);
      };
    }
    this.emit = emiter as EventSenders;
  }
}

export default CategoriesEProducer;
