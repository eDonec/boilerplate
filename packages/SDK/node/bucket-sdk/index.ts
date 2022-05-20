import axios from "axios";
import { FileRouteTypes } from "bucket-types/routes/file";

const baseUrl = "/v1/bucket";

export default class BucketSDK {
  private api = axios.create({
    baseURL: `/api${baseUrl}`,
  });

  constructor(uploadToken: string) {
    this.api.defaults.headers.common.Authorization = `Bearer ${uploadToken}`;
  }

  public async addFile({
    file,
    onUploadProgress,
    abortController,
  }: {
    file: File;
    onUploadProgress?: (progress: number) => void;
    abortController?: AbortController;
  }) {
    const formData = new FormData();

    formData.append("file", file);

    const { data } = await this.api.post<
      FileRouteTypes["/file/"]["POST"]["response"]
    >(`/file/`, formData, {
      onUploadProgress: ({ total, loaded }) => {
        onUploadProgress?.(Math.round((loaded * 100) / total));
      },
      signal: abortController?.signal,
    });

    return data;
  }

  public async addBatchFiles({
    files,
    onUploadProgress,
    abortController,
  }: {
    files: File[];
    onUploadProgress?: (progress: number) => void;
    abortController?: AbortController;
  }) {
    const formData = new FormData();

    files.forEach((file) => formData.append("file", file));

    const { data } = await this.api.post<
      FileRouteTypes["/file/"]["POST"]["response"]
    >(`/file/`, formData, {
      onUploadProgress: ({ total, loaded }) => {
        onUploadProgress?.(Math.round((loaded * 100) / total));
      },
      signal: abortController?.signal,
    });

    return data;
  }
}
