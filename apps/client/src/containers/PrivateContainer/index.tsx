import React from "react";

import { useAuthStatus } from "authenticator";
import ReactChildrenProps from "shared-types/ReactChildren";

import { useRouter } from "next/router";

const PrivateContainer: React.FC<Partial<ReactChildrenProps>> = ({
  children,
}) => {
  const router = useRouter();
  const { isInitiated, isLoading, isLoggedIn } = useAuthStatus();

  if (isInitiated && !isLoading && !isLoggedIn) {
    router.push("/");
  }

  return <>{children}</>;
};

export default PrivateContainer;
