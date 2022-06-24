import * as statusController from "controllers/status";
import { Router } from "init";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import * as statusValidators from "validators/sync/status";

const router = Router();
const BASE_ROUTE = "/status";

router.getProtected(ACCESS_RESSOURCES.MICROSERVICE_STATUS, PRIVILEGE.READ)(
  `${BASE_ROUTE}/`,
  statusValidators.getMicroservicesStatus,
  statusController.getMicroservicesStatus
);

router.getProtected(ACCESS_RESSOURCES.MICROSERVICE_STATUS, PRIVILEGE.READ)(
  `${BASE_ROUTE}/:name`,
  statusValidators.getMicroserviceStatusHistoryByName,
  statusController.getMicroserviceStatusHistoryByName
);

export default router;
