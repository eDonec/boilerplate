import { unlinkSync } from "fs-extra";
import { resolvePath } from "init";
import multer from "multer";

export default multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, resolvePath("public"));
    },
    filename: (req, file, cb) => {
      const generated = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileExtension = file.originalname.split(".").pop() || "";
      const filename = [generated, fileExtension].filter(Boolean).join(".");

      req.on("aborted", () => {
        unlinkSync(resolvePath("public", filename));
      });

      cb(null, filename);
    },
  }),
});
