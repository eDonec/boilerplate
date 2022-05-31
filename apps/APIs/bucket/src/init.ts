/* eslint-disable no-console */
import { json } from "body-parser";
import producer from "events/producer";
import fs from "fs-extra";
import Server from "http-server";
import path from "path";
// eslint-disable-next-line simple-import-sort/imports
import "dotenv/config";

if (!process.env.TMP_DIR_NAME)
  throw new Error("Missing .env variable : TMP_DIR_NAME");

export const resolvePath = (...pathToResolve: string[]) =>
  path.join(__dirname, `../`, ...pathToResolve);

fs.mkdirSync(resolvePath(process.env.TMP_DIR_NAME), { recursive: true });

const server = new Server(producer.emit.BucketError);

server.use(json());

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

server.app.get("/api/v1/bucket/health", (_, res) => {
  res.send({
    uptime: process.uptime(),
    health: "OK",
    microServiceName: process.env.MICROSERVICE_NAME,
    currentTime: new Date().toISOString(),
  });
});

export default server.app;

export const { Router } = server;
