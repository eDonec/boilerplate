import { useEffect, useRef } from "react";

import { Editor, IAllProps } from "@tinymce/tinymce-react";
import BucketSDK from "bucket-sdk";
import { useDarkMode } from "core-ui";
import { clsx, getImageUrl } from "core-utils";

export type RawWYSIWYGEditorProps = {
  value: string;
  onChange: (value: string) => void;
  mediaUploadToken: string | null;
  fetchFunction: (() => Promise<string>) | null;
  className?: string;
  containerClassName?: string;
  error?: string;
  label?: string;
};
function getImageDimensions(base64: string) {
  return new Promise<{ w: number; h: number }>((resolved) => {
    const i = new Image();

    i.onload = () => {
      resolved({ w: i.width, h: i.height });
    };
    i.src = base64;
  });
}
const RawWYSIWYGEditor = ({
  value,
  onChange,
  mediaUploadToken,
  fetchFunction,
  className = "",
  containerClassName = "",
  error,
  label,
}: RawWYSIWYGEditorProps) => {
  const bucketSDK = useRef<BucketSDK | null>(null);

  useEffect(() => {
    if (mediaUploadToken && !bucketSDK.current && fetchFunction)
      bucketSDK.current = new BucketSDK(mediaUploadToken, fetchFunction);
  }, [mediaUploadToken]);

  const imageUploadHandler: NonNullable<
    NonNullable<IAllProps["init"]>["images_upload_handler"]
  > = async (blobInfo, progress) => {
    if (!bucketSDK.current)
      throw new Error("Internal Error: BucketSDK is not initialized");
    const blob = blobInfo.blob();
    const { url } = await bucketSDK.current.addFile({
      file: new File([blob], blobInfo.filename(), { type: blob.type }),
      onUploadProgress: progress,
    });
    const { w, h } = await getImageDimensions(blobInfo.blobUri());

    return getImageUrl(url, w, h);
  };
  const { theme } = useDarkMode();

  return (
    <div className={containerClassName}>
      {label && (
        <label
          className={clsx(
            "mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300",
            error && "text-red-600 dark:text-red-500"
          )}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(className, "rounded-xl", {
          "border border-red-500 dark:border-red-400": !!error,
        })}
      >
        <Editor
          disabled={!mediaUploadToken}
          value={value}
          onEditorChange={onChange}
          toolbar={[
            "code undo redo restoredraft | forecolor backcolor bold italic underline link | alignleft aligncenter alignright alignjustify | outdent indent lineheight",
            "table image media | bullist numlist hr blockquote | preview fullscreen",
          ]}
          apiKey="7wx8a0mmalxo9wrk5pcmujruofw8uu5p1bjleu4gr373qwsy"
          init={{
            automatic_uploads: true,
            images_upload_handler: imageUploadHandler,
            branding: false,
            skin: theme === "dark" ? "oxide-dark" : "oxide",
            relative_urls: false,
          }}
          plugins={[
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            "hr",
            "imagetools",
            "autosave",
            "autoresize",
          ]}
        />
      </div>
      {/* error message */}
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
      )}
    </div>
  );
};

export default RawWYSIWYGEditor;
