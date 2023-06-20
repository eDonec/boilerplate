import { AbortController } from "@aws-sdk/abort-controller";
import { FileRouteTypes } from "bucket-types/routes/file";
import { ObjectValidationError } from "custom-error";
import fs from "fs-extra";
import { Request, Response } from "http-server";
import * as fileService from "services/file";
import { IMiddleware, StatusCodes } from "shared-types";

export const addFile: IMiddleware<
  Request,
  Response<FileRouteTypes["/file/"]["POST"]["response"]>
> = async (req, res) => {
  if (!req.file)
    throw new ObjectValidationError({
      fields: [{ fieldName: "file", message: "File is required" }],
      message: "File is required",
    });

  const abortController = new AbortController();
  const bucketFile = await fileService.addFile(req.file, abortController);
  const response = fileService.formatBucketFileResponse(bucketFile);

  res.status(StatusCodes.Created).send(response);

  req.on("aborted", async () => {
    abortController.abort();
    fileService.deleteFile(bucketFile);
    if (req.file && fs.pathExistsSync(req.file.path))
      await fs.unlink(req.file.path);
  });
};

export const addBatchFiles: IMiddleware<
  Request,
  Response<FileRouteTypes["/file/batch/"]["POST"]["response"]>
> = async (req, res) => {
  if (!(req.files instanceof Array))
    throw new ObjectValidationError({
      fields: [{ fieldName: "file", message: "File is required" }],
      message: "File is required",
    });
  const abortController = new AbortController();
  const bucketFiles = await fileService.addBatchFiles(
    req.files,
    abortController
  );
  const response = bucketFiles.map(fileService.formatBucketFileResponse);

  res.status(StatusCodes.Created).send(response);

  req.on("aborted", async () => {
    abortController.abort();
    bucketFiles.map(fileService.deleteFile);
    if (req.files instanceof Array)
      req.files.forEach((file) => fs.unlink(file.path));
  });
};

export const getBucketFile: IMiddleware<
  Request<
    FileRouteTypes["/file/:key"]["GET"]["params"],
    unknown,
    unknown,
    unknown
  >
> = async (req, res) => {
  const abortController = new AbortController();

  req.on("aborted", () => {
    abortController.abort();
  });

  const stream = await fileService.getBucketFile(
    req.params.key,
    abortController
  );

  stream.pipe(res);
};

export const addByUrl: IMiddleware<
  Request<
    unknown,
    unknown,
    FileRouteTypes["/file/create-by-url"]["POST"]["body"],
    unknown
  >,
  Response<
    FileRouteTypes["/file/create-by-url"]["POST"]["response"],
    {
      mimeTypes?: string[];
    }
  >
> = async (req, res) => {
  const bucketFile = await fileService.addByUrl(
    req.body.url,
    res.locals.mimeTypes
  );

  const response = fileService.formatBucketFileResponse(bucketFile);

  res.status(StatusCodes.Created).send(response);
};
