/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable max-lines */
import { createFakeToken } from "http-server/tests/createFakeToken";
import app, { baseUrl } from "init.testSetup";
import Blog from "models/Blog";
import { ACCESS_RESSOURCES, PRIVILEGE, StatusCodes } from "shared-types";
import supertest from "supertest";

const writeBlogsToken = createFakeToken([
  {
    ressource: ACCESS_RESSOURCES.BLOGS,
    privileges: PRIVILEGE.WRITE,
  },
]);

const readBlogsToken = createFakeToken([
  {
    ressource: ACCESS_RESSOURCES.BLOGS,
    privileges: PRIVILEGE.READ,
  },
]);

const deleteBlogsToken = createFakeToken([
  {
    ressource: ACCESS_RESSOURCES.BLOGS,
    privileges: PRIVILEGE.DELETE,
  },
]);

describe("POST /blogs/", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const body = {
        banner: {
          key: "generated_string",
          type: "generated_string",
          name: "generated_string",
          _id: "generated_string",
          url: "generated_string",
        },
        title: "generated_string",
        description: "generated_string",
        metaDescription: "generated_string",
        content: "generated_string",
        secondaryCategories: [],
        mainCategory: "generated_string",
      };
      const response = await supertest(app)
        .post(`${baseUrl}/blogs/`)
        .set("Authorization", `Bearer ${writeBlogsToken}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.Created);
    });

    it("should throw a validation error (2)", async () => {
      const body = {
        banner: {
          key: 9090909,
          type: 9090909,
          name: 9090909,
          _id: 9090909,
          url: 9090909,
        },
        title: 909090,
        description: 909090,
        metaDescription: 909090,
        content: 909090,
        secondaryCategories: [],
        mainCategory: "generated_string",
      };
      const response = await supertest(app)
        .post(`${baseUrl}/blogs/`)
        .set("Authorization", `Bearer ${writeBlogsToken}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});

describe("GET /blogs/:slug", () => {
  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const body = {
        banner: {
          key: "generated_string",
          type: "generated_string",
          name: "generated_string",
          _id: "generated_string",
          url: "generated_string",
        },
        title: "generated_string",
        description: "generated_string",
        metaDescription: "generated_string",
        content: "generated_string",
        secondaryCategories: [],
        mainCategory: "generated_string",
      };

      await supertest(app)
        .post(`${baseUrl}/blogs/`)
        .set("Authorization", `Bearer ${writeBlogsToken}`)
        .send(body);

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const { slug } = (await Blog.findOne({}))!;

      const response = await supertest(app)
        .get(`${baseUrl}/blogs/${slug}`)
        .set("Authorization", `Bearer ${readBlogsToken}`);

      expect(response.status).toEqual(StatusCodes.OK);
    });
  });
});

describe("PUT /blogs/:slug", () => {
  let blogToUpdateId: string;

  beforeEach(async () => {
    const body = {
      banner: {
        key: "generated_string",
        type: "generated_string",
        name: "generated_string",
        _id: "generated_string",
        url: "generated_string",
      },
      title: "generated_string",
      description: "generated_string",
      metaDescription: "generated_string",
      content: "generated_string",
      secondaryCategories: [],
      mainCategory: "generated_string",
    };

    await supertest(app)
      .post(`${baseUrl}/blogs/`)
      .set("Authorization", `Bearer ${writeBlogsToken}`)
      .send(body);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { slug } = (await Blog.findOne({}))!;

    blogToUpdateId = slug;
  });

  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const body = {
        title: "generated_string",
        description: "generated_string",
        content: "generated_string",
      };
      const response = await supertest(app)
        .put(`${baseUrl}/blogs/${blogToUpdateId}`)
        .set("Authorization", `Bearer ${writeBlogsToken}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes.OK);
    });

    it("should throw a validation error (2)", async () => {
      const body = {
        title: 909090,
        description: 909090,
        content: 909090,
      };
      const response = await supertest(app)
        .put(`${baseUrl}/blogs/${blogToUpdateId}`)
        .set("Authorization", `Bearer ${writeBlogsToken}`)
        .send(body);

      expect(response.status).toEqual(StatusCodes["Bad Request"]);
    });
  });
});

describe("DELETE /blogs/:slug", () => {
  let blogToDelete: string;

  beforeEach(async () => {
    const body = {
      banner: {
        key: "generated_string",
        type: "generated_string",
        name: "generated_string",
        _id: "generated_string",
        url: "generated_string",
      },
      title: "generated_string",
      description: "generated_string",
      metaDescription: "generated_string",
      content: "generated_string",
      secondaryCategories: [],
      mainCategory: "generated_string",
    };

    await supertest(app)
      .post(`${baseUrl}/blogs/`)
      .set("Authorization", `Bearer ${writeBlogsToken}`)
      .send(body);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const { slug } = (await Blog.findOne({}))!;

    blogToDelete = slug;
  });

  describe("validation tests", () => {
    it("should respond successfully (1)", async () => {
      const response = await supertest(app)
        .delete(`${baseUrl}/blogs/${blogToDelete}`)
        .set("Authorization", `Bearer ${deleteBlogsToken}`);

      expect(response.status).toEqual(StatusCodes.OK);
    });
  });
});

// describe("GET /blogs/by-category", () => {
//   describe("validation tests", () => {
//     it("should respond successfully (1)", async () => {
//       const query = { page: 420, limit: 420 };
//       const response = await supertest(app)
//         .get(`${baseUrl}/blogs/by-category/generated_string`)
//         .query(query);

//       expect(response.status).toEqual(StatusCodes.OK);
//     });

//     it("should throw a validation error (2)", async () => {
//       const query = { page: "420", limit: "420" };
//       const response = await supertest(app)
//         .get(`${baseUrl}/blogs/by-category/generated_string`)
//         .query(query);

//       expect(response.status).toEqual(StatusCodes["Bad Request"]);
//     });

//     it("should throw a validation error (3)", async () => {
//       const query = { page: 420, limit: 420 };
//       const response = await supertest(app)
//         .get(`${baseUrl}/blogs/by-category/9090909`)
//         .query(query);

//       expect(response.status).toEqual(StatusCodes["Bad Request"]);
//     });

//     it("should throw a validation error (4)", async () => {
//       const query = { page: "420", limit: "420" };
//       const response = await supertest(app)
//         .get(`${baseUrl}/blogs/by-category/9090909`)
//         .query(query);

//       expect(response.status).toEqual(StatusCodes["Bad Request"]);
//     });
//   });
// });
