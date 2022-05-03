/* eslint-disable no-console */
import { json } from "body-parser";
import clsx from "core-utils/clsx";
import express from "express";
import KafkaConsumer from "KafkaConsumer";
import KafkaProducer from "KafkaProducer";
import { connect, ConnectOptions } from "mongoose";
import "dotenv/config";

import router from "./routes";

enum Events {
  UserCreated = "UserCreated",
  UserUpdated = "UserUpdated",
  UserDeleted = "UserDeleted",
}
(async () => {
  const consumer = await new KafkaConsumer(Events, "auth").init();

  consumer.subscribe(
    "UserCreated",
    (message: { this: { is: string; test: string } }) => {
      console.log(message);
    }
  );
})();

(async () => {
  const producer = await new KafkaProducer(Events).init();

  setInterval(() => {
    producer.send({ this: { is: "a", test: "message" } }, "UserCreated");
  }, 3000);
  setInterval(() => {
    producer.send(
      { this: { is: "not", test: "string updated" } },
      "UserUpdated"
    );
  }, 2500);
})();
const app = express();

const port = process.env.PORT || 4000;

app.use(json());

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");

try {
  import("./seed");
} catch (error) {
  console.log("Seeding is not available");
}

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
