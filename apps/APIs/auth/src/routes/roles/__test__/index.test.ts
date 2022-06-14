/* eslint-disable no-console */
import { LeanRoleDocument } from "auth-types/models/Role";
import app, { baseUrl } from "init.testSetup";
import Role from "models/Role";
import { populateRedis } from "seed/populateRedis";
import { seed } from "seed/seed";
import { ACCESS_RESSOURCES, PRIVILEGE, StatusCodes } from "shared-types";
import supertest from "supertest";

import { PUBLIC_ROLE } from "constants/defaultRoles";

let token: string;

beforeEach(async () => {
  try {
    await seed(false);
    await populateRedis(false);
    const signInBody = {
      email: process.env.ROOT_USER_EMAIL,
      password: process.env.ROOT_USER_PASSWORD,
    };
    const signUpResponse = await supertest(app)
      .post(`${baseUrl}/n/sign-in/classic`)
      .send(signInBody);

    token = signUpResponse.body.token.accessToken;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seeding is not available");
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

describe("GET /roles/:id", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { id } = (await Role.findOne())!;

      const response = await supertest(app)
        .get(`${baseUrl}/roles/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const response = await supertest(app)
        .get(`${baseUrl}/roles/9090909`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});

const newRoleData: Partial<LeanRoleDocument> = {
  name: "New Role",
  access: [
    {
      ressource: ACCESS_RESSOURCES.PUBLIC,
      privileges: PRIVILEGE.READ,
    },
  ],
};

// TODO : add more tests
describe("PUT /roles/:id", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { id } = (await Role.findOne({ name: PUBLIC_ROLE.name }))!;

      const response = await supertest(app)
        .put(`${baseUrl}/roles/${id}`)
        .send(newRoleData)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const response = await supertest(app)
        .put(`${baseUrl}/roles/9090909`)
        .send(newRoleData)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});

describe("POST /roles/", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const response = await supertest(app)
        .post(`${baseUrl}/roles/`)
        .send(newRoleData)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.Created);
    });
    //TODO :  Add test on validation after implementing validation
  });
});

describe("DELETE /roles/:id", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      await supertest(app)
        .post(`${baseUrl}/roles/`)
        .send(newRoleData)
        .set("Authorization", `Bearer ${token}`);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { id } = (await Role.findOne({ name: newRoleData.name }))!;

      const response = await supertest(app)
        .delete(`${baseUrl}/roles/${id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
      expect(await Role.findOne({ name: newRoleData.name })).not.toBeTruthy();
    });

    it("should throw a validation error (2)", async () => {
      const response = await supertest(app)
        .delete(`${baseUrl}/roles/9090909`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});

describe("GET /roles/grantable/:authId", () => {
  let newUserId: string;

  beforeEach(async () => {
    const body = { email: "test@example.com", password: "password" };
    const response = await supertest(app)
      .post(`${baseUrl}/n/classic`)
      .send(body);

    newUserId = response.body.authID;
  });

  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const response = await supertest(app)
        .get(`${baseUrl}/roles/grantable/${newUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const response = await supertest(app)
        .get(`${baseUrl}/roles/grantable/9090909`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});
