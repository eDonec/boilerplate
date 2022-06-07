/* eslint-disable no-console */
import app, { baseUrl } from "init.testSetup";
import Role from "models/Role";
import { seed } from "seed/seed";
import { StatusCodes } from "shared-types";
import supertest from "supertest";

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
