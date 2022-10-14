import { HealthRouteTypes } from "MICROSERVICE_NAME_PLACEHOLDER-types/routes/status";
import ServerSDK from "server-sdk/sdk";

const baseUrl = "/v1/MICROSERVICE_NAME_PLACEHOLDER";

export default class MICROSERVICE_NAME_UPPERCASE_PLACEHOLDERSDK extends ServerSDK {
  public async getMicroservicesStatus() {
    const { data } = await this.api.get<
      HealthRouteTypes["/health/"]["GET"]["response"]
    >(`${baseUrl}/health`);

    return data;
  }
}
