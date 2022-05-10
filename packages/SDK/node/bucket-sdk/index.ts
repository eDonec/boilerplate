import ServerSDK from "server-sdk/sdk";
import ServerSDKTypes from "server-sdk/types";

// const baseUrl = "/v1/bucket";

export default class BucketSDK extends ServerSDK {}

export type BucketSDKTypes = ServerSDKTypes<BucketSDK>;
