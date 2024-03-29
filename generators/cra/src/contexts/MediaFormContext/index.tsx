import { FieldValues, SubmitHandler } from "react-hook-form";

import RawMediaFormProvider, {
  RawMediaFormContextProviderProps,
} from "forms/contexts/RawMediaFormProvider";

type MediaFormContextProps<TFieldValues extends FieldValues> =
  RawMediaFormContextProviderProps<TFieldValues> & {
    onSubmit: SubmitHandler<TFieldValues>;
    className?: string;
    id?: string;
  };

const MediaFormContext = <TFieldValues extends FieldValues>({
  children,
  onSubmit,
  fetchTokenFunction,
  className = "",
  id,
  ...formMethods
}: MediaFormContextProps<TFieldValues>) => (
  <RawMediaFormProvider
    {...formMethods}
    fetchTokenFunction={fetchTokenFunction}
  >
    <form
      id={id}
      className={className}
      onSubmit={formMethods.handleSubmit(onSubmit)}
    >
      {children}
    </form>
  </RawMediaFormProvider>
);

export default MediaFormContext;
