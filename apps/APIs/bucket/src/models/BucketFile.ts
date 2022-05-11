import { BucketFileType } from "bucket-types/models/Files";
import { model, Schema } from "mongoose";

const schema = new Schema<BucketFileType>({
  isPersisted: {
    type: Boolean,
    default: false,
    required: true,
  },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  path: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  invalidateAt: Number,
});

export default model("BucketFile", schema);
