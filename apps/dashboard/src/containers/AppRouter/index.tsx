import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Api from "api";
import AccessPage from "pages/AccessPage";
import AddBlog from "pages/AddBlog";
import AddCategory from "pages/AddCategory";
import AddRole from "pages/AddRole";
import AuthClients from "pages/AuthClients";
import Blogs from "pages/Blogs";
import Categories from "pages/Categories";
import EditAccessLevel from "pages/EditAccessLevel";
import EditBlog from "pages/EditBlog";
import EditCategory from "pages/EditCategory";
import EditRole from "pages/EditRole";
import Health from "pages/Health";
import HealthHistory from "pages/Health/HealthHistory";
import HomePage from "pages/HomePage";
import { SignIn } from "pages/SignIn";

import MainWrapper from "containers/MainWrapper";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<MainWrapper />}>
          <Route path="product/:id/edit" element={<HomePage />} />
          <Route path="roles/add" element={<AddRole />} />
          <Route path="roles/edit/:id" element={<EditRole />} />
          <Route path="roles/:id" element={<EditRole />} />
          <Route path="roles" element={<AccessPage />} />
          <Route path="authenticated-clients" element={<AuthClients />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/add" element={<AddBlog />} />
          <Route path="blogs/edit/:slug" element={<EditBlog />} />
          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/edit/:id" element={<EditCategory />} />
          <Route path="health" element={<Health />}>
            <Route path=":name" element={<HealthHistory />} />
          </Route>
          <Route
            path="authenticated-clients/access-level/edit/:id"
            element={<EditAccessLevel />}
          />
        </Route>
      </Route>
    ),
    { basename: process.env.REACT_APP_BASE_URL }
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
