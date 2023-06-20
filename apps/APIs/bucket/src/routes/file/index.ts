import * as fileController from "controllers/file";
import { Router } from "init";
import { tokenValidator } from "middlewares/token";
import upload from "middlewares/upload";
import * as fileValidators from "validators/sync/file";

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
  tokenValidator,
  upload.array("file"),
  fileController.addBatchFiles
);

router.post(
  `${BASE_ROUTE}/create-by-url`,
  tokenValidator,
  fileValidators.addByUrl,
  fileController.addByUrl
);

export default router;
