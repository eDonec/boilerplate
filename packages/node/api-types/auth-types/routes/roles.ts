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
      response: IPaginatedResult<LeanRoleDocument>;
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
  };

  //! GENERATOR-ANCHOR
};
