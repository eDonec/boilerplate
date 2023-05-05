import { HydratedDocument, LeanDocument, Model, PipelineStage } from "mongoose";
import { IPaginatedResult, IPaginationQuery } from "shared-types";

import { LeanAuthDocument } from "../Auth";

export type UserType<Populated = false> = {
  auth: Populated extends false ? string : null | LeanAuthDocument;
  _id: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatar?: {
    key: string;
    type: string;
    name: string;
    _id: string;
    url: string;
  };
};

export type UserDocument<Populated = false> = HydratedDocument<
  UserType<Populated>
>;
export type LeanUserDocument<Populated = false> = LeanDocument<
  UserDocument<Populated>
>;
export type UserTypeSaticMethods = {
  findPaginated: <Item = LeanUserDocument>(
    this: UserModel,
    args: IPaginationQuery<UserType>,
    prependedPipelines?: PipelineStage[]
  ) => Promise<IPaginatedResult<Item>>;
};
export type UserModel<Populated = false> = Model<UserType<Populated>> &
  UserTypeSaticMethods;
