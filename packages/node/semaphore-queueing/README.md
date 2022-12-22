# SemaphoreQueue

SemaphoreQueue is a generic class that allows you to queue up tasks and execute them in a semaphore-like fashion, meaning that only one task will be executed at a time. You can specify a topic for each task, and tasks with the same topic will be executed in the order they were added to the queue.

## Table of Contents

- [SemaphoreQueue](#semaphorequeue)
  - [Table of Contents](#table-of-contents)
  - [Properties](#properties)
  - [Usage](#usage)
  - [Methods](#methods)
    - [`constructor(fn: (args: T) => Promise<void>)`](#constructorfn-args-t--promisevoid)
      - [Parameters](#parameters)
    - [`getTopicStatus(topic = DEFAULT_TOPIC): boolean`](#gettopicstatustopic--default_topic-boolean)
      - [Parameters](#parameters-1)
      - [Returns](#returns)
    - [`setTopicStatus(value: boolean, topic = DEFAULT_TOPIC): void`](#settopicstatusvalue-boolean-topic--default_topic-void)
      - [Parameters](#parameters-2)
    - [`run(args: T, topic = "default")`](#runargs-t-topic--default)
      - [Parameters](#parameters-3)
    - [`private async execute(topic = DEFAULT_TOPIC)`](#private-async-executetopic--default_topic)
      - [Parameters](#parameters-4)
  - [Examples](#examples)

## Properties

- `queue`: A record that maps each topic to an object with two properties: `args` and `isRunning`. `args` is an array of arguments for the tasks in the queue, and `isRunning` is a boolean that indicates whether a task is currently being executed for that topic.

- `fn`: A function that represents the task to be executed. It should be a function that returns a promise.

## Usage

Here is an example of how you might use the `SemaphoreQueue` class:

```typescript
import SemaphoreQueue from "./SemaphoreQueue";

const queue = new SemaphoreQueue(async (x: number) => {
  console.log(`Running with x = ${x}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

queue.run(1); // logs "Running with x = 1"
queue.topic("topic1").run(11); // logs "Running with x = 1"
queue.run(2); // logs "Running with x = 2" after 1 second
queue.topic("topic1").run(22); // logs "Running with x = 22" after 1 second
queue.run(3); // logs "Running with x = 3" after 2 seconds
```

## Methods

### `constructor(fn: (args: T) => Promise<void>)`

Creates a new instance of `SemaphoreQueue`.

#### Parameters

- `fn`: A function that represents the task to be executed. It should be a function that returns a promise.

### `getTopicStatus(topic = DEFAULT_TOPIC): boolean`

Gets the status of the specified topic.

#### Parameters

- `topic`: A string that represents the topic. Defaults to `"default"`.

#### Returns

- A boolean that indicates whether a task is currently being executed for the specified topic.

### `setTopicStatus(value: boolean, topic = DEFAULT_TOPIC): void`

Sets the status of the specified topic.

#### Parameters

- `value`: A boolean that indicates whether a task is currently being executed for the specified topic.
- `topic`: A string that represents the topic. Defaults to `"default"`.

### `run(args: T, topic = "default")`

Adds a task to the queue for the specified topic.

#### Parameters

- `args`: The arguments for the task.
- `topic`: A string that represents the topic. Defaults to `"default"`.

### `private async execute(topic = DEFAULT_TOPIC)`

Executes the next task in the queue for the specified topic.

#### Parameters

- `topic`: A string that represents the topic. Defaults to `"default"`.

## Examples

Here are some usage examples for the `**SemaphoreQueue**` class:

```typescript
import SemaphoreQueue from "./SemaphoreQueue";

// Create a new SemaphoreQueue instance with a task that simulates an API call
const apiQueue = new SemaphoreQueue(async (params) => {
  console.log(`Making API call with params: ${params}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
});

// Add some tasks to the queue
apiQueue.run("foo");
apiQueue.run("bar");
apiQueue.run("baz");

// Check the status of the default topic
console.log(apiQueue.getTopicStatus()); // Output: true

// Check the status of a custom topic
console.log(apiQueue.getTopicStatus("customTopic")); // Output: false

// Add a task to a custom topic

apiQueue.topic("customTopic").run("foo", "bar");

// Check the status of the custom topic
console.log(apiQueue.getTopicStatus("customTopic")); // Output: true
```

This will output the following:

```bash
Making API call with params: foo
Making API call with params: bar
Making API call with params: baz
true
false
Making API call with params: qux
```

Note that the tasks will be executed one at a time, with a delay of 1 second between each task. This is because the SemaphoreQueue instance is set up to simulate an API call, which usually takes some time to complete.
