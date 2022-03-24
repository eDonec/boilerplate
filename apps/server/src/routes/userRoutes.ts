import * as userController from "controllers/userController";
import { Router } from "express";

const router = Router();

const BASE_ROUTE = "/users";

router.get(BASE_ROUTE, userController.getUsers);

export default router;
