import * as authZController from "controllers/authZ";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import { routeProtection } from "middlewares/routeProtection";
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

export default router;
