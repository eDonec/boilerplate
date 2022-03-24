import { model } from "mongoose";

import schema from "./schema";
import { UserType } from "./types";

export default model<UserType>("User", schema);
