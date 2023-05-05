import * as authNController from "controllers/authN";
import { Router } from "init";
import { getAuthByAccessToken } from "middlewares/currentAuth";
import { ACCESS_RESSOURCES, AUTH_PROVIDERS, PRIVILEGE } from "shared-types";
import * as asyncAuthNValidators from "validators/async/authN";
import * as asyncAuthZValidators from "validators/async/authZ";
import * as authNValidators from "validators/sync/authN";

const router = Router();
const BASE_ROUTE = "/n";

router.post(
  `${BASE_ROUTE}/classic`,
  authNValidators.signUpClassicValidator,
  asyncAuthNValidators.signUpClassicValidator,
  authNController.signUpClassic
);
router.post(
  `${BASE_ROUTE}/google`,
  authNValidators.googleSignIn,
  authNController.googleSignIn
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

router.get(
  `${BASE_ROUTE}/me`,
  authNValidators.tokenValidator(false),
  getAuthByAccessToken,
  authNController.getAuthByAccessToken
);

router.put(
  `${BASE_ROUTE}/reset-password`,
  authNValidators.resetPassword,
  authNController.resetPassword
);

router.putProtected(
  ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS,
  PRIVILEGE.WRITE_SELF
)(
  `${BASE_ROUTE}/update-password`,
  authNValidators.updatePassword,
  asyncAuthNValidators.findAndValidateAuthClientByAccessToken,
  asyncAuthNValidators.checkPassword,
  authNController.updatePassword
);

router.put(
  `${BASE_ROUTE}/reset-password-confirm`,
  authNValidators.resetPasswordConfirm,
  authNController.resetPasswordConfirm
);

export default router;
