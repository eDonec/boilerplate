/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable no-console */
import app, { baseUrl } from "init.testSetup";
import { StatusCodes } from "shared-types";
import supertest from "supertest";

describe("GET /category/bulk", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const body = { ids: ["5f9f1b9b9b9b9b9b9b9b9b9b"] };
      const response = await supertest(app)
        .get(`${baseUrl}/category/bulk`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const body = { ids: [909090909009] };
      const response = await supertest(app)
        .get(`${baseUrl}/category/bulk`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});

// describe("GET /category/id-by-slug/:slug", () => {
//   describe("validation tests", () => {
//     it("should respond successfully (1)", async () => {
//       const response = await supertest(app).get(
//         `${baseUrl}/category/id-by-slug/generated_string`
//       );

//       expect(response.status).toEqual(StatusCodes.OK);
//     });

//     it("should throw a validation error (2)", async () => {
//       const response = await supertest(app).get(
//         `${baseUrl}/category/id-by-slug/9090909`
//       );

//       expect(response.status).toEqual(StatusCodes["Bad Request"]);
//     });
//   });
// });

// describe("GET /category/static-paths", () => {
//   describe("validation tests", () => {});
// });

// describe("GET /category/by-slug/:slug", () => {
//   describe("validation tests", () => {
//     it("should respond successfully (1)", async () => {
//       const response = await supertest(app).get(
//         `${baseUrl}/category/by-slug/generated_string`
//       );

//       expect(response.status).toEqual(StatusCodes.OK);
//     });

//     it("should throw a validation error (2)", async () => {
//       const response = await supertest(app).get(
//         `${baseUrl}/category/by-slug/9090909`
//       );

//       expect(response.status).toEqual(StatusCodes["Bad Request"]);
//     });
//   });
// });
