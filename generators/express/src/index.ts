/* eslint-disable no-console */
import clsx from "core-utils/clsx";
import express from "express";
import { connect, ConnectOptions } from "mongoose";
import router from "routes";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 4000;

app.get("{BASE_PATH}", (_req, res) => {
  res.send(clsx(["Hello"], "World", { "!": true }));
});

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

app.use("{BASE_PATH}", router);

connect(process.env.DATABASE_URI, databaseConfig)
  .then(() => {
    app.listen(port, () => {
      console.log(`🚀 Server listening at http://localhost:${port}`);
    });
  })
  .catch(console.error);
