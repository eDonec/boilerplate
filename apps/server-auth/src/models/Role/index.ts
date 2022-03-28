import { model } from "mongoose";

import schema from "./schema";
import { RoleType } from "./types";

export default model<RoleType>("Role", schema);
