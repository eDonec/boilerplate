import {
  BlogModel,
  BlogType,
  BlogTypeSaticMethods,
} from "blogs-types/models/Blog";
import { model, Schema } from "mongoose";
import { IPaginatedResult, TextDirection } from "shared-types";

import { getPaginationAggregation } from "helpers/getPaginationAggregation";

const schema = new Schema<BlogType, BlogModel>(
  {
    banner: {
      key: { type: String, required: true },
      type: { type: String, required: true },
      name: { type: String, required: true },
      _id: { type: String, required: true },
      url: { type: String, required: true },
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    metaDescription: { type: String, required: true },
    content: { type: String, required: true },
    secondaryCategories: [{ type: String, required: true }],
    mainCategory: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    textDirection: {
      type: String,
      required: true,
      enum: TextDirection,
      default: TextDirection.LTR,
    },
    upvotes: {
      type: [{ type: String, required: true }],
    },
    downvotes: [{ type: String, required: true }],
    claps: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const findPaginatedBlog: BlogTypeSaticMethods["findPaginated"] =
  async function findPaginatedRoles(this, args, prependedPipelines = []) {
    const [paginatedResults] = await this.aggregate<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IPaginatedResult<any>
    >([...prependedPipelines, ...getPaginationAggregation(args)]);

    return paginatedResults;
  };

schema.static("findPaginated", findPaginatedBlog);

export default model<BlogType, BlogModel>("Blog", schema);
