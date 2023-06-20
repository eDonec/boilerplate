import { HealthRouteTypes } from "mailing-types/routes/health";
import ServerSDK from "server-sdk/sdk";

const baseUrl = "/v1/mailing";

export default class MailingSDK extends ServerSDK {
  public async getMicroservicesStatus() {
    const { data } = await this.api.get<
      HealthRouteTypes["/health/"]["GET"]["response"]
    >(`${baseUrl}/health`);

    return data;
  }
}
