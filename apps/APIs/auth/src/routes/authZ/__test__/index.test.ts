/* eslint-disable no-console */
import app, { baseUrl } from "init.testSetup";
import Role from "models/Role";
import { seed } from "seed/seed";
import {
  ACCESS,
  ACCESS_RESSOURCES,
  PRIVILEGE,
  StatusCodes,
} from "shared-types";
import supertest from "supertest";

import { SUPER_ADMIN } from "constants/defaultRoles";

const BASE_URL = "/api/v1/auth";
let token: string;
const signInRootBody = {
  email: process.env.ROOT_USER_EMAIL,
  password: process.env.ROOT_USER_PASSWORD,
};
const signUpToBeBannedBody = {
  email: "email@toBeBanned.com",
  password: "password",
};
let toBeBannedId: string;

beforeEach(async () => {
  try {
    await seed(false);
    const signInResponse = await supertest(app)
      .post(`${BASE_URL}/n/sign-in/classic`)
      .send(signInRootBody);

    const signUpResponse = await supertest(app)
      .post(`${BASE_URL}/n/classic`)
      .send(signUpToBeBannedBody);

    token = signInResponse.body.token.accessToken;
    toBeBannedId = signUpResponse.body.authID;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seeding is not available");
  }
});

describe("POST /z/ban-client/:id", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const body = { reason: "generated_string" };
      const response = await supertest(app)
        .post(`${BASE_URL}/z/ban-client/${toBeBannedId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw not found on user", async () => {
      const body = { reason: 9090909 };
      const response = await supertest(app)
        .post(`${BASE_URL}/z/ban-client/generated_string`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Not Found"]);
    });
  });
});

describe("POST /z/suspend-client/:id", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const body = {
        reason: "generated_string",
        suspensionLiftTime: "2022-05-06T00:00:00.000Z",
      };
      const response = await supertest(app)
        .post(`${BASE_URL}/z/suspend-client/${toBeBannedId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const body = { reason: 9090909, suspensionLiftTime: 20220506 };
      const response = await supertest(app)
        .post(`${BASE_URL}/z/suspend-client/generated_string`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Not Found"]);
    });
  });
});

describe("GET /z/lift-ban-suspension/:id", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const response = await supertest(app)
        .get(`${BASE_URL}/z/lift-ban-suspension/${toBeBannedId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const response = await supertest(app)
        .get(`${BASE_URL}/z/lift-ban-suspension/9090909`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes["Not Found"]);
    });
  });
});

describe("PUT /z/access/:id", () => {
  let newUserId: string;
  let roleId: string;

  beforeEach(async () => {
    const body = { email: "test@example.com", password: "password" };
    const [response, role] = await Promise.all([
      supertest(app).post(`${BASE_URL}/n/classic`).send(body),
      Role.findOne({ name: SUPER_ADMIN.name }),
    ]);

    newUserId = response.body.authID;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    roleId = role!._id;
  });

  const access: ACCESS[] = [
    {
      ressource: ACCESS_RESSOURCES.PUBLIC,
      privileges: PRIVILEGE.READ,
    },
  ];

  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

      const response = await supertest(app)
        .put(`${baseUrl}/z/access/${newUserId}`)
        .send({ access, role: roleId })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const response = await supertest(app)
        .put(`${baseUrl}/z/access/9090909`)
        .send({ access, role: roleId })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});
