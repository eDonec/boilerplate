import { Schema } from "mongoose";
import { PRIVILEGE } from "shared-types";

import { RoleType } from "./types";

export default new Schema<RoleType>({
  name: { type: String, required: true },
  access: {
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
});
