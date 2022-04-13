import { RoleType } from "api-types/auth-api/models/Role";
import { model, Schema } from "mongoose";
import { PRIVILEGE } from "shared-types";

const schema = new Schema<RoleType>({
  name: { type: String, required: true, unique: true },
  access: [
    {
      ressource: {
        type: String,
        required: true,
      },
      privileges: [
        {
          type: String,
          enum: PRIVILEGE,
          required: true,
        },
      ],
      meta: {
        type: Schema.Types.Mixed,
        default: null,
      },
    },
  ],
});

export default model<RoleType>("Role", schema);
