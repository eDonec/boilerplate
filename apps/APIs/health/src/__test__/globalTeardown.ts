/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";

export default async function globalTeardown() {
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;

  await mongoose.disconnect();
  await instance.stop();
}
