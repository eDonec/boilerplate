/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { AuthDocument } from "auth-types/models/Auth";
import Auth from "models/Auth";
import rAuthAccessSchema from "models/Redis/Auth";
import { connect, ConnectOptions } from "mongoose";
import { Client } from "redis-om";
import "dotenv/config";

import { constructRoleArray } from "helpers/constructRoleArray";

export const populateRedis = async () => {
  const client = await new Client().open();

  client.execute(["FLUSHALL"]);
  const authRepository = client.fetchRepository(rAuthAccessSchema);

  await authRepository.createIndex();

  console.log("Populating redis...");
  console.time("Redis Time:");
  const authClients = await Auth.find(
    {},
    {
      role: {
        access: {
          privileges: true,
          ressource: true,
        },
      },
      customAccessList: true,
      _id: true,
    }
  );

  for (let index = 0; index < authClients.length; index++) {
    const dbAuth = authClients[index];
    const auth = formatAuth(dbAuth);

    const promises = auth.map((o) => authRepository.createAndSave(o));

    await Promise.all(promises);
  }

  console.timeEnd("Redis Time:");

  client.close();
};

const formatAuth = (auth: AuthDocument) =>
  constructRoleArray(auth.role, auth.customAccessList).map((access) => ({
    authId: auth._id.toString(),
    ressource: access.ressource,
    privilege: access.privileges,
  }));

const databaseConfig: ConnectOptions = {
  user: process.env.DATABASE_USER,
  pass: process.env.DATABASE_PASSWORD,
};

if (!process.env.DATABASE_URI)
  throw new Error("Missing .env key : DATABASE_URI");
connect(process.env.DATABASE_URI || "", databaseConfig)
  .then(() => populateRedis())
  .catch(console.error);
