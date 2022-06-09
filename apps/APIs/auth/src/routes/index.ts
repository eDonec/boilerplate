import { Router } from "init";

import authN from "./authN";
import authZ from "./authZ";
import client from "./client";
import roles from "./roles";

const router = Router();

router.use(authN);
router.use(authZ);
router.use(client);
router.use(roles);
export default router;
