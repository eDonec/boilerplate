import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import Loader from "core-ui/Loader";
import ReactChildrenProps from "shared-types/ReactChildren";

import { useAuthState } from "hooks/useAuthState";

type IProps = ReactChildrenProps & {
  fallback?: ReactNode;
};
const PrivateWrapper: React.FC<IProps> = ({ children, fallback }) => {
  const { isLoggedIn, isLoading, roleName } = useAuthState();

  if (roleName === "PUBLIC") {
    return <Navigate to="/sign-in" replace />;
  }
  if (isLoggedIn === false) return <Navigate to="/sign-in" replace />;

  if (isLoading === true)
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className=" fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-white/30 text-center align-middle backdrop-blur-sm">
        <Loader />
      </div>
    );

  return <div className="p-4">{children}</div>;
};

export default PrivateWrapper;
