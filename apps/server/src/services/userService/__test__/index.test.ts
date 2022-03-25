import {
  clearMockDB,
  closeMockDB,
  connectToMockDB,
} from "__test__/memoryServer";
import { UserType } from "models/User/types";

import * as userService from "../index";

beforeAll(async () => connectToMockDB());
afterEach(async () => clearMockDB());
afterAll(async () => closeMockDB());

it("should have an empty database", async () => {
  const users = await userService.getUsers();

  expect(users.length).toBe(0);
});

it("should add user to database", async () => {
  const user: UserType = {
    name: "Test user",
    email: "test@example.com",
  };

  await userService.addUser(user);

  const users = await userService.getUsers();

  expect(users[0]?.name).toEqual(user.name);
  expect(users[0]?.email).toEqual(user.email);
});
