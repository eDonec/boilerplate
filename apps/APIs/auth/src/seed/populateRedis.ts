/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
import { AuthDocument } from "auth-types/models/Auth";
import Auth from "models/Auth";
import authRepository, { RAuthAccess } from "models/Redis/Auth";

import { constructRoleArray } from "helpers/constructRoleArray";

export const populateRedis = async () => {
  console.log("Populating redis...");
  await authRepository.createIndex();
  console.time("Redis Time:");
  const redisAuthClients = await authRepository.search().return.all();

  // redisAuthClients.forEach((o) => authRepository.remove(o.entityId));
  const authClients = await Auth.find().populate("role");

  await removeDuplicatesAndRemovedEntries(redisAuthClients, authClients);
  const redisAuthUnsavedEntries = authClients.map((o) => formatAuth(o)).flat(1);

  const promises = redisAuthUnsavedEntries.map((redisAuthUnsavedEntry) => {
    const auth =
      redisAuthClients.find(
        (r) =>
          r.ressource === redisAuthUnsavedEntry.ressource &&
          r.authId === redisAuthUnsavedEntry.authId
      ) || authRepository.createEntity();

    auth.authId = redisAuthUnsavedEntry.authId;
    auth.ressource = redisAuthUnsavedEntry.ressource;
    auth.privilege = redisAuthUnsavedEntry.privilege;

    return authRepository.save(auth);
  });

  await Promise.all(promises);
  console.timeEnd("Redis Time:");
};

const formatAuth = (auth: AuthDocument) =>
  constructRoleArray(auth.role, auth.customAccessList).map((access) => ({
    authId: auth._id.toString(),
    ressource: access.ressource,
    privilege: access.privileges,
  }));

const removeDuplicatesAndRemovedEntries = async (
  redisAuthClients: RAuthAccess[],
  authClients: AuthDocument[]
) => {
  for (let index = 0; index < redisAuthClients.length; index++) {
    const redisAuth = redisAuthClients[index];

    if (
      !authClients.find(
        (auth) =>
          auth._id.toString() === redisAuth.authId &&
          constructRoleArray(auth.role, auth.customAccessList).find(
            (access) => access.ressource === redisAuth.ressource
          )
      )
    )
      await authRepository.remove(redisAuth.entityId);
    else if (
      redisAuthClients.find(
        (rAuth, i) =>
          rAuth.authId === redisAuth.authId &&
          rAuth.ressource === redisAuth.ressource &&
          i > index
      )
    )
      await authRepository.remove(redisAuth.entityId);
  }
};
