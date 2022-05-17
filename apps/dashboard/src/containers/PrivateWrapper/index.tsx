import React from "react";
import { Navigate } from "react-router-dom";

import ReactChildrenProps from "shared-types/ReactChildren";

import { usePrivateWrapper } from "./usePrivateWrapper";

type IProps = ReactChildrenProps;
const PrivateWrapper: React.FC<IProps> = ({ children }) => {
  const { isLoggedIn } = usePrivateWrapper();

  if (!isLoggedIn) return <Navigate to="/sign-in" replace />;

  return <>{children}</>;
};

export default PrivateWrapper;
