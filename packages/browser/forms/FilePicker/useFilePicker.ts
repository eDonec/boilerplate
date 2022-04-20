import { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

export interface IFileWithPreview extends File {
  preview: string;
  path?: string;
}

type FilePickerProps = {
  maxFiles: number;
  accept?: string | string[] | undefined;
  onChange?: (files: IFileWithPreview) => void;
  errors?: (error: FileRejection[]) => void;
};
export const useFilePicker = ({
  onChange,
  maxFiles,
  accept,
}: FilePickerProps) => {
  const [files, setFiles] = useState<IFileWithPreview[]>([]);
  const [rejectedFiles, setFilesRejected] = useState<string[][]>([]);
  const handlePictureClick = (
    event:
      | React.MouseEvent<HTMLSpanElement, MouseEvent>
      | React.KeyboardEvent<HTMLSpanElement>,
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
    onChange?.(files[0]);
  }, [files, onChange]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      onDropRejected,
      maxFiles,
      accept,
    });
  const deleteFile = (index: number) => {
    setFiles((prev) => prev.filter((_file, i) => index !== i));
  };

  return {
    getRootProps,
    getInputProps,
    files,
    isDragActive,
    isDragReject,
    rejectedFiles,
    handlePictureClick,
    deleteFile,
  };
};
