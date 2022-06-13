import * as rolesController from "controllers/roles";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import * as rolesMiddlewares from "middlewares/roles";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import * as rolesValidators from "validators/sync/roles";

const router = Router();

const BASE_ROUTE = "/roles";

router.getProtected(ACCESS_RESSOURCES.ROLE, PRIVILEGE.READ)(
  `${BASE_ROUTE}`,
  rolesValidators.getRoles,
  rolesController.getRoles
);

router.getProtected(ACCESS_RESSOURCES.ROLE, PRIVILEGE.READ)(
  `${BASE_ROUTE}/:id`,
  rolesValidators.getRoleById,
  rolesController.getRoleById
);

router.putProtected(ACCESS_RESSOURCES.ROLE, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/:id`,
  getAuthByAccessToken,
  rolesMiddlewares.checkRoleValidity,
  rolesValidators.updateRole,
  rolesController.updateRole
);

router.postProtected(ACCESS_RESSOURCES.ROLE, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}`,
  getAuthByAccessToken,
  rolesMiddlewares.checkRoleValidity,
  rolesValidators.addRole,
  rolesController.addRole
);

router.delete(
  `${BASE_ROUTE}/:id`,
  rolesValidators.deleteRole,
  rolesController.deleteRole
);

export default router;
