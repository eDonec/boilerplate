import { model } from "mongoose";

import schema from "./schema";
import { AuthDocument, AuthModel } from "./types";

export default model<AuthDocument, AuthModel>("Auth", schema);
