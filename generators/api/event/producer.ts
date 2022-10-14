import {
  MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREvents,
  MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREventsPayload,
} from "MICROSERVICE_NAME_PLACEHOLDER-types/events";
import Producer from "producer";

const events = Object.values(MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREvents);

type TSender<EventName extends MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREvents> =
  (
    payload: MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREventsPayload[EventName]
  ) => Promise<void>;
type EventSenders = {
  [eventName in MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREvents]: TSender<eventName>;
};
class MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREProducer {
  private producer: Producer<
    typeof MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREvents
  >;

  emit: EventSenders;

  constructor() {
    this.producer = new Producer(MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREvents);

    const emiter: EventSenders | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      emiter[eventName] = async (
        payload: MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREventsPayload[typeof eventName]
      ) => {
        await this.producer.send(payload, eventName);
      };
    }
    this.emit = emiter as EventSenders;
  }
}

export default MICROSERVICE_NAME_UPPERCASE_PLACEHOLDEREProducer;
