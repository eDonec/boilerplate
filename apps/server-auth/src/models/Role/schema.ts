import { Schema } from "mongoose";
import { PRIVILEGE } from "shared-types";

import { RoleType } from "./types";

const Role = new Schema<RoleType>({
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
    },
  ],
});

export default Role;
