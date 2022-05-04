/* eslint-disable no-console */
import {
  clearMockDB,
  closeMockDB,
  connectToMockDB,
} from "__test__/memoryServer";
import { AuthEvents as mockAuthEvents } from "auth-types/events";
import { json } from "body-parser";
import express from "express";
import { seed } from "seed/seed";
import { StatusCodes } from "shared-types";
import supertest from "supertest";
import "dotenv/config";

import authNRoutes from "..";

jest.mock("auth-events/producer", () =>
  jest.fn().mockImplementation(() => ({
    emit: Object.values(mockAuthEvents).reduce(
      (prev, cur) => ({ ...prev, [cur]: jest.fn }),
      {}
    ),
  }))
);

const app = express();

app.use(json(), authNRoutes);

beforeAll(async () => {
  await connectToMockDB();
  try {
    await seed();
  } catch (error) {
    console.log("Seeding is not available");
  }
});
afterEach(clearMockDB);
afterAll(closeMockDB);

describe("POST /n/classic", () => {
  it("should throw validation error", async () => {
    const response = await supertest(app)
      .post("/n/classic")
      .send({ email: "test@example.com", password: "password" });

    expect(response.status).toEqual(StatusCodes.Created);
  });
});
