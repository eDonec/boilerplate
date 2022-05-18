import { FileRouteTypes } from "bucket-types/routes/file";
import { Request, Response } from "express";
import * as fileService from "services/file";
import { IMiddleware, StatusCodes } from "shared-types";

export const getBucketFile: IMiddleware<
  Request<
    FileRouteTypes["/file/:key"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >
> = async (req, res) => {
  await fileService.getBucketFile(req.params.key, res);
};

export const addFile: IMiddleware<
  Request,
  Response<FileRouteTypes["/file/"]["POST"]["response"]>
> = async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const response = await fileService.addFile(req.file!, req);

  res.status(StatusCodes.Created).send(response);
};

export const addBatchFiles: IMiddleware<
  Request,
  Response<FileRouteTypes["/file/batch/"]["POST"]["response"]>
> = async (req, res) => {
  const response = await fileService.addBatchFiles(
    req.files as Express.Multer.File[],
    req
  );

  res.status(StatusCodes.Created).send(response);
};
