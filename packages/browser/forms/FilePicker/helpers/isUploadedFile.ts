import { UploadedFile } from "bucket-types/utils";

export function isUploadedFile(file?: unknown): file is UploadedFile {
  return (
    typeof (file as UploadedFile)?._id === "string" &&
    typeof (file as UploadedFile)?.key === "string" &&
    typeof (file as UploadedFile)?.url === "string" &&
    typeof (file as UploadedFile)?.name === "string" &&
    typeof (file as UploadedFile)?.type === "string"
  );
}
