import * as blogsController from "controllers/blogs";
import { tokenValidatorOptional } from "http-server/middlewares/authN";
import { Router } from "init";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";
import * as blogsValidators from "validators/sync/blogs";

const router = Router();
const BASE_ROUTE = "/blogs";

router.get(
  `${BASE_ROUTE}/`,
  blogsValidators.getBlogs,
  blogsController.getBlogs
);

router.postProtected(ACCESS_RESSOURCES.BLOGS, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/`,
  blogsValidators.addBlog,
  blogsController.addBlog
);

router.get(`${BASE_ROUTE}/featured`, blogsController.getFeaturedBlogs);

router.get(`${BASE_ROUTE}/static-paths`, blogsController.getBlogsStaticPaths);

router.get(`${BASE_ROUTE}/grouped`, blogsController.getGrouped);

router.get(
  `${BASE_ROUTE}/by-category`,
  blogsValidators.getByCategory,
  blogsController.getByCategory
);

router.get(
  `${BASE_ROUTE}/score/:slug`,
  tokenValidatorOptional,
  blogsValidators.getBlogScore,
  blogsController.getBlogScore
);

router.get(
  `${BASE_ROUTE}/:slug`,
  tokenValidatorOptional,
  blogsValidators.getBlogBySlug,
  blogsController.getBlogBySlug
);

router.putProtected(ACCESS_RESSOURCES.BLOGS, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/:slug`,
  blogsValidators.updateBlogBySlug,
  blogsController.updateBlogBySlug
);

router.deleteProtected(ACCESS_RESSOURCES.BLOGS, PRIVILEGE.DELETE)(
  `${BASE_ROUTE}/:slug`,
  blogsValidators.deleteBlogBySlug,
  blogsController.deleteBlogBySlug
);

router.putProtected(ACCESS_RESSOURCES.PUBLIC, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/upvote/:slug`,
  blogsValidators.upvoteBlog,
  blogsController.upvoteBlog
);

router.putProtected(ACCESS_RESSOURCES.PUBLIC, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/downvote/:slug`,
  blogsValidators.downvoteBlog,
  blogsController.downvoteBlog
);

router.put(
  `${BASE_ROUTE}/clap/:slug`,
  blogsValidators.clapBlog,
  blogsController.clapBlog
);

router.putProtected(ACCESS_RESSOURCES.PUBLIC, PRIVILEGE.WRITE)(
  `${BASE_ROUTE}/remove-vote/:slug`,
  blogsValidators.removeUserVoteFromBlog,
  blogsController.removeUserVoteFromBlog
);

export default router;
