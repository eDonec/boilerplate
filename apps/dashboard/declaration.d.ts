import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
} from "@reduxjs/toolkit";
import dict from "locales/en/translation.json";
import dictFr from "locales/fr/translation.json";

import { AppDispatch, RootState } from "_redux/store";

type CustomThunkApiConfig = {
  dispatch: AppDispatch;
  state: RootState;
};

declare module "@reduxjs/toolkit" {
  export declare function createAsyncThunk<Returned, ThunkArg>(
    typePrefix: string,
    payloadCreator: AsyncThunkPayloadCreator<
      Returned,
      ThunkArg,
      CustomThunkApiConfig
    >,
    options?: AsyncThunkOptions<ThunkArg, CustomThunkApiConfig>
  ): AsyncThunk<Returned, ThunkArg, CustomThunkApiConfig>;
}

declare module "react-i18next" {
  export interface Resources {
    translation: typeof dict;
    translation: typeof dictFr;
  }
}
