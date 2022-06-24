import TCustomErrors from "shared-types/Errors";

export enum HealthEvents {
  HealthError = "HealthError",
}

export type HealthEventsPayload = {
  [HealthEvents.HealthError]: TCustomErrors;
};
