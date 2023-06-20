import { MailingEvents, MailingEventsPayload } from "mailing-types/events";
import Producer from "producer";

const events = Object.values(MailingEvents);

type TSender<EventName extends MailingEvents> = (
  payload: MailingEventsPayload[EventName]
) => Promise<void>;
type EventSenders = {
  [eventName in MailingEvents]: TSender<eventName>;
};
class MailingEProducer {
  private producer: Producer<typeof MailingEvents>;

  emit: EventSenders;

  constructor() {
    this.producer = new Producer(MailingEvents);

    const emiter: EventSenders | Record<string, unknown> = {};

    for (let index = 0; index < events.length; index++) {
      const eventName = events[index];

      emiter[eventName] = async (
        payload: MailingEventsPayload[typeof eventName]
      ) => {
        await this.producer.send(payload, eventName);
      };
    }
    this.emit = emiter as EventSenders;
  }
}

export default MailingEProducer;
