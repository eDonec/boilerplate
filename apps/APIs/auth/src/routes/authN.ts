import * as authNController from "controllers/authN";
import { Router } from "express";
import { AUTH_PROVIDERS } from "shared-types";
import * as asyncAuthNValidators from "validators/async/authN";
import * as asyncAuthZValidators from "validators/async/authZ";
import * as authNValidators from "validators/authN";

const router = Router();

const BASE_ROUTE = "/n";

router.post(
  `${BASE_ROUTE}/classic`,
  authNValidators.signUpClassicValidator,
  asyncAuthNValidators.signUpClassicValidator,
  authNController.signUpClassic
);
router.post(
  `${BASE_ROUTE}/facebook`,
  authNValidators.signInFacebookValidator,
  authNController.facebookSignIn
);
router.post(
  `${BASE_ROUTE}/apple`,
  authNValidators.signInAppleValidator,
  authNController.appleSignIn
);
router.post(
  `${BASE_ROUTE}/sign-in/classic`,
  authNValidators.signInClassicValidator,
  asyncAuthNValidators.signInClassicValidator,
  asyncAuthNValidators.checkBanned,
  asyncAuthNValidators.checkAuthProvider(AUTH_PROVIDERS.CLASSIC),
  asyncAuthNValidators.checkSuspension,
  asyncAuthNValidators.checkPassword,
  asyncAuthZValidators.checkAuthRole,
  authNController.signInClassic
);

router.get(
  `${BASE_ROUTE}/logout`,
  authNValidators.tokenValidator(true),
  asyncAuthNValidators.findAndValidateAuthClientByRefreshToken,
  authNController.logoutAuthClientFromSession
);

export default router;
