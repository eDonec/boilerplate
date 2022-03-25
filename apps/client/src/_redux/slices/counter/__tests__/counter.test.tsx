import counter, { decrementCounter, incrementCounter } from "..";
import { CounterState } from "..";

describe("testable counter reducer", () => {
  const initialState: CounterState = {
    count: 3,
  };

  it("should handle increment", () => {
    const actual = counter(initialState, incrementCounter);

    expect(actual.count).toEqual(4);
  });

  it("should handle decrement", () => {
    const actual = counter(initialState, decrementCounter);

    expect(actual.count).toEqual(2);
  });
});
