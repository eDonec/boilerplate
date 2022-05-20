/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ObjectValidationError } from "custom-error";
import { unlinkSync } from "fs-extra";
import { Request } from "http-server";
import { resolvePath } from "init";
import multer from "multer";

export default multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, resolvePath(process.env.TMP_DIR_NAME!));
    },
    filename: (
      req: Request<
        unknown,
        unknown,
        unknown,
        unknown,
        { mimeTypes?: string[] }
      >,
      file,
      cb
    ) => {
      const mimeTypes = req.res?.locals.mimeTypes;

      if (mimeTypes && !mimeTypes.includes(file.mimetype)) {
        return cb(
          new ObjectValidationError({
            message: `File not accepted`,
            fields: [
              {
                fieldName: file.fieldname,
                message: `File type ${
                  file.mimetype
                } is not accepted. Should be one of : ${mimeTypes.join(", ")}`,
              },
            ],
          }),
          ""
        );
      }

      const generated = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileExtension = file.originalname.split(".").pop() || "";
      const filename = [generated, fileExtension].filter(Boolean).join(".");

      req.on("aborted", () => {
        unlinkSync(resolvePath(process.env.TMP_DIR_NAME!, filename));
      });

      cb(null, filename);
    },
  }),
});
