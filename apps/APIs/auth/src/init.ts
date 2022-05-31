// eslint-disable-next-line simple-import-sort/imports
import "dotenv/config";
/* eslint-disable no-console */
import { json } from "body-parser";
import producer from "events/producer";
import Server from "http-server";

const server = new Server(producer.emit.AuthError);

export const { Router } = server;

server.use(json());

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

server.app.get("/api/v1/auth/health", (_, res) => {
  res.send({
    uptime: process.uptime(),
    health: "OK",
    microServiceName: process.env.MICROSERVICE_NAME,
    currentTime: new Date().toISOString(),
  });
});

export default server.app;
