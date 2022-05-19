import { useContext } from "react";
import { FieldValues, useFormContext } from "react-hook-form";

import MediaFormContext from "./context";

const useMediaFormContext = <TFieldValues extends FieldValues>() => {
  const mediaFormContextValues = useContext(MediaFormContext);
  const formContextValues = useFormContext<TFieldValues>();

  return { ...formContextValues, ...mediaFormContextValues };
};

export default useMediaFormContext;
