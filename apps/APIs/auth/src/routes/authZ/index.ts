import * as authZController from "controllers/authZ";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import { routeProtection } from "middlewares/routeProtection";
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

router.post(
  `${BASE_ROUTE}/ressource-access`,
  authZValidators.checkRessourceAccess,
  authNValidators.tokenValidator(false),
  getAuthByAccessToken,
  (req, res, next) => {
    const { privileges, ressource } = req.body;

    routeProtection(ressource, privileges)(req, res, next);
  },
  authZController.checkRessourceAccess
);

router.get(
  `${BASE_ROUTE}/roles`,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.ROLE, PRIVILEGE.READ),
  authZValidators.getRoles,
  authZController.getRoles
);

router.post(
  `${BASE_ROUTE}/ban-client/:id`,
  authNValidators.tokenValidator(),
  // getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.BAN_CLIENTS, PRIVILEGE.WRITE),
  authZValidators.banClient,
  authZController.banClient
);

router.post(
  `${BASE_ROUTE}/suspend-client/:id`,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.SUSPEND_CLIENTS, PRIVILEGE.WRITE),
  authZValidators.suspendClient,
  authZController.suspendClient
);

router.get(
  `${BASE_ROUTE}/lift-ban-suspension/:id`,
  authNValidators.tokenValidator(),
  getAuthByAccessToken,
  routeProtection(ACCESS_RESSOURCES.LIFT_BAN_AND_SUSPENSION, PRIVILEGE.WRITE),
  authZValidators.liftBanAndSuspension,
  authZController.liftBanAndSuspension
);

export default router;
