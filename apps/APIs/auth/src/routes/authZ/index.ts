import * as authZController from "controllers/authZ";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import { routeProtectionFallback } from "middlewares/routeProtectionFallback";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import * as asyncAuthNValidators from "validators/async/authN";
import * as authNValidators from "validators/sync/authN";
import * as authZValidators from "validators/sync/authZ";

const router = Router();

const BASE_ROUTE = "/z";

router.get(
  `${BASE_ROUTE}/refresh-token`,
  authNValidators.tokenValidator(true),
  asyncAuthNValidators.findAndValidateAuthClientByRefreshToken,
  authZController.refreshAccessToken
);
router.get(`${BASE_ROUTE}/upload-token`, authZController.getUploadToken);

router.getProtected(ACCESS_RESSOURCES.ROLE, PRIVILEGE.READ)(
  `${BASE_ROUTE}/roles`,
  authZValidators.getRoles,
  authZController.getRoles
);
router.post(
  `${BASE_ROUTE}/ressource-access`,
  authZValidators.checkRessourceAccess,
  authNValidators.tokenValidator(false),
  getAuthByAccessToken,
  routeProtectionFallback,
  authZController.checkRessourceAccess
);

router.postProtected(ACCESS_RESSOURCES.BAN_CLIENTS, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/ban-client/:id`,
  authZValidators.banClient,
  authZController.banClient
);

router.postProtected(ACCESS_RESSOURCES.SUSPEND_CLIENTS, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/suspend-client/:id`,
  getAuthByAccessToken,
  authZValidators.suspendClient,
  authZController.suspendClient
);

router.getProtected(ACCESS_RESSOURCES.LIFT_BAN_AND_SUSPENSION, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/lift-ban-suspension/:id`,
  authZValidators.liftBanAndSuspension,
  authZController.liftBanAndSuspension
);

export default router;
