import axios, { CancelToken, CancelTokenSource } from "axios";
import { UploadRouteTypes } from "bucket-types/routes/upload";

const baseUrl = "/v1/bucket";
const getCancelToken = () => axios.CancelToken.source();

export default class BucketSDK {
  private api = axios.create({
    baseURL: `/api${baseUrl}`,
  });

  public getCancelToken: () => CancelTokenSource;

  constructor(uploadToken: string) {
    this.getCancelToken = getCancelToken.bind(this);
    this.api.defaults.headers.common.Authorization = `Bearer ${uploadToken}`;
  }

  public async addFiles({
    file,
    onUploadProgress,
    cancelToken,
  }: {
    file: File;
    onUploadProgress?: (progress: number) => void;
    cancelToken?: CancelToken;
  }) {
    const formData = new FormData();

    formData.append("file", file);

    const { data } = await this.api.post<
      UploadRouteTypes["/upload/"]["POST"]["response"]
    >(`/upload/`, formData, {
      onUploadProgress: ({ total, loaded }) => {
        onUploadProgress?.(Math.round((loaded * 100) / total));
      },
      cancelToken,
    });

    return data;
  }
}
