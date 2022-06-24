import { HydratedDocument, LeanDocument, Model } from "mongoose";

export type MicroserviceStatusHistoryType = {
  microserviceName: string;
  health: "OK" | "DOWN" | "FAILED";
  sampleTime: Date;
};

export type MicroserviceStatusHistoryDocument =
  HydratedDocument<MicroserviceStatusHistoryType>;

export type LeanMicroserviceStatusHistoryDocument =
  LeanDocument<MicroserviceStatusHistoryDocument>;
export type MicroserviceStatusHistoryModel =
  Model<MicroserviceStatusHistoryType>;
