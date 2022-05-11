import { AUTH_PROVIDERS } from "shared-types";

export enum AuthEvents {
  UserSuspended = "UserSuspended",
  UserCreated = "UserCreated",
  UserCreatedNewSession = "UserCreatedNewSession",
  UserLinkedAccountToOAuth2 = "UserLinkedAccountToOAuth2",
}

export type AuthEventsPayload = {
  [AuthEvents.UserSuspended]: {
    authId: string;
    suspentionLiftTime: Date;
    suspentionReason: string;
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
};
