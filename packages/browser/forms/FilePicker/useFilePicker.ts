import { useCallback, useEffect, useState } from "react";
import { Accept, FileRejection, useDropzone } from "react-dropzone";

import { UploadedFile } from "bucket-types/utils";

export interface IFileWithPreview extends File {
  preview: string;
  path?: string;
}

type FilePickerProps = {
  maxFiles: number;
  accept?: Accept;
  onChange?: (files: UploadedFile | UploadedFile[]) => void;
  errors?: (error: FileRejection[]) => void;
  mediaUploadToken: string | null;
};
export const useFilePicker = ({
  onChange,
  maxFiles,
  accept,
  mediaUploadToken,
}: FilePickerProps) => {
  const [files, setFiles] = useState<(IFileWithPreview | UploadedFile)[]>([]);
  const [rejectedFiles, setFilesRejected] = useState<string[][]>([]);
  const handlePictureClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
    fn: (index: number) => void
  ) => {
    event.stopPropagation();
    fn(index);
  };
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prev) => [
        ...prev,
        ...acceptedFiles
          .filter((_file, index) => prev.length + index + 1 <= maxFiles)
          .map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
      ]);
      setFilesRejected([]);
    },
    [maxFiles]
  );

  const onDropRejected = useCallback((rejectedFile: FileRejection[]) => {
    setFilesRejected(rejectedFile.map((e) => e.errors.map((e1) => e1.message)));
  }, []);

  useEffect(() => {
    const filesToSubmit = files.filter(
      (file): file is UploadedFile => !(file instanceof File)
    );

    onChange?.(maxFiles > 1 ? filesToSubmit : filesToSubmit[0]);
  }, [files, onChange, maxFiles]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      onDropRejected,
      maxFiles,
      accept,
      disabled: !mediaUploadToken,
    });
  const deleteFile = (index: number) => {
    setFiles((prev) => prev.filter((_file, i) => index !== i));
  };
  const onFileUploaded = useCallback(
    ({
      file,
      uploadedFile,
    }: {
      uploadedFile: UploadedFile;
      file: IFileWithPreview;
    }) => {
      setFiles((prev) =>
        prev.map((el) =>
          el instanceof File && el.preview === file.preview ? uploadedFile : el
        )
      );
    },
    []
  );

  return {
    getRootProps,
    getInputProps,
    files,
    isDragActive,
    isDragReject,
    rejectedFiles,
    handlePictureClick,
    deleteFile,
    onFileUploaded,
  };
};
