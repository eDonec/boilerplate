// eslint-disable-next-line import/no-extraneous-dependencies
import { Crypto } from "@peculiar/webcrypto";

import {
  clearMockDB,
  closeMockDB,
  connectToMockDB,
} from "./utils/memoryServer/utils";

beforeAll(async () => {
  global.crypto = new Crypto();
  connectToMockDB();
});
afterEach(async () => {
  await clearMockDB();
});

afterAll(async () => {
  await closeMockDB();
});
