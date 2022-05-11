import { Router } from "express";

import authN from "./authN";
import authZ from "./authZ";

const router = Router();

router.use(authN);
router.use(authZ);

export default router;
