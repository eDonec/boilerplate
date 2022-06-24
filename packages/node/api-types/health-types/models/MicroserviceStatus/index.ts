import { HydratedDocument, LeanDocument, Model } from "mongoose";

export type MicroserviceStatusType = {
  microserviceName: string;
  uptime: number;
  health: "OK" | "DEGRADED" | "FAILED";
  lastHealthCheck: Date;
};

export type MicroServiceStatusDocument =
  HydratedDocument<MicroserviceStatusType>;

export type LeanMicroServiceStatusDocument =
  LeanDocument<MicroServiceStatusDocument>;

export type MicroserviceStatusModel = Model<MicroserviceStatusType>;
