import * as clientController from "controllers/client";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import * as rolesMiddlewares from "middlewares/roles";
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

router.get(
  `${BASE_ROUTE}/:id`,
  clientValidators.getClientById,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS, PRIVILEGE.READ),
  clientController.getClientById
);

router.put(
  `${BASE_ROUTE}/clientAccess/:id`,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.USER, PRIVILEGE.WRITE),
  rolesMiddlewares.checkRoleValidity,
  clientValidators.updateClientAccess,
  clientController.updateClientAccess
);

export default router;
