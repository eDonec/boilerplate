import { Router } from "express";

import upload from "./upload";

const router = Router();

router.use(upload);

export default router;
