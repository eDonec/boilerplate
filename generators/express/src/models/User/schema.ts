import { Schema } from "mongoose";

import { UserType } from "./types";

export default new Schema<UserType>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: String,
});
