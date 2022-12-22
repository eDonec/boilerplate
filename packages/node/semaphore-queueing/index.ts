const DEFAULT_QUEUE = { args: [], isRunning: false };
const DEFAULT_TOPIC = "default";

/**
 * SemaphoreQueue is a generic class that allows you to queue up tasks and execute them in a semaphore-like fashion, meaning that only one task will be executed at a time.
 * You can specify a topic for each task, and tasks with the same topic will be executed in the order they were added to the queue.
 */
class SemaphoreQueue<T extends Array<unknown>> {
  /**
   * Record that represents the semaphore queue for each topic.
   * Each topic has a `args` property, which is an array of arguments to be passed to the function,
   * and an `isRunning` property, which indicates if the function is currently being executed.
   */
  private queue: Record<string, { args: T[]; isRunning: boolean }> = {
    [DEFAULT_TOPIC]: JSON.parse(JSON.stringify(DEFAULT_QUEUE)),
  };

  /**
   * The function to be executed in the semaphore queue.
   */
  private fn: (...args: T) => void | Promise<void>;

  /**
   * Constructor for the SemaphoreQueue class.
   * @param fn - The function to be executed in the semaphore queue.
   */
  constructor(fn: (...args: T) => Promise<void>) {
    this.fn = fn;
  }

  /**
   * Returns a boolean indicating if the function is currently being executed for a given topic.
   * If no topic is provided, it defaults to the DEFAULT_TOPIC.
   * @param topic - The topic to check the status of.
   * @returns boolean - Indicates if the function is currently being executed.
   */
  public getTopicStatus(topic = DEFAULT_TOPIC): boolean {
    return this.queue[topic].isRunning;
  }

  /**
   * Sets the isRunning property for a given topic to a provided boolean value.
   * If no topic is provided, it defaults to the DEFAULT_TOPIC.
   * @param value - The boolean value to set the isRunning property to.
   * @param topic - The topic to set the isRunning property for.
   */
  private setTopicStatus(value: boolean, topic = DEFAULT_TOPIC): void {
    this.queue[topic].isRunning = value;
  }

  /**
   * Creates a new object with a run method that allows running the function for a given topic with the provided arguments.
   * @param topic - The topic to run the function for.
   * @returns object - An object with a run method.
   */
  public topic(topic: string) {
    return {
      run: (...args: T) => this._run(topic, ...args),
    };
  }

  /**
   * Allows running the function with the provided arguments.
   * If no topic is provided, it defaults to the DEFAULT_TOPIC.
   * @param args - The arguments to pass to the function.
   */
  public run(...args: T) {
    return this._run(DEFAULT_TOPIC, ...args);
  }

  /**
   * Private method that adds the provided arguments to the queue for a given topic,
   * and then calls the execute method to execute the function if it is not already running.
   * @param topic - The topic to add the arguments to the queue for.
   * @param args - The arguments to add to the queue.
   **/
  private _run(topic: string, ...args: T) {
    if (!this.queue[topic])
      this.queue[topic] = JSON.parse(JSON.stringify(DEFAULT_QUEUE));
    this.queue[topic].args.push(args);
    this.execute(topic);
  }

  /**
   * Executes the next task in the queue for the specified topic.
   *
   * @param topic - A string that represents the topic. Defaults to `"default"`.
   */

  private async execute(topic = DEFAULT_TOPIC) {
    if (this.getTopicStatus(topic)) return;
    if (this.queue[topic].args.length === 0) return;
    this.setTopicStatus(true, topic);

    const args = this.queue[topic].args[0];

    this.queue[topic].args.shift();

    await this.fn(...args);
    this.setTopicStatus(false, topic);
    await this.execute(topic);
  }
}

export default SemaphoreQueue;
