import * as fileController from "controllers/upload";
import { Router } from "express";
import { resolvePath } from "init";
import multer from "multer";

const upload = multer({ dest: resolvePath("public") });
const router = Router();

const BASE_ROUTE = "/upload";

router.post(`${BASE_ROUTE}/`, upload.single("file"), fileController.addFiles);

export default router;
