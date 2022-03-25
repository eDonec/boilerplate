/* eslint-disable no-console */
import { json } from "body-parser";
import clsx from "core-utils/clsx";
import express from "express";
import { connect, ConnectOptions } from "mongoose";
import router from "routes";
import "dotenv/config";

const app = express();
const port = process.env.port || 4000;

app.use(json());

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

app.use("/api/v1/auth", router);
app.use("/api/v1/auth*", (_req, res) => {
  res.send(clsx(["Hello"], "World", { "!": true }));
});

connect(process.env.DATABASE_URI, databaseConfig)
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);
