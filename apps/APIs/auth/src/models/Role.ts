import {
  RoleModel,
  RoleType,
  RoleTypeSaticMethods,
} from "auth-types/models/Role";
import { model, Schema } from "mongoose";
import { populateRedis } from "seed/populateRedis";
import { ACCESS_RESSOURCES, IPaginatedResult, PRIVILEGE } from "shared-types";

import { getPaginationAggregation } from "helpers/getPaginationAggregation";

import Auth from "./Auth";

const schema = new Schema<RoleType, RoleModel>(
  {
    isDefault: { type: Boolean, required: true, default: false },
    name: { type: String, required: true, unique: true },
    access: [
      {
        ressource: {
          type: String,
          required: true,
          enum: ACCESS_RESSOURCES,
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IPaginatedResult<any>
    >([...prependedPipelines, ...getPaginationAggregation(args)]);

    return paginatedResults;
  };

schema.static("findPaginated", findPaginatedRoles);
// TODO: find a way around this and the seed script
// schema.static("findOneAndUpdate", async () => {
//   throw new Error(
//     "Do not use findOneAndUpdate on the Role! Use .save() instead!"
//   );
// });
schema.static("findByIdAndUpdate", async () => {
  throw new Error(
    "Do not use findByIdAndUpdate on the Role! Use .save() instead!"
  );
});
schema.static("findAndUpdate", async () => {
  throw new Error("Do not use findAndUpdate on the Role! Use .save() instead!");
});
schema.static("updateMany", async () => {
  throw new Error("Do not use updateMany on the Role! Use .save() instead!");
});
schema.static("updateOne", async () => {
  throw new Error("Do not use updateOne on the Role! Use .save() instead!");
});

schema.post("save", async (doc) => {
  await Auth.updateMany(
    { "role._id": doc._id },
    {
      $set: {
        "role.name": doc.name,
        "role.access": doc.access,
      },
    }
  );
  await populateRedis();
});

export default model<RoleType, RoleModel>("Role", schema);
