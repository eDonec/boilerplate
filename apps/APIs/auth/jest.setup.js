import {
  clearMockDB,
  closeMockDB,
  connectToMockDB,
} from "./src/__mocks__/memoryServer";

beforeAll(connectToMockDB);
afterAll(closeMockDB);
afterEach(clearMockDB);
