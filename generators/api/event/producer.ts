import { MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents, MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREventsPayload } from "MICROSERVICE_NAME_PLACEHOLDER-types/events";
import Producer from "producer";

const events = Object.values(MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents);

type TSender<EventName extends MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents> = (
  payload: MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREventsPayload[EventName]
) => Promise<void>;
type EventSenders = {
  [eventName in MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents]: TSender<eventName>;
};
class AuthProducer {
  private producer: Producer<typeof MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents>;

  emit: EventSenders;

  constructor() {
    this.producer = new Producer(MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREvents);

    const emiter: EventSenders | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      emiter[eventName] = async (
        payload: MICROSERVICE_NAME_UPPERCACE_PLACEHOLDEREventsPayload[typeof eventName]
      ) => {
        await this.producer.send(payload, eventName);
      };
    }
    this.emit = emiter as EventSenders;
  }
}

export default AuthProducer;
