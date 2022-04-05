import { model } from "mongoose";

import schema from "./schema";
import { RoleType } from "./types";

const Role = model<RoleType>("Role", schema);

export default Role;
