import { Route, Routes } from "react-router-dom";

import AccessPage from "pages/AccessPage";
import AuthClients from "pages/AuthClients";
import HomePage from "pages/HomePage";
import RoleDetails from "pages/RoleDetails";
import { SignIn } from "pages/SignIn";

import MainWrapper from "containers/MainWrapper";

import { useAppRouter } from "./useAppRouter";

const AppRouter = () => {
  useAppRouter();

  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/" element={<MainWrapper />}>
        <Route index element={<HomePage />} />
        <Route path="product/:id/edit" element={<HomePage />} />
        <Route path="/roles/:id" element={<RoleDetails />} />
        <Route path="roles" element={<AccessPage />} />
        <Route path="authenticated-clients" element={<AuthClients />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
