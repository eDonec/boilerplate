import { forwardRef, useEffect, useRef } from "react";
import { Accept } from "react-dropzone";

import BucketSDK from "bucket-sdk";
import { UploadedFile } from "bucket-types/utils";
import Loader from "core-ui/Loader";
import { clsx } from "core-utils";

import FilePreview from "./FilePreview";
import { useFilePicker } from "./useFilePicker";

export interface IProps {
  maxFiles?: number;
  accept?: Accept;
  label?: string;
  outerWrapperClassName?: string;
  labelClassName?: string;
  onChange?: (files: UploadedFile | UploadedFile[]) => void;
  error?: string;
  name: string;
  fetchFunction: (() => Promise<string>) | null;
  className?: string;
}

export interface IComponentProps extends IProps {
  value?: (UploadedFile | string)[] | UploadedFile | string;
  mediaUploadToken: string | null;
}

const FilePicker = forwardRef<HTMLInputElement, IComponentProps>(
  (
    {
      error,
      onChange,
      maxFiles = 20,
      accept,
      mediaUploadToken,
      className = "",
      value,
      outerWrapperClassName,
      labelClassName,
      label,
      fetchFunction,
    },
    ref
  ) => {
    const {
      getInputProps,
      getRootProps,
      files,
      isDragActive,
      rejectedFiles,
      handlePictureClick,
      deleteFile,
      onFileUploaded,
    } = useFilePicker({
      onChange,
      maxFiles,
      accept,
      mediaUploadToken,
      value,
    });

    const bucketSDK = useRef<BucketSDK | null>(null);

    useEffect(() => {
      if (mediaUploadToken && !bucketSDK.current && fetchFunction)
        bucketSDK.current = new BucketSDK(mediaUploadToken, fetchFunction);
    }, [mediaUploadToken]);

    return (
      <div className={clsx(outerWrapperClassName)}>
        {label && (
          <label
            className={clsx(
              "block text-sm font-medium text-gray-900 dark:text-gray-300",
              error && "text-red-600 dark:text-red-500",
              labelClassName
            )}
          >
            {label}
          </label>
        )}
        <div
          className={clsx(
            "relative flex cursor-pointer p-2 text-center md:p-10",
            "bg-gray-100",
            "border-2 border-dashed",
            className,
            !error &&
              "dark:border-gray-500 dark:bg-gray-700 dark:text-gray-200",
            error &&
              "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500",
            error &&
              "dark:border-red-400 dark:bg-red-100 dark:text-red-900 dark:placeholder-red-700 dark:focus:border-red-500 dark:focus:ring-red-500"
          )}
          {...getRootProps()}
        >
          <div className="fal fa-file-upload mr-2 w-full">
            <div>
              <div className="h-0">
                <input className="h-0 w-0 opacity-0" ref={ref} />
              </div>
              <input {...getInputProps()} />
              <p>
                {isDragActive
                  ? "Libérez vos fichiers ici"
                  : "Glissez votre fichier ou bien cliquez ici pour le selectionner"}
              </p>
              {rejectedFiles.length > 0 && (
                <div className="ml-1 text-red-600">{rejectedFiles[0]}</div>
              )}
              {files.length > 0 && (
                <div className="my-5 flex flex-wrap gap-4">
                  {files.map((file, index) => (
                    <FilePreview
                      onFileUploaded={onFileUploaded}
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
            <Loader
              className={clsx({
                hidden: mediaUploadToken,
              })}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default FilePicker;
