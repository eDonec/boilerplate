import { Entity, Schema } from "redis-om";
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

export default rAuthAccessSchema;
