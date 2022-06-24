/* eslint-disable no-console */
import { createFakeToken } from "http-server/tests/createFakeToken";
import app, { baseUrl } from "init.testSetup";
import { ACCESS_RESSOURCES, PRIVILEGE, StatusCodes } from "shared-types";
import supertest from "supertest";

const tokenWithAccess = createFakeToken([
  {
    ressource: ACCESS_RESSOURCES.MICROSERVICE_STATUS,
    privileges: PRIVILEGE.READ,
  },
]);

describe("GET /status", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const query = { page: "1", limit: "10" };
      const response = await supertest(app)
        .get(`${baseUrl}/status`)
        .set("Authorization", `Bearer ${tokenWithAccess}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const query = { page: "asdasd", limit: "asdasd" };
      const response = await supertest(app)
        .get(`${baseUrl}/status`)
        .set("Authorization", `Bearer ${tokenWithAccess}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });

    it("should throw a validation error (3)", async () => {
      const query = { page: "generated_string", limit: "generated_string" };
      const response = await supertest(app)
        .get(`${baseUrl}/status`)
        .set("Authorization", `Bearer ${tokenWithAccess}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});
describe("GET /status/:name", () => {
  describe("validation tests", () => {
    it("should throw a validation error (2)", async () => {
      const response = await supertest(app)
        .get(`${baseUrl}/status/random-name`)
        .set("Authorization", `Bearer ${tokenWithAccess}`);

      expect(response.status).toEqual(StatusCodes["Not Found"]);
    });

    it("should throw a validation error (3)", async () => {
      const query = { page: "generated_string", limit: "generated_string" };
      const response = await supertest(app)
        .get(`${baseUrl}/status`)
        .set("Authorization", `Bearer ${tokenWithAccess}`)
        .query(query);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});
