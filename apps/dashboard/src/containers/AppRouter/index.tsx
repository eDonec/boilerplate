import { Route, Routes } from "react-router-dom";

import HomePage from "pages/HomePage";
import { SignIn } from "pages/SignIn";

const AppRouter = () => (
  <Routes>
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="/" element={<HomePage />} />
  </Routes>
);

export default AppRouter;
