jest.mock("consumer", () =>
  jest.fn().mockImplementation(() => ({
    subscribe: jest.fn,
    subscribeToAll: jest.fn,
  }))
);
jest.mock("producer", () =>
  jest.fn().mockImplementation(() => ({
    send: jest.fn,
  }))
);

global.console = {
  ...console,
  log: jest.fn,
};
