import { HydratedDocument, LeanDocument, Model, PipelineStage } from "mongoose";
import {
  ACCESS,
  ACCESS_TYPE,
  AUTH_PROVIDERS,
  IPaginatedResult,
  IPaginationQuery,
} from "shared-types";

import { RoleType } from "../Role";

export type AuthType = {
  authType: ACCESS_TYPE;
  email?: string;
  userName?: string;
  password?: string;
  authProvider: AUTH_PROVIDERS[];
  providerId?: {
    provider: AUTH_PROVIDERS;
    id: string;
  }[];
  sessions: string[];
  role: RoleType;
  customAccessList?: ACCESS[];
  isActive: boolean;
  expirationDate?: Date;
  isBanned: boolean;
  isSuspended: boolean;
  suspensionLiftTime: Date;
  suspensionReason: string;
  numberOfUnsuccessfulTrials: number;
  lastTrialSince: Date;
  _id: string;
  isActivated: boolean;
};

export type AuthTypeSaticMethods = {
  findPaginated: <Item = LeanAuthDocument>(
    this: AuthModel,
    args: IPaginationQuery<AuthType>,
    prependedPipelines?: PipelineStage[]
  ) => Promise<IPaginatedResult<Item>>;
};
export type AuthModel = Model<AuthType> & AuthTypeSaticMethods;
export type AuthDocument = HydratedDocument<AuthType>;
export type LeanAuthDocument = LeanDocument<AuthDocument>;
