import {
  LeanRoleDocument,
  RoleModel,
  RoleType,
  RoleTypeSaticMethods,
} from "auth-types/models/Role";
import { model, Schema } from "mongoose";
import { IPaginatedResult, PRIVILEGE } from "shared-types";

import { getPaginationAggregation } from "helpers/getPaginationAggregation";

const schema = new Schema<RoleType, RoleModel>(
  {
    isDefault: { type: Boolean, required: true, default: false },
    name: { type: String, required: true, unique: true },
    access: [
      {
        ressource: {
          type: String,
          required: true,
        },
        privileges: {
          type: Number,
          enum: PRIVILEGE,
          required: true,
        },
        meta: {
          type: Schema.Types.Mixed,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const findPaginatedRoles: RoleTypeSaticMethods["findPaginated"] =
  async function findPaginatedRoles(this, args, prependedPipelines = []) {
    const [paginatedResults] = await this.aggregate<
      IPaginatedResult<LeanRoleDocument>
    >([...prependedPipelines, ...getPaginationAggregation(args)]);

    return paginatedResults;
  };

schema.static("findPaginated", findPaginatedRoles);

export default model<RoleType, RoleModel>("Role", schema);
