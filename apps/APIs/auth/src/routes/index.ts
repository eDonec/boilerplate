import { Router } from "init";

import authN from "./authN";
import authZ from "./authZ";
import client from "./client";

const router = Router();

router.use(authN);
router.use(authZ);
router.use(client);
export default router;
