import * as clientController from "controllers/client";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import { routeProtection } from "middlewares/routeProtection";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import * as authNValidators from "validators/sync/authN";
import * as clientValidators from "validators/sync/client";

const router = Router();
const BASE_ROUTE = "/clients";

router.get(
  `${BASE_ROUTE}/`,
  clientValidators.getAuthenticatedClients,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS, PRIVILEGE.READ),
  clientController.getAuthenticatedClients
);

export default router;
