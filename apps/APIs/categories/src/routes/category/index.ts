import * as categoryController from "controllers/category";
import { Router } from "init";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import * as categoryValidators from "validators/sync/category";

const router = Router();
const BASE_ROUTE = "/category";

router.postProtected(ACCESS_RESSOURCES.CATEGORY, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/`,
  categoryValidators.addCategory,
  categoryController.addCategory
);

router.putProtected(ACCESS_RESSOURCES.CATEGORY, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/:id`,
  categoryValidators.updateCategory,
  categoryController.updateCategory
);

router.deleteProtected(ACCESS_RESSOURCES.CATEGORY, PRIVILEGE.DELETE)(
  `${BASE_ROUTE}/:id`,
  categoryValidators.deleteCategory,
  categoryController.deleteCategory
);

router.get(
  `${BASE_ROUTE}/bulk`,
  categoryValidators.getBulk,
  categoryController.getBulk
);

router.get(
  `${BASE_ROUTE}/unpaginated`,
  categoryController.getUnpaginatedCategories
);

router.get(`${BASE_ROUTE}/static-paths`, categoryController.getStaticPaths);

router.get(
  `${BASE_ROUTE}/:id`,
  categoryValidators.getCategory,
  categoryController.getCategory
);

router.get(
  `${BASE_ROUTE}/`,
  categoryValidators.getCategories,
  categoryController.getCategories
);

router.get(
  `${BASE_ROUTE}/id-by-slug/:slug`,
  categoryValidators.getIdBySlug,
  categoryController.getIdBySlug
);

router.get(
  `${BASE_ROUTE}/by-slug/:slug`,
  categoryValidators.getBySlug,
  categoryController.getBySlug
);

export default router;
