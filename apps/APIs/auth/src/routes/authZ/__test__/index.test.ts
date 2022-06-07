/* eslint-disable no-console */
import app, { baseUrl } from "init.testSetup";
import { seed } from "seed/seed";
import { ACCESS_RESSOURCES, PRIVILEGE, StatusCodes } from "shared-types";
import supertest from "supertest";

beforeEach(async () => {
  try {
    await seed(false);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seeding is not available");
  }
});

describe("POST /z/ressource-access", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      // console.log(signUpResponse);
      const signUpBody = { email: "test1@example.com", password: "password" };
      const signUpResponse = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(signUpBody);

      const token = signUpResponse.body.token.accessToken;

      const body = {
        ressource: ACCESS_RESSOURCES.PUBLIC,
        privileges: PRIVILEGE.REVOKE,
      };

      const response = await supertest(app)
        .post(`${baseUrl}/z/ressource-access`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.Accepted);
    });

    it("should not throw a validation error but throw forbidden error", async () => {
      const signUpBody = { email: "test1@example.com", password: "password" };
      const signUpResponse = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(signUpBody);

      const token = signUpResponse.body.token.accessToken;
      const body = { ressource: "9090909", privileges: 6 };
      const response = await supertest(app)
        .post(`${baseUrl}/z/ressource-access`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.Forbidden);
    });

    it("should throw a validation error", async () => {
      const body = { ressource: 9090909, privileges: 9090909 };
      const signUpBody = { email: "test1@example.com", password: "password" };
      const signUpResponse = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(signUpBody);

      const token = signUpResponse.body.token.accessToken;
      const response = await supertest(app)
        .post(`${baseUrl}/z/ressource-access`)
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
    it("should throw a token error when not passed", async () => {
      const body = { ressource: "9090909", privileges: 3 };
      const response = await supertest(app)
        .post(`${baseUrl}/z/ressource-access`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.Forbidden);
    });
  });
});
