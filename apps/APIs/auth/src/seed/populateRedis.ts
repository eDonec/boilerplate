/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { AuthDocument } from "auth-types/models/Auth";
import rAuthAccessSchema from "http-server/RedisModels/Auth";
import Auth from "models/Auth";
import { Client } from "redis-om";
import "dotenv/config";

import { constructRoleArray } from "helpers/constructRoleArray";

export const populateRedis = async (withLogs = true) => {
  const client = await new Client().open();

  await client.execute(["FLUSHALL"]);
  const authRepository = client.fetchRepository(rAuthAccessSchema);

  await authRepository.createIndex();
  if (withLogs) {
    console.log("Populating redis...");
    console.time("Redis Time:");
  }
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
  if (withLogs) console.timeEnd("Redis Time:");

  await client.close();
};

const formatAuth = (auth: AuthDocument) =>
  constructRoleArray(auth.role, auth.customAccessList).map((access) => ({
    authId: auth._id.toString(),
    ressource: access.ressource,
    privilege: access.privileges,
  }));
