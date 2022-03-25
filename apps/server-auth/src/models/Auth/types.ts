import { RoleType } from "models/Role/types";
import { Document, Model } from "mongoose";
import { ACCESS, ACCESS_TYPE, AUTH_PROVIDERS } from "shared-types";

export type ISesssion = {
  sessionId: string;
  refreshToken: string;
};
export type AuthType = {
  authType: ACCESS_TYPE;
  email?: string;
  userName?: string;
  password?: string;
  authProvider: AUTH_PROVIDERS;
  providerId?: string;
  sessions: ISesssion[];
  role: RoleType;
  customAccessList: ACCESS[];
  isActive: boolean;
  expirationDate?: Date;
  isBanned: boolean;
  isSusspended: boolean;
  susspentionLiftTime: Date;
  numberOfUnsuccessfulTrials: number;
  lastTrialSince: Date;
};

export interface AuthDocument extends AuthType, Document<string> {}
export type AuthModel = Model<AuthDocument>;
