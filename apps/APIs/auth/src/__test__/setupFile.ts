// eslint-disable-next-line import/no-extraneous-dependencies
import { Crypto } from "@peculiar/webcrypto";

import {
  clearMockDB,
  closeMockDB,
  connectToMockDB,
} from "./utils/memoryServer/utils";

beforeAll(async () => {
  global.crypto = new Crypto();
  await connectToMockDB();
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
});
afterEach(async () => {
  await clearMockDB();
});

afterAll(async () => {
  await closeMockDB();
});
