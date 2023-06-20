import {
  CategoryModel,
  CategoryType,
  CategoryTypeSaticMethods,
} from "categories-types/models/Category";
import { model, Schema } from "mongoose";
import { IPaginatedResult } from "shared-types";

import { getPaginationAggregation } from "helpers/getPaginationAggregation";

const schema = new Schema<CategoryType, CategoryModel>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: {
      key: { type: String, required: true },
      type: { type: String, required: true },
      name: { type: String, required: true },
      _id: { type: String, required: true },
      url: { type: String, required: true },
    },
    artisticTitle: { type: String, required: false },
  },
  { timestamps: true }
);

const findPaginatedCategory: CategoryTypeSaticMethods["findPaginated"] =
  async function findPaginatedCategorys(this, args, prependedPipelines = []) {
    const [paginatedResults] = await this.aggregate<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      IPaginatedResult<any>
    >([...prependedPipelines, ...getPaginationAggregation(args)]);

    return paginatedResults;
  };

schema.static("findPaginated", findPaginatedCategory);

export default model<CategoryType, CategoryModel>("Category", schema);
