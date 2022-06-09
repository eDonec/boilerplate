import { Route, Routes } from "react-router-dom";

import AccessPage from "pages/AccessPage";
import AddRole from "pages/AddRole";
import AuthClients from "pages/AuthClients";
import EditRole from "pages/EditRole";
import HomePage from "pages/HomePage";
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
        <Route path="roles/add" element={<AddRole />} />
        <Route path="roles/:id" element={<EditRole />} />
        <Route path="roles" element={<AccessPage />} />
        <Route path="authenticated-clients" element={<AuthClients />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
