/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable simple-import-sort/imports */
// TODO: FIX svg imports

import { forwardRef } from "react";
import { UploadedFile } from "bucket-types/utils";

import { clsx } from "core-utils";
// @ts-ignore

// @ts-ignore

// @ts-ignore
// @ts-ignore

import { useFilePicker } from "./useFilePicker";
import FilePreview from "./FilePreview";

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
}

const FilePicker = forwardRef<HTMLInputElement, IComponentProps>(
  ({ error, onChange, maxFiles = 20, accept }, ref) => {
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
    });

    return (
      <div
        className={clsx(
          "flex cursor-pointer p-10 text-center",
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
                    key={index}
                    file={file}
                    onDelete={(e) => handlePictureClick(e, index, deleteFile)}
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
      </div>
    );
  }
);

export default FilePicker;
