import React, { useEffect, useRef, useState } from "react";

import { AuthResponse } from "auth-types/routes/authN";
import Modal from "core-ui/Modal";
import hasNestedAttributes from "core-utils/hasNestedAttributes";
import { RequireOnlyOne } from "shared-types";
import ReactChildrenProps from "shared-types/ReactChildren";

import AuthGuarded from "../AuthGuarded";
import { useAuthClient, useAuthStatus } from "../../hooks";
import UserDetailsFrom from "../../UserDetailsForm";

type TAttributes = Exclude<
  `user.${keyof AuthResponse["user"]}` | "email" | "userName",
  "user.auth" | "user._id"
>;
type TProps = RequireOnlyOne<
  {
    onSuccessfullProfileUpdate?: () => void;
    requiredAttributes: TAttributes[];
    isActive: true;
  },
  "isActive" | "requiredAttributes"
> &
  ReactChildrenProps;

const UserDetailsGuarded: React.FC<TProps> = ({
  children,
  requiredAttributes,
  isActive,
  onSuccessfullProfileUpdate,
}) => {
  const auth = useAuthClient();
  const { isLoggedIn, isLoading, isInitiated } = useAuthStatus();
  const [isOpen, setIsOpen] = useState(false);
  const hasRecentlyLoggedIn = useRef(false);
  const hasRecentlyUpdatedProfile = useRef(false);

  const canPassThrough =
    (isActive && auth?.isActivated) ||
    (requiredAttributes && hasNestedAttributes(auth, requiredAttributes));

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = (
    e?: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsOpen(true);
  };

  const handleSuccessfulllSubmit = () => {
    hasRecentlyUpdatedProfile.current = true;
  };

  const handleSuccessfullLogin = () => {
    hasRecentlyLoggedIn.current = true;
    handleOpenModal();
  };

  useEffect(() => {
    if (
      (hasRecentlyUpdatedProfile.current || hasRecentlyLoggedIn.current) &&
      canPassThrough
    ) {
      hasRecentlyLoggedIn.current = false;
      hasRecentlyUpdatedProfile.current = false;
      onSuccessfullProfileUpdate?.();
    }
  }, [
    hasRecentlyLoggedIn.current,
    canPassThrough,
    hasRecentlyUpdatedProfile.current,
  ]);

  if (!isLoggedIn || !auth)
    return (
      <AuthGuarded onSuccessfullLogin={handleSuccessfullLogin}>
        {children}
      </AuthGuarded>
    );

  if (canPassThrough) return <>{children}</>;

  return (
    <>
      <div className="relative cursor-pointer" onClick={handleOpenModal}>
        {(isLoading || !isInitiated) && (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full  items-center justify-center bg-white/30 text-center align-middle backdrop-blur-sm"></div>
        )}
        <div className="pointer-events-none h-full">{children}</div>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        title="Finir votre compte avant de continuer"
      >
        <UserDetailsFrom
          onSuccessfullProfileUpdate={handleSuccessfulllSubmit}
        />
      </Modal>
    </>
  );
};

export default UserDetailsGuarded;
