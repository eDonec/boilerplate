import { HydratedDocument, LeanDocument, Model, PipelineStage } from "mongoose";
import { ACCESS, IPaginatedResult, IPaginationQuery } from "shared-types";

export type RoleType = {
  isDefault: boolean;
  name: string;
  access: ACCESS[];
  _id: string;
};
export type RoleTypeSaticMethods = {
  findPaginated: <Item = LeanRoleDocument>(
    this: RoleModel,
    args: IPaginationQuery<RoleType>,
    prependedPipelines?: PipelineStage[]
  ) => Promise<IPaginatedResult<Item>>;
  UNSAFE_findOneAndUpdate: Model<RoleType>["findOneAndUpdate"];
};
export type RoleModel = Model<RoleType> & RoleTypeSaticMethods;
export type RoleDocument = HydratedDocument<RoleType>;
export type LeanRoleDocument = LeanDocument<RoleDocument>;
