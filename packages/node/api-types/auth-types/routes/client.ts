import { IPaginatedResult, SortDirection } from "shared-types";

import { LeanAuthDocument } from "../models/Auth";

export type ClientRouteTypes = {
  "/clients/": {
    GET: {
      query: {
        "sort-direction"?: SortDirection;
        page?: string;
        "sort-field"?: string;
        limit?: string;
      };
      response: IPaginatedResult<LeanAuthDocument>;
    };
  };
  //! GENERATOR-ANCHOR
};
