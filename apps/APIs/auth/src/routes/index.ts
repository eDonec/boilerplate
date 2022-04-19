import { Router } from "express";

import authNRoutes from "./authN";

const router = Router();

router.use(authNRoutes);

export default router;
