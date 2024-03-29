import { IPaginatedResult } from "shared-types";
import { ACCESS, PRIVILEGE } from "shared-types/auth/access";
import { ACCESS_RESSOURCES } from "shared-types/auth/AccessRessources";

import { LeanRoleDocument } from "../models/Role";

export type AuthZRouteTypes = {
  "/z/ressource-access": {
    POST: {
      body: {
        ressource: ACCESS_RESSOURCES;
        privileges: PRIVILEGE;
      };

      response: string;
    };
  };
  "/z/roles": {
    GET: {
      query: {
        page?: string;
        limit?: string;
        "sort-direction"?: string;
        "sort-field"?: string;
      };
      response: IPaginatedResult<LeanRoleDocument>;
    };
  };
  "/z/ban-client/:id": {
    POST: {
      body: {
        reason: string;
      };

      response: { status: string };
      params: {
        id: string;
      };
    };
  };
  "/z/suspend-client/:id": {
    POST: {
      body: {
        reason: string;
        suspensionLiftTime: Date;
      };

      response: { status: string };
      params: {
        id: string;
      };
    };
  };
  "/z/lift-ban-suspension/:id": {
    GET: {
      response: { status: string };
      params: {
        id: string;
      };
    };
  };
  "/z/access/:id": {
    PUT: {
      body: {
        role: string;
        access: ACCESS[];
      };
      response: string;
      params: {
        id: string;
      };
    };
  };
};
