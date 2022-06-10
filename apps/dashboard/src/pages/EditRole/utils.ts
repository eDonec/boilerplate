import { LeanRoleDocument } from "auth-types/models/Role";

export const pruneRole = (
  role: Partial<LeanRoleDocument>,
  baseRole: Partial<LeanRoleDocument> | null
) => ({
  name: role.name?.trim(),
  access: role.access?.filter(
    (access) =>
      !baseRole?.access?.find(
        (el) =>
          el.ressource === access.ressource &&
          el.privileges === access.privileges
      )
  ),
});
