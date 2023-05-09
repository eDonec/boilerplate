import axios from "axios";
import { FileRouteTypes } from "bucket-types/routes/file";
import StatusCodes from "shared-types/StatusCodes";

let baseURL = "https://localhost:3000/api/v1/bucket";

if (typeof window !== "undefined") baseURL = "/api/v1/bucket";
else if (process.env.NODE_ENV === "production")
  baseURL = `${
    process.env.HOST_URL ||
    process.env.NEXT_PUBLIC_HOSTNAME ||
    process.env.REACT_APP_HOSTNAME ||
    ""
  }/api/v1/bucket`;

export default class BucketSDK {
  private api = axios.create({
    baseURL,
  });

  constructor(
    uploadToken: string,
    refetchToken: () => string | Promise<string>
  ) {
    this.api.defaults.headers.common.Authorization = `Bearer ${uploadToken}`;
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const request = error.config;

        if (
          !request.url.includes("/z/refresh-token") &&
          error.response?.status === StatusCodes.Forbidden &&
          error.response.data.message === "Token invalid or expired" &&
          !request._retry
        ) {
          request._retry = true;
          await refetchToken();
          request.headers.Authorization =
            this.api.defaults.headers.common.Authorization;

          return this.api(request);
        }

        return Promise.reject(error);
      }
    );
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
        onUploadProgress?.(total ? Math.round((loaded * 100) / total) : 0);
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
        onUploadProgress?.(total ? Math.round((loaded * 100) / total) : 0);
      },
      signal: abortController?.signal,
    });

    return data;
  }
}
