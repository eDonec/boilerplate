import {
  AuthModel,
  AuthType,
  AuthTypeSaticMethods,
  LeanAuthDocument,
} from "auth-types/models/Auth";
import { model, Schema } from "mongoose";
import {
  ACCESS_TYPE,
  AUTH_PROVIDERS,
  FULL_ACCESS,
  IPaginatedResult,
  PRIVILEGE,
} from "shared-types";

import { getPaginationAggregation } from "helpers/getPaginationAggregation";
import { hashPassword } from "helpers/hashPassword";

const schema = new Schema<AuthType, AuthModel>({
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
    type: Schema.Types.ObjectId,
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

const findPaginatedAuth: AuthTypeSaticMethods["findPaginated"] =
  async function findPaginatedRoles(this, args, prependedPipelines = []) {
    const [paginatedResults] = await this.aggregate<
      IPaginatedResult<LeanAuthDocument>
    >([...prependedPipelines, ...getPaginationAggregation(args)]);

    return paginatedResults;
  };

schema.static("findPaginated", findPaginatedAuth);

export default model<AuthType, AuthModel>("Auth", schema);
