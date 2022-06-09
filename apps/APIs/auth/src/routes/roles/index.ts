import * as rolesController from "controllers/roles";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import * as rolesMiddlewares from "middlewares/roles";
import { routeProtection } from "middlewares/routeProtection";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import * as authNValidators from "validators/sync/authN";
import * as rolesValidators from "validators/sync/roles";

const router = Router();

const BASE_ROUTE = "/roles";

router.get(
  `${BASE_ROUTE}`,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.ROLE, PRIVILEGE.READ),
  rolesValidators.getRoles,
  rolesController.getRoles
);

router.get(
  `${BASE_ROUTE}/:id`,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.ROLE, PRIVILEGE.READ),
  rolesValidators.getRoleById,
  rolesController.getRoleById
);

router.put(
  `${BASE_ROUTE}/:id`,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.ROLE, PRIVILEGE.WRITE),
  rolesMiddlewares.checkRoleValidity,
  rolesValidators.updateRole,
  rolesController.updateRole
);

router.post(
  `${BASE_ROUTE}`,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.ROLE, PRIVILEGE.WRITE),
  rolesMiddlewares.checkRoleValidity,
  rolesValidators.addRole,
  rolesController.addRole
);

export default router;
