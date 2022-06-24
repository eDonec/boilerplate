import { MICROSERVICE_LIST } from "shared-types/MicroserviceList";

import { LeanMicroServiceStatusDocument } from "../models/MicroserviceStatus";

export type StatusRouteTypes = {
  "/status/": {
    GET: {
      query?: {
        page?: string;
        limit?: string;
      };
      response: LeanMicroServiceStatusDocument[];
    };
  };
  "/status/:name": {
    GET: {
      query: {
        page: string;
        limit: string;
      };
      response: {
        microserviceName: string;
        status: string;
        history: Array<{
          id: string;
          status: string;
          sampleTime: Date;
        }>;
      };
      params: {
        name: keyof typeof MICROSERVICE_LIST;
      };
    };
  };
};
