import { RequireOnlyOne } from "shared-types";

export interface ISignUpClassicBody {
  email: string;
  userName?: string;
  password: string;
}

export type ISignInClassicBody = RequireOnlyOne<
  ISignUpClassicBody,
  "email" | "userName"
>;
