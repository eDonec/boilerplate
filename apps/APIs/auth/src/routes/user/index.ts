import * as userController from "controllers/user";
import { Router } from "init";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import * as asyncUserValidators from "validators/async/users";
import * as syncUserValidators from "validators/sync/user";

const router = Router();
const BASE_ROUTE = "/user";

router.getProtected(ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS, PRIVILEGE.READ)(
  `${BASE_ROUTE}/is-phonenumber-available`,
  syncUserValidators.isPhoneNumberAvailable,
  userController.isPhoneNumberAvailable
);

router.getProtected(ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS, PRIVILEGE.READ)(
  `${BASE_ROUTE}/unpaginated-minimal-users`,
  userController.getUnpaginatedMinimalUsers
);

router.putProtected(
  ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
  PRIVILEGE.WRITE_SELF
)(
  `${BASE_ROUTE}/me`,
  asyncUserValidators.updateSelfVaidator,
  syncUserValidators.updateSelf,
  userController.updateSelf
);

router.putProtected(ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/:authID`,
  syncUserValidators.updateUser,
  userController.updateUser
);

router.getProtected(ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS, PRIVILEGE.READ)(
  `${BASE_ROUTE}/:authID`,
  syncUserValidators.getUser,
  userController.getUser
);

router.getProtected(ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS, PRIVILEGE.READ)(
  `${BASE_ROUTE}/`,
  syncUserValidators.getUsers,
  userController.getUsers
);

export default router;
