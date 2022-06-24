import { HealthEvents, HealthEventsPayload } from "health-types/events";
import Producer from "producer";

const events = Object.values(HealthEvents);

type TSender<EventName extends HealthEvents> = (
  payload: HealthEventsPayload[EventName]
) => Promise<void>;
type EventSenders = {
  [eventName in HealthEvents]: TSender<eventName>;
};
class AuthProducer {
  private producer: Producer<typeof HealthEvents>;

  emit: EventSenders;

  constructor() {
    this.producer = new Producer(HealthEvents);

    const emiter: EventSenders | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      emiter[eventName] = async (
        payload: HealthEventsPayload[typeof eventName]
      ) => {
        await this.producer.send(payload, eventName);
      };
    }
    this.emit = emiter as EventSenders;
  }
}

export default AuthProducer;
