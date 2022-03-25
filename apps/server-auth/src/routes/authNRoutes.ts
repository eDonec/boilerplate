import * as authNController from "controllers/authNController";
import { Router } from "express";
import * as asyncAuthNValidators from "validators/async/authN";
import * as authNValidators from "validators/authN";

const router = Router();

const BASE_ROUTE = "/n";

router.post(
  `${BASE_ROUTE}/classic`,
  authNValidators.signUpClassicValidator,
  asyncAuthNValidators.signUpClassicValidator,
  authNController.signUpClassic
);

export default router;
