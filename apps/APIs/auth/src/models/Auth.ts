import {
  AuthModel,
  AuthType,
  AuthTypeSaticMethods,
} from "auth-types/models/Auth";
import { model, Schema } from "mongoose";
import {
  ACCESS_RESSOURCES,
  ACCESS_TYPE,
  AUTH_PROVIDERS,
  IPaginatedResult,
  PRIVILEGE,
} from "shared-types";

import { getPaginationAggregation } from "helpers/getPaginationAggregation";
import { hashPassword } from "helpers/hashPassword";

const schema = new Schema<AuthType, AuthModel>(
  {
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
          ressource: { type: String, enum: ACCESS_RESSOURCES, required: true },
          privileges: {
            type: Number,
            enum: PRIVILEGE,
            required: true,
          },
        },
      ],
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
    suspensionLiftTime: {
      type: Date,
      required: false,
    },
    suspensionReason: {
      type: String,
      required: false,
    },
    numberOfUnsuccessfulTrials: { type: Number, default: 0 },
    lastTrialSince: Date,
  },
  { timestamps: true }
);

const findPaginatedAuth: AuthTypeSaticMethods["findPaginated"] =
  async function findPaginatedRoles(this, args, prependedPipelines = []) {
    const [paginatedResults] = await this.aggregate<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IPaginatedResult<any>
    >([...prependedPipelines, ...getPaginationAggregation(args)]);

    return paginatedResults;
  };

schema.static("findPaginated", findPaginatedAuth);

export default model<AuthType, AuthModel>("Auth", schema);
