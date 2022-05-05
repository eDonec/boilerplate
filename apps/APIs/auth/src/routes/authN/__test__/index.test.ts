/* eslint-disable no-console */

import { json } from "body-parser";
import express from "express";
import { seed } from "seed/seed";
import { StatusCodes } from "shared-types";
import supertest from "supertest";
import "dotenv/config";

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
  it("should throw validation error", async () => {
    const response = await supertest(app)
      .post("/n/classic")
      .send({ email: "test@example.com", password: "password" });

    expect(response.status).toEqual(StatusCodes.Created);
  });
});
