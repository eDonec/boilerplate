/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";

export default async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();

  process.env.MONGOINSTANCE_URI = uri;
  (global as any).__MONGOINSTANCE = instance;

  await mongoose.connect(uri);
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
}
