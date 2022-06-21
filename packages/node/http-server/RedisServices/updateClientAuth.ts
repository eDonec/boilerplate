import { ACCESS } from "shared-types";

import { client } from "../redisClient";
import rAuthAccessSchema from "../RedisModels/Auth";

export const updateRedisClientAccess = async (
  authId: string,
  acecssList: ACCESS[]
) => {
  const authRepository = client.fetchRepository(rAuthAccessSchema);

  const currentClientAccess = await authRepository
    .search()
    .where("authId")
    .equal(authId)
    .return.all();

  const removePromises = currentClientAccess.map((auth) =>
    authRepository.remove(auth.entityId)
  );

  await Promise.all(removePromises);
  const createPromises = acecssList.map(({ privileges, ressource }) =>
    authRepository.createAndSave({
      authId,
      ressource,
      privilege: privileges,
    })
  );

  await Promise.all(createPromises);
};
