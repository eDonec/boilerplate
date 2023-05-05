import { CategoryRouteTypes } from "categories-types/routes/category";
import { NotFoundError } from "custom-error";
import producer from "events/producer";
import { asyncCreateSlugFromString } from "http-server";
import Category from "models/Category";
import { ACCESS_RESSOURCES } from "shared-types";

export const addCategory = async (
  categoryData: CategoryRouteTypes["/category/"]["POST"]["body"]
) => {
  const slug = await asyncCreateSlugFromString(categoryData.title, Category);

  const {
    image: { key },
  } = await Category.create({ ...categoryData, slug });

  producer.emit.CategoriesCreated({ filesToPersist: [key] });
};

export const updateCategory = async (
  categoryId: string,
  categoryData: CategoryRouteTypes["/category/:id"]["PUT"]["body"]
) => {
  const slug = categoryData.title
    ? await asyncCreateSlugFromString(categoryData.title, Category)
    : null;
  const updateData = {
    ...categoryData,
    ...(categoryData.title && { slug }),
  };
  const category = await Category.findByIdAndUpdate(categoryId, updateData);

  if (!category)
    throw new NotFoundError({
      message: "Category not found",
      ressource: ACCESS_RESSOURCES.CATEGORY,
    });

  if (categoryData.image && categoryData.image.key !== category.image.key) {
    producer.emit.CategoriesUpdated({
      filesToPersist: [categoryData.image.key],
      filesToDelete: [category.image.key],
    });
  }
};

export const deleteCategory = async (categoryId: string) => {
  const deletedcategory = await Category.findByIdAndDelete(categoryId);

  if (!deletedcategory)
    throw new NotFoundError({
      message: "Category not found",
      ressource: ACCESS_RESSOURCES.CATEGORY,
    });

  producer.emit.CategoriesDeleted({
    filesToDelete: [deletedcategory.image.key],
  });
};

export const getCategory = async (
  categoryId: string
): Promise<CategoryRouteTypes["/category/:id"]["GET"]["response"]> => {
  const category = await Category.findById(categoryId).lean();

  if (!category)
    throw new NotFoundError({
      message: "Category not found",
      ressource: ACCESS_RESSOURCES.CATEGORY,
    });

  return category;
};

export const getCategories = async (
  query: CategoryRouteTypes["/category/"]["GET"]["query"]
): Promise<CategoryRouteTypes["/category/"]["GET"]["response"]> =>
  Category.findPaginated(query);

export const getUnpaginatedCategories = async (): Promise<
  CategoryRouteTypes["/category/unpaginated"]["GET"]["response"]
> => Category.find().lean();

export const getBulk = async (
  ids: string[]
): Promise<CategoryRouteTypes["/category/bulk"]["GET"]["response"]> => {
  const categories = await Category.find({ _id: { $in: ids } }).lean();

  return categories;
};

export const getIdBySlug = async (
  slug: string
): Promise<
  CategoryRouteTypes["/category/id-by-slug/:slug"]["GET"]["response"]
> => {
  const maybeCategory = await Category.findOne({ slug }).lean();

  if (!maybeCategory) {
    throw new NotFoundError({
      message: "Category not found",
      ressource: ACCESS_RESSOURCES.CATEGORY,
    });
  }

  return {
    id: maybeCategory._id.toString(),
  };
};

export const getStaticPaths = async (): Promise<
  CategoryRouteTypes["/category/static-paths"]["GET"]["response"]
> => {
  const categories = await Category.find().lean();

  return categories.map((category) => ({
    params: {
      slug: category.slug,
    },
  }));
};

export const getBySlug = async (
  slug: string
): Promise<
  CategoryRouteTypes["/category/by-slug/:slug"]["GET"]["response"]
> => {
  const maybeCategory = await Category.findOne({ slug }).lean();

  if (!maybeCategory) {
    throw new NotFoundError({
      message: "Category not found",
      ressource: ACCESS_RESSOURCES.CATEGORY,
    });
  }

  return maybeCategory;
};
