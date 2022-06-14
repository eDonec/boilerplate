import { client } from "http-server";
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";

const mongod = MongoMemoryServer.create();

export const connectToMockDB = async () => {
  const uri = (await mongod).getUri();

  await mongoose.connect(uri);
};

export const closeMockDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (await mongod).stop();
  await client.close();
};

export const clearMockDB = async () => {
  const { collections } = mongoose.connection;

  await Promise.all(
    Object.values(collections).map((collection) => collection.deleteMany({}))
  );
};
