import * as clientController from "controllers/client";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import * as clientValidators from "validators/sync/client";

const router = Router();
const BASE_ROUTE = "/clients";

router.getProtected(ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS, PRIVILEGE.READ)(
  `${BASE_ROUTE}/`,
  clientValidators.getAuthenticatedClients,
  getAuthByAccessToken,
  clientController.getAuthenticatedClients
);

export default router;
