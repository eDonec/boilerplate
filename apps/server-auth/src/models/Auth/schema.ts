import { Schema, Types } from "mongoose";
import {
  ACCESS_TYPE,
  AUTH_PROVIDERS,
  FULL_ACCESS,
  PRIVILEGE,
} from "shared-types";

import { hashPassword } from "helpers/hashPassword";

import { AuthDocument } from "./types";

const AuthClient = new Schema<AuthDocument>({
  email: String,
  userName: String,
  authType: {
    type: String,
    enum: ACCESS_TYPE,
    required: true,
  },
  password: {
    type: String,
    set: (value: string) => {
      if (!value) return undefined;

      return hashPassword(value);
    },
  },
  authProvider: {
    type: [String],
    enum: AUTH_PROVIDERS,
    required: true,
  },
  providerId: {
    type: [
      {
        provider: {
          type: String,
          enum: AUTH_PROVIDERS,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
      },
    ],
  },
  sessions: [String],
  role: {
    type: Types.ObjectId,
    ref: "Role",
  },
  customAccessList: {
    type: [
      {
        ressource: String,
        privileges: [
          {
            type: String,
            enum: PRIVILEGE,
          },
        ],
      },
    ],
    default: [{ ressource: "PUBLIC", privileges: FULL_ACCESS }],
  },
  isActive: {
    type: Boolean,
    required: true,
    default: false,
  },
  isBanned: {
    type: Boolean,
    required: true,
    default: false,
  },
  isSuspended: {
    type: Boolean,
    required: true,
    default: false,
  },
  expirationDate: {
    type: Date,
    required: false,
  },
  suspentionLiftTime: {
    type: Date,
    required: false,
  },
  suspentionReason: {
    type: String,
    required: false,
  },
  numberOfUnsuccessfulTrials: { type: Number, default: 0 },
  lastTrialSince: Date,
});

export interface Itransform {
  __v: number;
  password: string;
  refreshTokens: string;
  notificationToken: string;
  isBanned: boolean;
  emailActivationToken: string;
  sessions: string[];
}

export default AuthClient;
