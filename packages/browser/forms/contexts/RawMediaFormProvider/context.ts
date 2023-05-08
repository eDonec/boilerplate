import { createContext } from "react";

const MediaFormContext = createContext<{
  mediaUploadToken: string | null;
  fetchFunction: (() => Promise<string>) | null;
}>({
  mediaUploadToken: null,
  fetchFunction: null,
});

export default MediaFormContext;
