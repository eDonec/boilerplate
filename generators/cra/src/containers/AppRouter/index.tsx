import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import HomePage from "pages/HomePage";
import { SignIn } from "pages/SignIn";

import MainWrapper from "containers/MainWrapper";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<MainWrapper />}>
          <Route index element={<HomePage />} />
        </Route>
      </Route>
    ),
    { basename: process.env.VITE_APP_BASE_URL }
  );

  return <RouterProvider router={router} />;
};

export default AppRouter;
