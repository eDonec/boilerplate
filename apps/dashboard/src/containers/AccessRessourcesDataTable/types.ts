import React from "react";

import { ACCESS } from "shared-types";
import { ACCESS_RESSOURCES } from "shared-types/auth/AccessRessources";

export type AccessRessourceDataTableProps = {
  access: ACCESS[];
  onAccessChange: (access: ACCESS[]) => void;
  baseAccess: React.RefObject<ACCESS[] | null>;
  label?: string;
};

export type RessourceItem = {
  title: string;
  ressource: ACCESS_RESSOURCES;
};
