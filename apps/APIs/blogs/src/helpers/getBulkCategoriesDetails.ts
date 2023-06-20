import CategoriesSDK from "categories-sdk";
import { LeanCategoryDocument } from "categories-types/models/Category";
import ApiSDK from "server-sdk";

export const getBulkCategoriesDetails = (
  ids: string[]
): Promise<LeanCategoryDocument[]> => {
  const categoriesMainApi = new ApiSDK();
  const categoriesSDK = new CategoriesSDK(categoriesMainApi);

  return categoriesSDK.getBulk({
    body: {
      ids,
    },
  });
};
