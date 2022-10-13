export type HealthRouteTypes = {
  "/health/": {
    GET: {
      response: {
        uptime: number;
        health: string;
        microServiceName: string;
        currentTime: Date;
      };
    };
  };
};
