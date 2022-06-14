import { IPaginatedResult, SortDirection } from "shared-types";

import { LeanRoleDocument } from "../models/Role";

export type RolesRouteTypes = {
  "/roles/": {
    GET: {
      query: {
        page?: string;
        limit?: string;
        "sort-direction"?: SortDirection;
        "sort-field"?: string;
      };
      response: IPaginatedResult<
        Omit<LeanRoleDocument, "access"> & { isDeletable: boolean }
      >;
    };
    POST: {
      body: Partial<LeanRoleDocument>;
      response: string;
    };
  };
  "/roles/:id": {
    GET: {
      response: LeanRoleDocument;
      params: {
        id: string;
      };
    };
    PUT: {
      response: string;
      body: Partial<LeanRoleDocument>;
      params: {
        id: string;
      };
    };
    DELETE: {
      response: string;
      params: {
        id: string;
      };
    };
  };
  "/roles/grantable/:authId": {
    GET: {
      response: Array<{
        label: string;
        value: string;
      }>;
      params: {
        authId: string;
      };
    };
  };
};
