import { IPaginatedResult, SortDirection } from "shared-types";

import { LeanRoleDocument } from "../models/Role";

export type RoleRouteTypes = {
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
  //! GENERATOR-ANCHOR
};
