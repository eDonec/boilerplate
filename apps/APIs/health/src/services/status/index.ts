import { NotFoundError } from "custom-error";
import { StatusRouteTypes } from "health-types/routes/status";
import MicroserviceStasusHistory from "models/MicroserviceStasusHistory";
import MicroserviceStatus from "models/MicroserviceStatus";
import { nanoid } from "nanoid";

export const getMicroservicesStatus = async (): Promise<
  StatusRouteTypes["/status/"]["GET"]["response"]
> => MicroserviceStatus.find();

export const getMicroserviceStatusHistoryByName = async (
  microserviceName: string,
  { limit, page }: { limit: string; page: string }
): Promise<StatusRouteTypes["/status/:name"]["GET"]["response"]> => {
  const microserviceStatus = await MicroserviceStatus.findOne({
    microserviceName,
  });

  if (!microserviceStatus)
    throw new NotFoundError({
      message: "Microservice not found!",
      ressource: "microservice",
    });
  const microserviceHistory = await MicroserviceStasusHistory.find({
    microserviceName,
  })
    .sort({ sampleTime: -1 })
    .limit(+limit)
    .skip(+page);

  return {
    microserviceName,
    status: microserviceStatus?.health || "DOWN",
    history: microserviceHistory.map(({ health, sampleTime }) => ({
      id: nanoid(),
      status: health,
      sampleTime,
    })),
  };
};
