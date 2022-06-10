import { Client, Entity, Schema } from "redis-om";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

export interface RAuthAccess {
  authId: string;
  ressource: ACCESS_RESSOURCES;
  privilege: PRIVILEGE;
}

export class RAuthAccess extends Entity {}
const rAuthAccessSchema = new Schema(RAuthAccess, {
  authId: { type: "string" },
  ressource: { type: "string" },
  privilege: { type: "number" },
});

const client = new Client();

const openClientPromise = client.open();

export { openClientPromise };

const authRepository = client.fetchRepository(rAuthAccessSchema);

export default authRepository;
