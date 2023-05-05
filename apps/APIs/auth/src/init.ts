// eslint-disable-next-line simple-import-sort/imports
import "dotenv/config";
import { json } from "body-parser";
import producer from "events/producer";
import Server from "http-server";

const server = new Server(producer.emit.AuthError);

export const { Router, baseUrl } = server;

server.use(json());

if (!process.env.DATABASE_BASE_URI || !process.env.MICROSERVICE_NAME)
  throw new Error("Missing .env key : DATABASE_BASE_URI or MICROSERVICE_NAME");

export default server.app;
