import {
  AsyncThunk,
  AsyncThunkOptions,
  AsyncThunkPayloadCreator,
} from "@reduxjs/toolkit";
import { defaultNS, resources } from "locales";

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
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}
