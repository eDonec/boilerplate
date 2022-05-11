import { ACCESS } from "shared-types";

export type RoleType = {
  isDefault: boolean;
  name: string;
  access: ACCESS[];
};
