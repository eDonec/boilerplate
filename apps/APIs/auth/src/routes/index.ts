import { Router } from "express";

import authNRoutes from "./authNRoutes";

const router = Router();

router.use(authNRoutes);

export default router;
