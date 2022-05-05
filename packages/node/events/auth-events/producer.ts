import { AuthEvents, AuthEventsPayload } from "auth-types/events";
import Producer from "producer";

const events = Object.values(AuthEvents);

type EventSenders = {
  [eventName in AuthEvents]: (
    payload: AuthEventsPayload[eventName]
  ) => Promise<void>;
};
class AuthProducer {
  private producer: Producer<typeof AuthEvents>;

  emit: EventSenders;

  constructor() {
    this.producer = new Producer(AuthEvents);

    const emiter: EventSenders | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      emiter[eventName] = async (
        payload: AuthEventsPayload[typeof eventName]
      ) => {
        await this.producer.send(payload, eventName);
      };
    }
    this.emit = emiter as EventSenders;
  }
}

export default AuthProducer;
