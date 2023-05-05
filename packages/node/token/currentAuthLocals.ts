import { ACCESS } from "shared-types/auth/access";

import TokenValidator from "./TokenValidator";

export type TCurrentAuthLocals = {
  token: TokenValidator<{ authId: string; access: ACCESS[] }>;
};
