// eslint-disable-next-line simple-import-sort/imports
import "dotenv/config";
/* eslint-disable no-console */
import { json } from "body-parser";
import producer from "events/producer";

import Server from "http-server";
import clsx from "core-utils/clsx";

const server = new Server(producer.emit.AuthError);

server.use(json());

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

server.use("/api/v1/auth*", (_req, res) => {
  res.send(clsx(["Hello"], "World", { "!": true }));
});
export default server.app;

// eslint-disable-next-line prefer-destructuring
export const Router = server.Router;
