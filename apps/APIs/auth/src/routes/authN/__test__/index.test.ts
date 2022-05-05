/* eslint-disable no-console */

import { json } from "body-parser";
import express from "express";
import { seed } from "seed/seed";
import { StatusCodes } from "shared-types";
import supertest from "supertest";

import authNRoutes from "..";

const app = express();

app.use(json(), authNRoutes);

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
      const response = await supertest(app)
        .post("/n/classic")
        .send({ email: "test@example.com", password: "password" });

      expect(response.status).toEqual(StatusCodes.Created);
    });
    it("should throw a validation error if email is badly formatted", async () => {
      const response = await supertest(app)
        .post("/n/classic")
        .send({ email: "testexample.com", password: "password" });

      expect(response.status).toEqual(StatusCodes.Unauthorized);
    });
    it("should throw a validation error if password is badly formatted", async () => {
      const response = await supertest(app)
        .post("/n/classic")
        .send({ email: "testexample.com", password: "123" });

      expect(response.status).toEqual(StatusCodes.Unauthorized);
    });
    it("should throw a validation error if password field is absent", async () => {
      const response = await supertest(app)
        .post("/n/classic")
        .send({ email: "testexample.com" });

      expect(response.status).toEqual(StatusCodes.Unauthorized);
    });
    it("should throw a validation error if email field is absent", async () => {
      const response = await supertest(app)
        .post("/n/classic")
        .send({ password: "password" });

      expect(response.status).toEqual(StatusCodes.Unauthorized);
    });
  });
});
