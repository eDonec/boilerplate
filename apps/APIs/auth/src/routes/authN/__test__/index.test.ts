import app, { baseUrl } from "init.testSetup";
import { seed } from "seed/seed";
import { StatusCodes } from "shared-types";
import supertest from "supertest";

beforeEach(async () => {
  try {
    await seed(false);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seeding is not available");
    // eslint-disable-next-line no-console
    console.error(error);
  }
});

describe("POST /n/classic", () => {
  describe("validation tests", () => {
    it("should respond successfully to email and password and assign default role to PUBLIC", async () => {
      const body = { email: "test@example.com", password: "password" };
      const response = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.Created);
      expect(response.body.role.name).toEqual("PUBLIC");
    });
    it("should throw a validation error if email is badly formatted", async () => {
      const body = { email: "testexample.com", password: "password" };
      const response = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
    it("should throw a validation error if password is badly formatted", async () => {
      const body = { email: "testexample.com", password: "123" };
      const response = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
    it("should throw a validation error if password field is absent", async () => {
      const body = { email: "testexample.com" };
      const response = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
    it("should throw a validation error if email field is absent", async () => {
      const body = { password: "password" };
      const response = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});

describe("GET /n/me", () => {
  it("should sign-up and receive a token to be used for getting self", async () => {
    const signUpBody = { email: "test1@example.com", password: "password" };
    const signUpResponse = await supertest(app)
      .post(`${baseUrl}/n/classic`)
      .send(signUpBody);

    const getMeResponse = await supertest(app)
      .get(`${baseUrl}/n/me`)
      .set("Authorization", `Bearer ${signUpResponse.body.token.accessToken}`);

    expect(getMeResponse.body.authID).toBe(signUpResponse.body.authID);
  });
});

describe("PUT /n/update-password", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const signUpBody = { email: "test1@example.com", password: "password" };
      const signUpResponse = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(signUpBody);

      const body = {
        password: "password",
        newPassword: "new_password",
      };
      const response = await supertest(app)
        .put(`${baseUrl}/n/update-password`)
        .set("Authorization", `Bearer ${signUpResponse.body.token.accessToken}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw an error if the old password is incorrect", async () => {
      const signUpBody = { email: "test1@example.com", password: "password" };
      const signUpResponse = await supertest(app)
        .post(`${baseUrl}/n/classic`)
        .send(signUpBody);

      const body = { password: "wrong_password", newPassword: "new_password" };
      const response = await supertest(app)
        .put(`${baseUrl}/n/update-password`)
        .set("Authorization", `Bearer ${signUpResponse.body.token.accessToken}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.Forbidden);
    });
  });
});
