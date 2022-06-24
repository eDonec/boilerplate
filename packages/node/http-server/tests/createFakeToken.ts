import { ACCESS } from "shared-types";
import { TokenGenerator } from "token";

export const createFakeToken = (access: ACCESS[]): string => {
  const token = new TokenGenerator<{ authId: string; access: ACCESS[] }>({
    aud: "all",
    iss: "auth",
    sid: "session_id",
    payload: {
      authId: "fake-auth-id",
      access,
    },
  });

  return token.token;
};
