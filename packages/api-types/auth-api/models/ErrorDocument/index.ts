/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document } from "mongoose";

export interface IErrorDocument extends Document {
  error: {
    message: string;
    errorName: string;
    stack: string;
  };
  request: {
    path: string;
    headers: any;
    cookies: any;
    query: any;
    params: any;
    body: any;
    code: string;
    protocol: string;
    route: any;
    xhr: string;
    ip: string;
    language: string;
    method: string;
    hostname: string;
  };
}
