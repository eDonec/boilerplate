/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as mongoose from "mongoose";

export const clearMockDB = async () => {
  const { collections } = mongoose.connection;

  await Promise.all(
    Object.values(collections).map((collection) => collection.deleteMany({}))
  );
};
export const connectToMockDB = async () => {
  await mongoose.connect(process.env.MONGOINSTANCE_URI!);
};

export const closeMockDB = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};
