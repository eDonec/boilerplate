import React, { DOMAttributes, useState } from "react";

import Modal from "core-ui/Modal";
import { clsx } from "core-utils";
import ReactChildrenProps from "shared-types/ReactChildren";

import Authenticator from "../../Authenticator";
import { useAuthStatus } from "../../hooks";

type IProps = {
  onSuccessfullLogin?: () => void;
  onResetPassowordRequestSuccess?: () => void;
  className?: string;
} & ReactChildrenProps;

const AuthGuarded: React.FC<IProps> = ({
  children,
  onSuccessfullLogin,
  onResetPassowordRequestSuccess,
  className,
}) => {
  const { isLoggedIn, isLoading, isInitiated } = useAuthStatus();
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal: DOMAttributes<HTMLDivElement>["onClick"] = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(true);
  };

  if (isLoggedIn) return <>{children}</>;

  return (
    <>
      <div className="relative cursor-pointer" onClick={handleOpenModal}>
        {(isLoading || !isInitiated) && (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full  items-center justify-center bg-white/30 text-center align-middle backdrop-blur-sm" />
        )}
        <div className={clsx("pointer-events-none", className)}>{children}</div>
      </div>
      <Modal
        size="small"
        isOpen={isOpen}
        handleClose={handleCloseModal}
        title="Se connecter à votre compte"
      >
        <Authenticator
          onSuccessfullLogin={onSuccessfullLogin}
          onResetPassowordRequestSuccess={onResetPassowordRequestSuccess}
        />
      </Modal>
    </>
  );
};

export default AuthGuarded;
