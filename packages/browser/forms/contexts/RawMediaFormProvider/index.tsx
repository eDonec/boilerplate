import { useEffect, useState } from "react";
import { FieldValues, FormProvider, FormProviderProps } from "react-hook-form";

import MediaFromContext from "./context";

export type RawMediaFormContextProviderProps<TFieldValues extends FieldValues> =
  FormProviderProps<TFieldValues> & {
    fetchTokenFunction: () => Promise<string>;
    onFetchTokenFailure?: (error: Error) => void;
  };

const RawMediaFormProvider = <TFieldValues extends FieldValues>({
  children,
  fetchTokenFunction,
  onFetchTokenFailure,
  ...formProps
}: RawMediaFormContextProviderProps<TFieldValues>) => {
  const [mediaUploadToken, setMediaUploadToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setMediaUploadToken(await fetchTokenFunction());
      } catch (error) {
        if (error instanceof Error) onFetchTokenFailure?.(error);
      }
    })();
  }, []);

  return (
    <MediaFromContext.Provider value={{ mediaUploadToken }}>
      <FormProvider {...formProps}>{children}</FormProvider>
    </MediaFromContext.Provider>
  );
};

export default RawMediaFormProvider;
