import * as fileController from "controllers/file";
import { Router } from "init";
import { tokenValidator } from "middlewares/token";
import upload from "middlewares/upload";

const router = Router();
const BASE_ROUTE = "/file";

// Get
router.get(`${BASE_ROUTE}/:key`, fileController.getBucketFile);

// Post
router.post(
  `${BASE_ROUTE}/`,
  tokenValidator,
  upload.single("file"),
  fileController.addFile
);
router.post(
  `${BASE_ROUTE}/batch/`,
  upload.array("file"),
  fileController.addBatchFiles
);

export default router;
