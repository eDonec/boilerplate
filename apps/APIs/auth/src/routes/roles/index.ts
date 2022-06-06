import * as rolesController from "controllers/roles";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
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

export default router;
