import { BucketFileType } from "bucket-types/models/BucketFile";
import { model, Schema } from "mongoose";

const schema = new Schema<BucketFileType>({
  isPersisted: {
    type: Boolean,
    default: false,
    required: true,
  },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  key: { type: String, required: true },
  originalFileName: { type: String, required: true },
  url: { type: String, required: true },
  invalidateAt: Number,
});

export default model("BucketFile", schema);
