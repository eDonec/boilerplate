import { Route, Routes } from "react-router-dom";

import AccessPage from "pages/AccessPage";
import AuthClients from "pages/AuthClients";
import HomePage from "pages/HomePage";
import RoleDetails from "pages/RoleDetails";
import { SignIn } from "pages/SignIn";

import { useAppRouter } from "./useAppRouter";

const AppRouter = () => {
  useAppRouter();

  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/product/:id/edit" element={<HomePage />} />
      <Route path="/roles" element={<AccessPage />} />
      <Route path="/roles/:id" element={<RoleDetails />} />
      <Route path="/authenticated-clients" element={<AuthClients />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default AppRouter;
