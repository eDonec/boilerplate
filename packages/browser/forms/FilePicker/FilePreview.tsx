/* eslint-disable @typescript-eslint/ban-ts-comment */
// TODO: FIX svg imports

import { useEffect, useRef, useState } from "react";

import BucketSDK from "bucket-sdk";
import { UploadedFile } from "bucket-types/utils";
import clsx from "core-utils/clsx";

// @ts-ignore
import excel from "./svg/excel.svg";
// @ts-ignore
import pdf from "./svg/pdf.svg";
// @ts-ignore
import powerpoint from "./svg/powerpoint.svg";
// @ts-ignore
import word from "./svg/word.svg";
import { IFileWithPreview } from "./useFilePicker";

type FilePreviewProps = {
  file: IFileWithPreview | UploadedFile;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  bucketSDK: BucketSDK | null;
  onUploadFailed: () => void;
};

const FilePreview = ({
  file: _file,
  onDelete,
  bucketSDK,
  onUploadFailed,
}: FilePreviewProps) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(_file);
  const [didUpload, setDidUpload] = useState(!(_file instanceof File));
  const abortController = useRef<AbortController>();

  useEffect(() => {
    if (!(_file instanceof File) || didUpload || !bucketSDK) return;

    (async () => {
      try {
        abortController.current = new AbortController();
        const data = await bucketSDK.addFile({
          file: _file,
          onUploadProgress: setUploadProgress,
          abortController: abortController.current,
        });

        setFile(data);
        setDidUpload(true);
      } catch (error) {
        if (error instanceof Error && error.message === "canceled") return;
        onUploadFailed();
      }
    })();
  }, [didUpload, _file]);

  useEffect(
    () => () => {
      abortController.current?.abort();
    },
    []
  );

  return (
    <div
      className={clsx(
        "relative flex flex-col gap-2 p-3",
        "dark:bg-dark bg-white shadow-md"
      )}
    >
      <div className="flex items-center gap-2">
        <button
          className="absolute top-[-12px] right-[-12px]"
          role="button"
          onClick={onDelete}
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
        </button>
        <div className="flex w-20 items-center justify-center">
          {file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
            <img src={word}></img>
          )}
          {file.type === "application/pdf" && <img src={pdf}></img>}
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
            (file.type === "image/jpeg" && (
              <img
                alt="upload"
                src={
                  file instanceof File
                    ? file.preview
                    : `http://localhost:3000/api/v1/bucket/file/${file.key}`
                }
                className="mt-auto mb-auto"
              />
            ))}
        </div>
        <span className="text-xs">{file.name}</span>
      </div>
      {!didUpload && (
        <div className="rounded-full bg-gray-200">
          <div
            className="rounded-full bg-blue-600 p-0.5 text-center text-xs font-medium leading-none text-blue-100 transition-[width]"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default FilePreview;
