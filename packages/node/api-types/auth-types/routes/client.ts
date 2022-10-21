import { ACCESS, IPaginatedResult } from "shared-types";

import { LeanAuthDocument } from "../models/Auth";

export type ClientRouteTypes = {
  "/clients/": {
    GET: {
      query: {
        "sort-direction"?: string;
        page?: string;
        "sort-field"?: string;
        limit?: string;
        keyword?: string;
      };
      response: IPaginatedResult<LeanAuthDocument>;
    };
  };
  "/clients/:id": {
    GET: {
      response: LeanAuthDocument;
      params: {
        id: string;
      };
    };
  };
  "/clients/clientAccess/:id": {
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
