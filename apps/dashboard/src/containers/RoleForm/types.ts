import React from "react";

import { LeanRoleDocument } from "auth-types/models/Role";
import { ACCESS_RESSOURCES } from "shared-types/auth/AccessRessources";

export type RoleFormProps = {
  role: Partial<LeanRoleDocument> | null;
  setRole: React.Dispatch<
    React.SetStateAction<Partial<LeanRoleDocument> | null>
  >;
  baseRole: React.RefObject<Partial<LeanRoleDocument> | null>;
};

export type RessourceItem = {
  title: string;
  ressource: ACCESS_RESSOURCES;
};
