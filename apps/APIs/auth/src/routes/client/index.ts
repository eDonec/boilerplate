import * as clientController from "controllers/client";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import * as rolesMiddlewares from "middlewares/roles";
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

router.getProtected(ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS, PRIVILEGE.READ)(
  `${BASE_ROUTE}/:id`,
  clientValidators.getClientById,
  getAuthByAccessToken,
  clientController.getClientById
);

router.putProtected(ACCESS_RESSOURCES.USER, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/clientAccess/:id`,
  getAuthByAccessToken,
  rolesMiddlewares.checkRoleValidity,
  clientValidators.updateClientAccess,
  clientController.updateClientAccess
);

export default router;
