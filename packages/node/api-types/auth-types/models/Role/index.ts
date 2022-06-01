import { HydratedDocument, LeanDocument } from "mongoose";
import { ACCESS } from "shared-types";

export type RoleType = {
  isDefault: boolean;
  name: string;
  access: ACCESS[];
};

export type RoleDocument = HydratedDocument<RoleType>;
export type LeanRoleDocument = LeanDocument<RoleDocument>;
