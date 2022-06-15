/* eslint-disable no-console */
import app from "init.testSetup";
// import { populateRedis } from "seed/populateRedis";
import { seed } from "seed/seed";
import { StatusCodes } from "shared-types";
import supertest from "supertest";

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
    // await populateRedis(false);
    const signInResponse = await supertest(app)
      .post(`${BASE_URL}/n/sign-in/classic`)
      .set("Authorization", `Bearer ${token}`)
      .send(signInRootBody);
    const signUpResponse = await supertest(app)
      .post(`${BASE_URL}/n/classic`)
      .set("Authorization", `Bearer ${token}`)
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
