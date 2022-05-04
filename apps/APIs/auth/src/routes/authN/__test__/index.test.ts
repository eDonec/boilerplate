import {
  clearMockDB,
  closeMockDB,
  connectToMockDB,
} from "__test__/memoryServer";
import { json } from "body-parser";
import express from "express";
import request from "supertest";
import "dotenv/config";

import authNRoutes from "../index";

const app = express();

app.use(json(), authNRoutes);

beforeAll(async () => connectToMockDB());
afterEach(async () => clearMockDB());
afterAll(async () => closeMockDB());

describe("POST /n/classic", () => {
  it("should throw validation error", async () => {
    const response = await request(app)
      .post("/n/classic")
      .send({ email: "test@example.com", password: "password" });

    // TODO : fix this test
    expect(response.status).not.toEqual(200);
  });
});
