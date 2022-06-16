import { Client } from "redis-om";

const client = new Client();

client.open(process.env.REDIS_CLIENT);

export { client };
