/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, model, Schema } from "mongoose";

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

const errorDocument = new Schema(
  {
    error: {
      message: { type: String, required: false },
      stack: { type: String, required: false },
      errorName: { type: String, required: false },
    },
    request: {
      path: { type: String, required: false },
      headers: { type: Object, required: false },
      cookies: { type: Object, required: false },
      query: { type: Object, required: false },
      params: { type: Object, required: false },
      body: { type: Object, required: false },
      protocol: { type: String, required: false },
      route: { type: Object, required: false },
      xhr: { type: String, required: false },
      ip: { type: String, required: false },
      language: { type: String, required: false },
      method: { type: String, required: false },
      hostname: { type: String, required: false },
    },
  },
  { timestamps: true }
);

export default model<IErrorDocument>("error", errorDocument);
