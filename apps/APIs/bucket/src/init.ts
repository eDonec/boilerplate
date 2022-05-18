/* eslint-disable no-console */
import { json } from "body-parser";
import producer from "events/producer";
import fs from "fs-extra";
import Server from "http-server";
import path from "path";
// eslint-disable-next-line simple-import-sort/imports
import "dotenv/config";

export const resolvePath = (...pathToResolve: string[]) =>
  path.join(__dirname, `../`, ...pathToResolve);

fs.mkdirSync(resolvePath("public"), { recursive: true });

const server = new Server(producer.emit.BucketError);

server.use(json());

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

export default server.app;

// eslint-disable-next-line prefer-destructuring
export const Router = server.Router;
