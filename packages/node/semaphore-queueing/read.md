# SemaphoreQueue

This is a class that provides a way to execute a function with arguments in a semaphore queue, meaning that the function will only be executed if it is not already running.

## Properties

- `queue`: A record that represents the semaphore queue for each topic. Each topic has a `args` property, which is an array of arguments to be passed to the function, and an `isRunning` property, which indicates if the function is currently being executed.
- `fn`: The function to be executed in the semaphore queue.

## Constructor

The `SemaphoreQueue` class has a single constructor that takes a function `fn` as a parameter.

```typescript
constructor(fn: (...args: T) => Promise<void>)
```

## Methods

### getTopicStatus

This method returns a boolean indicating if the function is currently being executed for a given topic. If no topic is provided, it defaults to the `DEFAULT_TOPIC`.

```typescript
public getTopicStatus(topic = DEFAULT_TOPIC): boolean
```

### setTopicStatus

This method sets the `isRunning` property for a given topic to a provided boolean value. If no topic is provided, it defaults to the `DEFAULT_TOPIC`.

```typescript
private setTopicStatus(value: boolean, topic = DEFAULT_TOPIC): void
```

### topic

This method creates a new object with a `run` method that allows running the function for a given topic with the provided arguments.

```typescript
public run(...args: T)
```

### run

This method allows running the function with the provided arguments. If no topic is provided, it defaults to the `DEFAULT_TOPIC`.

```typescript
private _run(topic: string, ...args: T)
```

### \_run

This is a private method that adds the provided arguments to the queue for a given topic, and then calls the `execute` method to execute the function if it is not already running.

```typescript
private async execute(topic = DEFAULT_TOPIC)
```

### execute

This is a private method that executes the function for a given topic if it is not already running, and removes the executed arguments from the queue. If the queue is empty, it does nothing. After the function has been executed, the `execute` method is called again to check if there are more arguments in the queue.

```typescript
import SemaphoreQueue from "path/to/SemaphoreQueue";

const fn = (...args: any[]) => {
  // function implementation
};

const semaphoreQueue = new SemaphoreQueue(fn);

semaphoreQueue.run(arg1, arg2);
```

## Example

Here is an example of how to use the `SemaphoreQueue` class:

```typescript
import SemaphoreQueue from "path/to/SemaphoreQueue";

const fn = (...args: any[]) => {
  // function implementation
};

const semaphoreQueue = new SemaphoreQueue(fn);

semaphoreQueue.topic("topic1").run(arg1, arg2);
semaphoreQueue.topic("topic2").run(arg3, arg4);
```
