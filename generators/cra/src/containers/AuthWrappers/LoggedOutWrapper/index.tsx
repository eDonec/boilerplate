import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import Loader from "core-ui/Loader";
import ReactChildrenProps from "shared-types/ReactChildren";

import { useLogoutWrapper } from "./useLogoutWrapper";

type IProps = ReactChildrenProps & {
  fallback?: ReactNode;
};
export const LoggedOutWrapper: React.FC<IProps> = ({ fallback, children }) => {
  const { isLoggedIn, isLoading, roleName } = useLogoutWrapper();

  if (isLoggedIn && roleName !== "PUBLIC") return <Navigate to="/" replace />;

  if (isLoading === true)
    return fallback ? (
      <>{fallback}</>
    ) : (
      <div className="relative p-4">
        <div className="absolute top-0 left-0 z-10 flex h-full w-full  items-center justify-center bg-white/30 text-center align-middle backdrop-blur-sm">
          <Loader />
        </div>
        {children}
      </div>
    );

  return <>{children}</>;
};
