import { AUTH_PROVIDERS } from "shared-types";
import TCustomErrors from "shared-types/Errors";

import { LeanUserDocument } from "../models/User";

export enum AuthEvents {
  UserSuspended = "UserSuspended",
  UserCreated = "UserCreated",
  UserCreatedNewSession = "UserCreatedNewSession",
  UserLinkedAccountToOAuth2 = "UserLinkedAccountToOAuth2",
  AuthError = "AuthError",
  UserBanned = "UserBanned",
  UserBanAndSuspensionLifted = "UserBanAndSuspensionLifted",
  ClientCreated = "ClientCreated",
  ClientUpdated = "ClientUpdated",
  ClientDeleted = "ClientDeleted",
  ResetPasswordRequest = "ResetPasswordRequest",
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
  [AuthEvents.ClientCreated]: LeanUserDocument & {
    filesToPersist: string[];
  };
  [AuthEvents.ClientDeleted]: {
    filesToDelete: string[];
  };
  [AuthEvents.ClientUpdated]: LeanUserDocument & {
    filesToPersist: string[];
    filesToDelete: string[];
  };
  [AuthEvents.ResetPasswordRequest]: {
    resetPasswordToken: string;
    email: string;
    firstName?: string;
    lastName?: string;
    browser?: string | null;
    os?: string | null;
    country?: string | null;
  };
};
