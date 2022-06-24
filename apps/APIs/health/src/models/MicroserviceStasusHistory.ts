import {
  MicroserviceStatusHistoryModel,
  MicroserviceStatusHistoryType,
} from "health-types/models/MicroserviceStatusHistory";
import { model, Schema } from "mongoose";
import { MICROSERVICE_LIST } from "shared-types";

const schema = new Schema<
  MicroserviceStatusHistoryType,
  MicroserviceStatusHistoryModel
>(
  {
    microserviceName: { type: String, enum: MICROSERVICE_LIST, required: true },
    health: {
      type: String,
      enum: ["OK", "DOWN", "FAILED"],
      required: true,
    },
    sampleTime: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model<
  MicroserviceStatusHistoryType,
  MicroserviceStatusHistoryModel
>("MicroserviceStatusHistory", schema);
