import ServerSDK from "./sdk";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericFunction = (...args: any) => any;
type FunctionArg = "body" | "params" | "query";

type SDKFunctions<T extends ServerSDK> = {
  [Key in keyof T as T[Key] extends GenericFunction ? Key : never]: T[Key];
};

type SDKFunctionTypes<T extends ServerSDK> = {
  [Key in keyof SDKFunctions<T> as SDKFunctions<T>[Key] extends GenericFunction
    ? Parameters<SDKFunctions<T>[Key]>["length"] extends 0
      ? never
      : Key
    : never]: SDKFunctions<T>[Key] extends GenericFunction
    ? Parameters<SDKFunctions<T>[Key]>
    : never;
};

type GenerateType<T extends ServerSDK, Arg extends FunctionArg> = {
  [Key in keyof SDKFunctionTypes<T> as SDKFunctionTypes<T>[Key][0][Arg] extends undefined
    ? never
    : `${Capitalize<
        string & Key
      >}${Capitalize<Arg>}Type`]: SDKFunctionTypes<T>[Key][0][Arg];
};

type ReturnTypes<T extends ServerSDK> = {
  [Key in keyof SDKFunctions<T> as SDKFunctions<T>[Key] extends GenericFunction
    ? `${Capitalize<string & Key>}ReturnType`
    : never]: SDKFunctions<T>[Key] extends GenericFunction
    ? Awaited<ReturnType<SDKFunctions<T>[Key]>>
    : never;
};

type ServerSDKTypes<T extends ServerSDK> = GenerateType<T, "params"> &
  GenerateType<T, "query"> &
  GenerateType<T, "body"> &
  ReturnTypes<T>;

export default ServerSDKTypes;
