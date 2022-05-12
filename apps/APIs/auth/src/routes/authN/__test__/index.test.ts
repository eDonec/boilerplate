/* eslint-disable no-console */
// import app from "init";
import app from "init";
import { seed } from "seed/seed";
import { StatusCodes } from "shared-types";
import supertest from "supertest";

import authNRoutes from "..";

// app.use(json());

app.use(authNRoutes);

beforeEach(async () => {
  try {
    await seed();
  } catch (error) {
    console.error("Seeding is not available");
  }
});

describe("POST /n/classic", () => {
  describe("validation tests", () => {
    it("should respond successfully to email and password", async () => {
      const body = { email: "test@example.com", password: "password" };
      const response = await supertest(app).post("/n/classic").send(body);

      console.log(response.body);

      expect(response.status).toEqual(StatusCodes.Created);
    });
    it("should throw a validation error if email is badly formatted", async () => {
      const body = { email: "testexample.com", password: "password" };
      const response = await supertest(app).post("/n/classic").send(body);

      expect(response.status).toEqual(StatusCodes.Unauthorized);
    });
    it("should throw a validation error if password is badly formatted", async () => {
      const body = { email: "testexample.com", password: "123" };
      const response = await supertest(app).post("/n/classic").send(body);

      expect(response.status).toEqual(StatusCodes.Unauthorized);
    });
    it("should throw a validation error if password field is absent", async () => {
      const body = { email: "testexample.com" };
      const response = await supertest(app).post("/n/classic").send(body);

      expect(response.status).toEqual(StatusCodes.Unauthorized);
    });
    it("should throw a validation error if email field is absent", async () => {
      const body = { password: "password" };
      const response = await supertest(app).post("/n/classic").send(body);

      expect(response.status).toEqual(StatusCodes.Unauthorized);
    });
  });
});
