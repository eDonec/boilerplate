import { UploadRouteTypes } from "bucket-types/routes/upload";
import ServerSDK from "server-sdk/sdk";
import ServerSDKTypes from "server-sdk/types";

const baseUrl = "/v1/bucket";

export default class BucketSDK extends ServerSDK {
  //temp

  public async addFiles({
    body,
  }: {
    body: UploadRouteTypes["/upload/"]["POST"]["body"];
    query?: never;
    params?: never;
  }) {
    const { data } = await this.api.post<
      UploadRouteTypes["/upload/"]["POST"]["response"]
    >(`${baseUrl}/upload/`, body);

    return data;
  }
}

export type BucketSDKTypes = ServerSDKTypes<BucketSDK>;
