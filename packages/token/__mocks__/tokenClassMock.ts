import TokneGenerator from "../TokenGenerator";
import TokenValidator, { IDecodedToken } from "../TokenValidator";

export const tokenValidatorClassMock = (token?: string) => () =>
  new TokenValidator(token as string);
export const tokenGeneratorClassMock =
  (token: IDecodedToken, exp?: string | number) => () =>
    new TokneGenerator(token, undefined, undefined, exp);
