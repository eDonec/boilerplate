import { RoleType } from "models/Role/types";
import { Document, Model } from "mongoose";
import { ACCESS, ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";

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

export interface AuthDocument extends AuthType, Document<string> {}
export type AuthModel = Model<AuthDocument>;

// TODO: LEAN DOCUMENT LOOKUP
