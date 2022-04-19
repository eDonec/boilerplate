import { IErrorDocument } from "auth-types/models/ErrorDocument";
import { model, Schema } from "mongoose";

const errorDocument = new Schema<IErrorDocument>(
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
