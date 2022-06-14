/* eslint-disable no-console */
import app, { baseUrl } from "init.testSetup";
import { populateRedis } from "seed/populateRedis";
import { seed } from "seed/seed";
import { StatusCodes } from "shared-types";
import supertest from "supertest";
import "dotenv/config";

let token: string;

beforeEach(async () => {
  try {
    await seed();
    await populateRedis();
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
