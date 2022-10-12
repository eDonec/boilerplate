import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    uptime: process.uptime(),
    health: "OK",
    microServiceName: process.env.MICROSERVICE_NAME,
    currentTime: new Date().toISOString(),
  });
}
