import { HealthRouteTypes } from "MICROSERVICE_NAME_PLACEHOLDER-types/routes/health";
import ServerSDK from "server-sdk/sdk";
import ServerSDKTypes from "server-sdk/types";

const baseUrl = "/v1/MICROSERVICE_NAME_PLACEHOLDER";

export default class MICROSERVICE_NAME_UPPERCASE_PLACEHOLDERSDK extends ServerSDK {
  public async getMicroservicesStatus() {
    const { data } = await this.api.get<
      HealthRouteTypes["/health/"]["GET"]["response"]
    >(`${baseUrl}/health`);

    return data;
  }
}

export type MICROSERVICE_NAME_UPPERCASE_PLACEHOLDERSDKTypes =
  ServerSDKTypes<MICROSERVICE_NAME_UPPERCASE_PLACEHOLDERSDK>;
