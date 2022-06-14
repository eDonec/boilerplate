/* eslint-disable max-lines */
/* eslint-disable no-console */
import app, { baseUrl } from "init.testSetup";
import { seed } from "seed/seed";
import { StatusCodes } from "shared-types";
import supertest from "supertest";
import "dotenv/config";

let token: string;

beforeEach(async () => {
  try {
    await seed(false);
    const signInBody = {
      email: process.env.ROOT_USER_EMAIL,
      password: process.env.ROOT_USER_PASSWORD,
    };
    const signUpResponse = await supertest(app)
      .post(`${baseUrl}/n/sign-in/classic`)
      .send(signInBody);

    token = signUpResponse.body.token.accessToken;
  } catch (error) {
    console.error("Seeding is not available");
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
