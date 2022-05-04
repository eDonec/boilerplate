/* eslint-disable max-lines */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable simple-import-sort/imports */
// TODO: FIX svg imports

import { forwardRef } from "react";

import { clsx } from "core-utils";
// @ts-ignore

import excel from "./svg/excel.svg";
// @ts-ignore

import pdf from "./svg/pdf.svg";
// @ts-ignore
import powerpoint from "./svg/powerpoint.svg";
// @ts-ignore

import word from "./svg/word.svg";
import { IFileWithPreview, useFilePicker } from "./useFilePicker";

export interface IProps {
  maxFiles?: number;
  accept?: string | string[] | undefined;

  label?: string;

  onChange: (files: IFileWithPreview) => void;
  error?: string;
  name: string;
}

export interface IComponentProps extends IProps {
  value?: string[] | string;
}

const FilePicker = forwardRef<HTMLInputElement, IComponentProps>(
  ({ error, onChange, maxFiles = 0, accept }, ref) => {
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
              <div className="ml-1  text-red-600">{rejectedFiles[0]}</div>
            )}
            {files.length > 0 && (
              <div className="m-5 grid  grid-cols-1 gap-4 sm:grid-cols-4">
                {files.map((file, index) => (
                  <div
                    key={file.preview || file.name + index}
                    className="flex flex-col items-center justify-center"
                  >
                    <div
                      className={clsx(
                        "h-25 w-25 relative flex p-3 text-center",
                        "bg-white shadow-md"
                      )}
                    >
                      <span
                        className="absolute top-[-12px] right-[-12px]"
                        tabIndex={index}
                        role="button"
                        onClick={(event) =>
                          handlePictureClick(event, index, deleteFile)
                        }
                        onKeyDown={(event) =>
                          handlePictureClick(event, index, deleteFile)
                        }
                      >
                        <svg
                          className="h-8 w-8 justify-end text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <circle
                            className="text-gray-200"
                            fill="white"
                            cx="12"
                            cy="12"
                            r="10"
                          />
                          <line x1="15" y1="9" x2="9" y2="15" />
                          <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                      </span>
                      <div className="flex w-20 text-center">
                        {file.type ===
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
                          <img src={word}></img>
                        )}
                        {file.type === "application/pdf" && (
                          <img src={pdf}></img>
                        )}
                        {file.type ===
                          "application/vnd.openxmlformats-officedocument.presentationml.presentation" && (
                          <img src={powerpoint}></img>
                        )}
                        {file.type ===
                          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && (
                          <img src={excel}></img>
                        )}
                        {file.type === "image/png" ||
                        file.type === "image/jpg" ||
                        file.type === "image/jpeg" ? (
                          <img
                            alt="upload"
                            src={file.preview}
                            className="mt-auto mb-auto"
                          />
                        ) : (
                          error
                        )}
                      </div>
                    </div>
                    <div className=" w-20  text-center text-xs">
                      {file.name}
                    </div>
                  </div>
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
