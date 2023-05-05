import TCustomErrors from "shared-types/Errors";

export enum BlogsEvents {
  BlogsError = "BlogsError",
  BlogCreated = "BlogCreated",
  BlogUpdated = "BlogUpdated",
  BlogDeleted = "BlogDeleted",
}

export type BlogsEventsPayload = {
  [BlogsEvents.BlogsError]: TCustomErrors;
  [BlogsEvents.BlogCreated]: {
    filesToPersist: string[];
  };
  [BlogsEvents.BlogDeleted]: {
    filesToDelete: string[];
  };
  [BlogsEvents.BlogUpdated]: {
    filesToPersist: string[];
    filesToDelete: string[];
  };
};
