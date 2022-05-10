import * as authZController from "controllers/authZ";
import { Router } from "init";
import * as asyncAuthNValidators from "validators/async/authN";
import * as authNValidators from "validators/sync/authN";

const router = Router();

const BASE_ROUTE = "/z";

router.get(
  `${BASE_ROUTE}/refresh-token`,
  authNValidators.tokenValidator(true),
  asyncAuthNValidators.findAndValidateAuthClientByRefreshToken,
  authZController.refreshAccessToken
);

export default router;
