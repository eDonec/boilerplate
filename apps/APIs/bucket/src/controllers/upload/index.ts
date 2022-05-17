import { UploadRouteTypes } from "bucket-types/routes/upload";
import { Request, Response } from "express";
import * as uploadService from "services/upload";
import { IMiddleware, StatusCodes } from "shared-types";

export const addFiles: IMiddleware<
  Request,
  Response<UploadRouteTypes["/upload/"]["POST"]["response"]>
> = async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const response = await uploadService.addFiles(req.file!, req);

  res.status(StatusCodes.Created).send(response);
};
