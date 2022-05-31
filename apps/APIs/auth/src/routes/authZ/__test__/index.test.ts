/* eslint-disable no-console */
import app from "init.testSetup";
import Auth from "models/Auth";
import Role from "models/Role";
import { seed } from "seed/seed";
import { generateAuthResponse } from "services/authN/helpers";
import {
  ACCESS_RESSOURCES,
  ACCESS_TYPE,
  AUTH_PROVIDERS,
  PRIVILEGE,
  StatusCodes,
} from "shared-types";
import supertest from "supertest";

import { PUBLIC_ROLE } from "constants/defaultRoles";

const BASE_URL = "/api/v1/auth";

let token: string;

beforeEach(async () => {
  try {
    await seed();
    const publicRole = await Role.findOne({ name: PUBLIC_ROLE.name });

    const auth = await Auth.create({
      email: "test@email.com",
      password: "password",
      role: publicRole,
      authType: ACCESS_TYPE.USER,
      authProvider: [AUTH_PROVIDERS.CLASSIC],
    });

    token = (await generateAuthResponse(auth)).token.accessToken;
  } catch (error) {
    console.error("Seeding is not available");
  }
});
describe("POST /z/ressource-access", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const body = {
        ressource: ACCESS_RESSOURCES.PUBLIC,
        privileges: PRIVILEGE.READ_SELF,
      };
      const response = await supertest(app)
        .post(`${BASE_URL}/z/ressource-access`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.Accepted);
    });

    it("should throw a validation error (2)", async () => {
      const body = { ressource: 9090909, privileges: 9090909 };
      const response = await supertest(app)
        .post(`${BASE_URL}/z/ressource-access`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.Forbidden);
    });
  });
});
