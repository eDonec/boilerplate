import { client } from "http-server";
import { populateRedis } from "seed/populateRedis";
import { seed } from "seed/seed";

import {
  clearMockDB,
  closeMockDB,
  connectToMockDB,
} from "./utils/memoryServer/utils";

beforeAll(async () => {
  await connectToMockDB();
  try {
    await seed(false);
    await populateRedis(false);
    await client.open();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Seeding is not available");
    // eslint-disable-next-line no-console
    console.error(error);
  }
}, 10000);

afterAll(async () => {
  await clearMockDB();
  await closeMockDB();
});
