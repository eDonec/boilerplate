import { Route, Routes } from "react-router-dom";

import Health from "pages/Health";
import HealthHistory from "pages/Health/HealthHistory";
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
        <Route path="health" element={<Health />}>
          <Route path=":name" element={<HealthHistory />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
