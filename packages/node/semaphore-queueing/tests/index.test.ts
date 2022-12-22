/* eslint-disable no-promise-executor-return */
import SemaphoreQueue from "..";

const testFunction = async (array: string[], element: string) => {
  await new Promise<void>((resolve) =>
    setTimeout(() => {
      array.push(element);
      resolve();
    }, 100)
  );
};

describe("SemaphoreQueue", () => {
  it("should execute tasks in the order they were added to the queue", async () => {
    const apiQueue = new SemaphoreQueue(testFunction);

    const result: string[] = [];

    apiQueue.run(result, "foo");
    apiQueue.run(result, "bar");
    apiQueue.run(result, "baz");

    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(result).toEqual(["foo", "bar", "baz"]);
  });

  it("should execute tasks with the same topic in the order they were added to the queue", async () => {
    const apiQueue = new SemaphoreQueue(testFunction);

    const result1: string[] = [];
    const result2: string[] = [];

    apiQueue.topic("topic1").run(result1, "foo");
    apiQueue.topic("topic2").run(result2, "bar");
    apiQueue.topic("topic1").run(result1, "baz");
    apiQueue.topic("topic2").run(result2, "qux");
    apiQueue.topic("topic1").run(result1, "quux");
    apiQueue.topic("topic2").run(result2, "corge");

    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(result1.length + result2.length).toEqual(6);
    expect(result1.concat(result2)).toEqual(
      ["foo", "baz", "quux"].concat(["bar", "qux", "corge"])
    );
  });
});
