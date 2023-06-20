import React, { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";

import clsx from "core-utils/clsx";
import ReactChildrenProps from "shared-types/ReactChildren";

import CloseButton from "./CloseButton";
import { useModal } from "./useModal";

export interface ModalProps extends ReactChildrenProps {
  isOpen: boolean;
  title: string;
  size?: "small" | "medium" | "large";
  shouldUnmountOnClose?: boolean;
  handleClose: () => void;
  lazyMount?: boolean;
  className?: string;
}
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  title,
  size: isSmall = "medium",
  children,
  shouldUnmountOnClose = false,
  lazyMount = true,
  className,
}) => {
  useModal({ handleClose });
  const isFirstOpening = React.useRef(lazyMount);
  const ref = React.useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") ref.current = document.body;
    setMounted(true);
  }, []);

  if (isOpen && isFirstOpening.current) {
    isFirstOpening.current = false;
  }
  const shouldRender = !isFirstOpening.current;
  const key = useId();

  return mounted && ref.current
    ? createPortal(
        <div
          key={key}
          className={clsx("fixed inset-0 z-[999] ", {
            "pointer-events-none": !isOpen,
          })}
        >
          <div
            className={clsx(
              { "pointer-events-none": !isOpen },
              "fixed inset-0 z-20 bg-black/50",
              isOpen ? "opacity-50" : " opacity-0",
              "transition-opacity duration-150 ease-in-out"
            )}
            onClick={handleClose}
          />
          <div
            className={clsx(
              { "pointer-events-none": !isOpen },
              { "max-w-md": isSmall === "small" },
              { "max-w-3xl": isSmall === "medium" },
              { "max-w-7xl": isSmall === "large" },
              "mx-auto w-full ",
              isOpen ? "opacity-100" : " opacity-0",
              isOpen ? "scale-1" : "translate-y-[-46%] scale-[.96]",
              "transition-transform duration-150 ease-in-out",
              "overflow-auto transition-opacity",
              "overflow-auto duration-150 ease-in-out",
              "fixed z-50",
              "w-[95vw] rounded-lg  md:w-full",
              "left-[50%] top-[50%] max-h-[95vh] -translate-x-[50%] -translate-y-[50%]",
              "focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
              "bg-gradient-cyan p-0.5"
            )}
          >
            <div
              className={clsx(
                "rounded-lg bg-white px-5 py-3.5 dark:bg-gray-800",
                className
              )}
            >
              <h2 className="mb-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                {title}
              </h2>
              <CloseButton handleClose={handleClose} />
              {shouldUnmountOnClose
                ? isOpen && children
                : shouldRender && children}
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
};

export default Modal;
