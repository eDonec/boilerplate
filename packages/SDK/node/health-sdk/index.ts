import { StatusRouteTypes } from "health-types/routes/status";
import ServerSDK from "server-sdk/sdk";

const baseUrl = "/v1/health";

export default class HealthSDK extends ServerSDK {
  public async getMicroservicesStatus({
    query,
  }: {
    query?: StatusRouteTypes["/status/"]["GET"]["query"];
  }) {
    const { data } = await this.api.get<
      StatusRouteTypes["/status/"]["GET"]["response"]
    >(`${baseUrl}/status`, { params: query });

    return data;
  }

  public async getMicroserviceStatusHistoryByName({
    query,
    params,
  }: {
    body?: never;
    query: StatusRouteTypes["/status/:name"]["GET"]["query"];
    params: StatusRouteTypes["/status/:name"]["GET"]["params"];
  }) {
    const { data } = await this.api.get<
      StatusRouteTypes["/status/:name"]["GET"]["response"]
    >(`${baseUrl}/status/${params.name}`, { params: query });

    return data;
  }
}
