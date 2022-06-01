import { RoleType } from "auth-types/models/Role";
import { model, Schema } from "mongoose";
import { PRIVILEGE } from "shared-types";

const schema = new Schema<RoleType>(
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

export default model<RoleType>("Role", schema);
