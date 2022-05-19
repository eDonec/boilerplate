import { forwardRef, useEffect, useRef } from "react";

import BucketSDK from "bucket-sdk";
import { UploadedFile } from "bucket-types/utils";
import Loader from "core-ui/Loader";
import { clsx } from "core-utils";

import FilePreview from "./FilePreview";
import { useFilePicker } from "./useFilePicker";

export interface IProps {
  maxFiles?: number;
  accept?: string | string[] | undefined;

  label?: string;

  onChange?: (files: UploadedFile | UploadedFile[]) => void;
  error?: string;
  name: string;
}

export interface IComponentProps extends IProps {
  value?: string[] | string;
  mediaUploadToken: string | null;
}

const FilePicker = forwardRef<HTMLInputElement, IComponentProps>(
  ({ error, onChange, maxFiles = 20, accept, mediaUploadToken }, ref) => {
    const {
      getInputProps,
      getRootProps,
      files,
      isDragActive,
      rejectedFiles,
      handlePictureClick,
      deleteFile,
    } = useFilePicker({
      onChange,
      maxFiles,
      accept,
      mediaUploadToken,
    });

    const bucketSDK = useRef<BucketSDK | null>(null);

    useEffect(() => {
      if (mediaUploadToken && !bucketSDK.current)
        bucketSDK.current = new BucketSDK(mediaUploadToken);
    }, [mediaUploadToken]);

    return (
      <div
        className={clsx(
          "relative flex cursor-pointer p-10 text-center",
          "bg-gray-100",
          "border-2 border-dashed",
          !error && "dark:border-gray-500 dark:bg-gray-700 dark:text-gray-200",
          error &&
            "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500",
          error &&
            "dark:border-red-400 dark:bg-red-100 dark:text-red-900 dark:placeholder-red-700 dark:focus:border-red-500 dark:focus:ring-red-500"
        )}
        {...getRootProps()}
      >
        <div className="fal fa-file-upload mr-2">
          <div>
            <div className="h-0">
              <input className="h-0 w-0 opacity-0" ref={ref} />
            </div>
            <input {...getInputProps()} />
            <div className="text-center">
              {isDragActive
                ? "Libérez vos fichiers ici"
                : "Glissez votre fichier ou bien cliquez ici pour le selectionner"}
            </div>
            {rejectedFiles.length > 0 && (
              <div className="ml-1 text-red-600">{rejectedFiles[0]}</div>
            )}
            {files.length > 0 && (
              <div className="m-5 flex flex-wrap gap-4">
                {files.map((file, index) => (
                  <FilePreview
                    bucketSDK={bucketSDK.current}
                    key={file instanceof File ? file.preview : file.key}
                    file={file}
                    onDelete={(e) => handlePictureClick(e, index, deleteFile)}
                    onUploadFailed={() => deleteFile(index)}
                  />
                ))}
              </div>
            )}
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
              {error}
            </p>
          )}
        </div>
        <div
          className={clsx([
            "bg-primary-600 pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-opacity-10 backdrop-blur transition-opacity",
            {
              "opacity-0": mediaUploadToken,
            },
          ])}
        >
          <Loader />
        </div>
      </div>
    );
  }
);

export default FilePicker;
