import CategoriesSDK from "categories-sdk";
import ApiSDK from "server-sdk";

export const getCategoryIdBySlug = async (
  slug: string
): Promise<{ id: string }> => {
  const categoriesMainApi = new ApiSDK();
  const categoriesSDK = new CategoriesSDK(categoriesMainApi);

  return categoriesSDK.getIdBySlug({
    params: {
      slug,
    },
  });
};
