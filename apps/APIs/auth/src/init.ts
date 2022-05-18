// eslint-disable-next-line simple-import-sort/imports
import "dotenv/config";
/* eslint-disable no-console */
import { json } from "body-parser";
import producer from "events/producer";

import Server from "http-server";

const server = new Server(producer.emit.AuthError);

server.use(json());

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

export default server.app;

// eslint-disable-next-line prefer-destructuring
export const Router = server.Router;
