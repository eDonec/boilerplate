import * as fileController from "controllers/upload";
import { Router } from "express";
import fs from "fs-extra";
import { resolvePath } from "init";
import multer from "multer";

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, resolvePath("public"));
    },
    filename: (req, file, cb) => {
      const suffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileExtension = file.originalname.split(".").pop() || "";
      const filename = [[file.fieldname, suffix].join("-"), fileExtension]
        .filter(Boolean)
        .join(".");

      req.on("aborted", () => {
        fs.unlink(resolvePath("public", filename));
      });

      cb(null, filename);
    },
  }),
});
const router = Router();
const BASE_ROUTE = "/upload";

router.post(`${BASE_ROUTE}/`, upload.single("file"), fileController.addFiles);

export default router;
