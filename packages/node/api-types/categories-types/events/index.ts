import TCustomErrors from "shared-types/Errors";

export enum CategoriesEvents {
  CategoriesError = "CategoriesError",
  CategoriesCreated = "CategoriesCreated",
  CategoriesUpdated = "CategoriesUpdated",
  CategoriesDeleted = "CategoriesDeleted",
}

export type CategoriesEventsPayload = {
  [CategoriesEvents.CategoriesError]: TCustomErrors;
  [CategoriesEvents.CategoriesCreated]: {
    filesToPersist: string[];
  };
  [CategoriesEvents.CategoriesDeleted]: {
    filesToDelete: string[];
  };
  [CategoriesEvents.CategoriesUpdated]: {
    filesToPersist: string[];
    filesToDelete: string[];
  };
};
