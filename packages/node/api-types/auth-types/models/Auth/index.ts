import { HydratedDocument, LeanDocument } from "mongoose";
import { ACCESS, ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";

import { RoleType } from "../Role";

export type AuthType = {
  authType: ACCESS_TYPE;
  email?: string;
  userName?: string;
  password?: string;
  authProvider: AUTH_PROVIDERS[];
  providerId?: {
    provider: AUTH_PROVIDERS;
    id: string;
  }[];
  sessions: string[];
  role: RoleType;
  customAccessList: ACCESS[];
  isActive: boolean;
  expirationDate?: Date;
  isBanned: boolean;
  isSuspended: boolean;
  suspentionLiftTime: Date;
  suspentionReason: string;
  numberOfUnsuccessfulTrials: number;
  lastTrialSince: Date;
};
export type AuthDocument = HydratedDocument<AuthType>;
export type LeanAuthDocument = LeanDocument<AuthDocument>;
