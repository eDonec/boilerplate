/* eslint-disable max-lines */
/* eslint-disable no-console */
import app, { baseUrl } from "init.testSetup";
import Role from "models/Role";
import { populateRedis } from "seed/populateRedis";
import { seed } from "seed/seed";
import {
  ACCESS,
  ACCESS_RESSOURCES,
  PRIVILEGE,
  StatusCodes,
} from "shared-types";
import supertest from "supertest";
import "dotenv/config";

import { SUPER_ADMIN } from "constants/defaultRoles";

let token: string;

jest.setTimeout(10000);
beforeEach(async () => {
  try {
    await seed(false);
    await populateRedis(false);
    const signInBody = {
      email: process.env.ROOT_USER_EMAIL,
      password: process.env.ROOT_USER_PASSWORD,
    };
    const signInResponse = await supertest(app)
      .post(`${baseUrl}/n/sign-in/classic`)
      .send(signInBody);

    token = signInResponse.body.token.accessToken;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seeding is not available");
    // eslint-disable-next-line no-console
    console.error(error);
  }
});
describe("GET /clients/", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const query = {
        page: "1",
        limit: "10",
      };
      const response = await supertest(app)
        .get(`${baseUrl}/clients/`)
        .set("Authorization", `Bearer ${token}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const query = {
        page: "generated_string",
        "sort-field": "generated_string",
        limit: "generated_string",
      };
      const response = await supertest(app)
        .get(`${baseUrl}/clients/`)
        .set("Authorization", `Bearer ${token}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });

    it("should respond successfully (3)", async () => {
      const query = {
        "sort-direction": "asc",
        "sort-field": "email",
        limit: "1",
      };
      const response = await supertest(app)
        .get(`${baseUrl}/clients/`)
        .set("Authorization", `Bearer ${token}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (4)", async () => {
      const query = {
        "sort-direction": 9090909,
        "sort-field": 9090909,
        limit: 9090909,
      };
      const response = await supertest(app)
        .get(`${baseUrl}/clients/`)
        .set("Authorization", `Bearer ${token}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });

    it("should respond successfully (5)", async () => {
      const query = {
        "sort-direction": "generated_string",
        page: "generated_string",
        limit: "generated_string",
      };
      const response = await supertest(app)
        .get(`${baseUrl}/clients/`)
        .set("Authorization", `Bearer ${token}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });

    it("should throw a validation error (6)", async () => {
      const query = {
        "sort-direction": 9090909,
        page: 9090909,
        limit: 9090909,
      };
      const response = await supertest(app)
        .get(`${baseUrl}/clients/`)
        .set("Authorization", `Bearer ${token}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });

    it("should respond successfully (7)", async () => {
      const query = {
        "sort-direction": "generated_string",
        page: "generated_string",
        "sort-field": "generated_string",
      };
      const response = await supertest(app)
        .get(`${baseUrl}/clients/`)
        .set("Authorization", `Bearer ${token}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });

    it("should respond successfully (9)", async () => {
      const query = {
        "sort-direction": "asc",
        page: "1",
        "sort-field": "email",
        limit: 10,
      };
      const response = await supertest(app)
        .get(`${baseUrl}/clients/`)
        .set("Authorization", `Bearer ${token}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (10)", async () => {
      const query = {
        "sort-direction": 9090909,
        page: 9090909,
        "sort-field": 9090909,
        limit: 9090909,
      };
      const response = await supertest(app)
        .get(`${baseUrl}/clients/`)
        .set("Authorization", `Bearer ${token}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});

describe("GET /clients/:id", () => {
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
        .get(`${baseUrl}/clients/${newUserId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const response = await supertest(app)
        .get(`${baseUrl}/clients/9090909`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});

describe("PUT /clients/clientAccess/:id", () => {
  let newUserId: string;
  let roleId: string;

  beforeEach(async () => {
    const body = { email: "test@example.com", password: "password" };
    const [response, role] = await Promise.all([
      supertest(app).post(`${baseUrl}/n/classic`).send(body),
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
        .put(`${baseUrl}/clients/clientAccess/${newUserId}`)
        .send({ access, role: roleId })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const response = await supertest(app)
        .put(`${baseUrl}/clients/clientAccess/9090909`)
        .send({ access, role: roleId })
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});
