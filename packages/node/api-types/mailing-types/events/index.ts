import TCustomErrors from "shared-types/Errors";

export enum MailingEvents {
  MailingError = "MailingError",
}

export type MailingEventsPayload = {
  [MailingEvents.MailingError]: TCustomErrors;
};
