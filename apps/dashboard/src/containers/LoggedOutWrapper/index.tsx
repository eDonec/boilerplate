import React from "react";
import { Navigate } from "react-router-dom";

import ReactChildrenProps from "shared-types/ReactChildren";

import { useLoggedOutWrapper } from "./useLoggedOutWrapper";

type IProps = ReactChildrenProps;
export const LoggedOutWrapper: React.FC<IProps> = ({ children }) => {
  const { isLoggedIn } = useLoggedOutWrapper();

  if (isLoggedIn) return <Navigate to="/" replace />;

  return <>{children}</>;
};
