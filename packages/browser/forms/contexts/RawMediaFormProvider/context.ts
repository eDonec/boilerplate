import { createContext } from "react";

const MediaFormContext = createContext<{ mediaUploadToken: string | null }>({
  mediaUploadToken: null,
});

export default MediaFormContext;
