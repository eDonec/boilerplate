import { Router } from "init";

import authN from "./authN";
import authZ from "./authZ";
import roles from "./roles";
import user from "./user";

const router = Router();

router.use(authN);
router.use(authZ);
router.use(roles);
router.use(user);
export default router;
