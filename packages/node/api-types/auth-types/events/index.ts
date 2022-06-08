import { AUTH_PROVIDERS } from "shared-types";
import TCustomErrors from "shared-types/Errors";

export enum AuthEvents {
  UserSuspended = "UserSuspended",
  UserCreated = "UserCreated",
  UserCreatedNewSession = "UserCreatedNewSession",
  UserLinkedAccountToOAuth2 = "UserLinkedAccountToOAuth2",
  AuthError = "AuthError",
  UserBanned = "UserBanned",
  UserBanAndSuspensionLifted = "UserBanAndSuspensionLifted",
}

export type AuthEventsPayload = {
  [AuthEvents.UserSuspended]: {
    authId: string;
    suspensionLiftTime: Date;
    suspensionReason: string;
  };
  [AuthEvents.UserCreated]: {
    email: string;
    userName?: string;
    role: string;
    authType: string;
    authProvider: AUTH_PROVIDERS[];
  };
  [AuthEvents.UserCreatedNewSession]: {
    authId: string;
    sessionId: string;
    createdAt: Date;
  };
  [AuthEvents.UserLinkedAccountToOAuth2]: {
    authId: string;
    createdAt: Date;
    provider: AUTH_PROVIDERS;
    providerId: string;
  };
  [AuthEvents.AuthError]: TCustomErrors;
  [AuthEvents.UserBanned]: {
    authId: string;
    createdAt: Date;
    reason: string;
    bannedByUserId: string;
  };
  [AuthEvents.UserBanAndSuspensionLifted]: {
    authId: string;
    createdAt: Date;
    liftedByUserId: string;
  };
};
