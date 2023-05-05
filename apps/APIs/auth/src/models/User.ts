import {
  UserModel,
  UserType,
  UserTypeSaticMethods,
} from "auth-types/models/User";
import { model, Schema } from "mongoose";
import { IPaginatedResult } from "shared-types";

import { getPaginationAggregation } from "helpers/getPaginationAggregation";

import Auth from "./Auth";

const schema = new Schema<UserType, UserModel>(
  {
    firstName: { $type: String, required: false, trim: true },
    lastName: { $type: String, required: false, trim: true },
    phoneNumber: {
      $type: String,
      required: false,
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { phoneNumber: { $type: "string" } },
      },
    },
    auth: {
      $type: String,
      required: true,
      unique: true,
      ref: Auth,
    },
    avatar: {
      $type: {
        key: { type: String, required: true },
        type: { type: String, required: true },
        name: { type: String, required: true },
        _id: { type: String, required: true },
        url: { type: String, required: true },
      },
      required: false,
    },
  },
  { timestamps: true, typeKey: "$type" }
);
const findPaginatedUser: UserTypeSaticMethods["findPaginated"] =
  async function findPaginatedUsers(this, args, prependedPipelines = []) {
    const [paginatedResults] = await this.aggregate<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IPaginatedResult<any>
    >([...prependedPipelines, ...getPaginationAggregation(args)]);

    return paginatedResults;
  };

schema.static("findPaginated", findPaginatedUser);

export default model<UserType, UserModel>("User", schema);
