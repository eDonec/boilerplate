import { Router } from "express";

import authN from "./authN";

const router = Router();

router.use(authN);

export default router;
