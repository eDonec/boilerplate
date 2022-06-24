import axios from "axios";
import MicroserviceStasusHistory from "models/MicroserviceStasusHistory";
import MicroserviceStatus from "models/MicroserviceStatus";
import { scheduleJob } from "node-schedule";
import { MICROSERVICE_LIST } from "shared-types";

scheduleJob("* * * * *", async () => {
  const promises = Object.values(MICROSERVICE_LIST).map(
    async (microservice) => {
      const baseUrl =
        process.env.NODE_ENV !== "production"
          ? `http://localhost:3000`
          : `http://${microservice}:3000`;

      return axios
        .get<{
          uptime: number;
          health: string;
          microServiceName: string;
          currentTime: Date;
        }>(`${baseUrl}/api/v1/${microservice}/health`)
        .catch(() => ({
          data: {
            uptime: 0,
            health: "DOWN",
            microServiceName: microservice,
            currentTime: new Date(),
          },
        }));
    }
  );

  const responses = await Promise.all(promises);

  responses.forEach(
    async ({ data: { uptime, health, microServiceName, currentTime } }) => {
      await MicroserviceStatus.findOneAndUpdate(
        { microserviceName: microServiceName },
        {
          $set: {
            health,
            lastHealthCheck: currentTime,
            microserviceName: microServiceName,
            uptime,
          },
        },
        { upsert: true }
      );
      await MicroserviceStasusHistory.create({
        health,
        microserviceName: microServiceName,
        sampleTime: currentTime,
      });
    }
  );
});
