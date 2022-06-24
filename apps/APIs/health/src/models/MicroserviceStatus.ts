import {
  MicroserviceStatusModel,
  MicroserviceStatusType,
} from "health-types/models/MicroserviceStatus";
import { model, Schema } from "mongoose";
import { MICROSERVICE_LIST } from "shared-types";

const schema = new Schema<MicroserviceStatusType, MicroserviceStatusModel>(
  {
    microserviceName: {
      type: String,
      enum: MICROSERVICE_LIST,
      required: true,
      unique: true,
    },
    uptime: { type: Number, required: true },
    health: {
      type: String,
      enum: ["OK", "DEGRADED", "FAILED"],
      required: true,
    },
    lastHealthCheck: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model<MicroserviceStatusType, MicroserviceStatusModel>(
  "MicroserviceStatus",
  schema
);
