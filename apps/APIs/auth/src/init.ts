// eslint-disable-next-line simple-import-sort/imports
import "dotenv/config";
import { json } from "body-parser";
import producer from "events/producer";
import Server from "http-server";
import { Client } from "redis-om";

const server = new Server(producer.emit.AuthError);
const client = new Client();

client.open("redis://localhost:6379");

export { client };
export const { Router, baseUrl } = server;

server.use(json());

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

export default server.app;
