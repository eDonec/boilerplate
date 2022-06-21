import { useRef } from "react";

import { ACCESS, ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { accessMatcher } from "containers/AuthWrappers/AccessProtectedWrapper/useAccessProtectedWrapper";

import { useAppSelector } from "hooks/reduxHooks";

import { RoleFormProps } from "./types";

export const useRoleForm = ({
  setRole,
  baseRole,
  isFormReadOnly: readonly,
}: RoleFormProps) => {
  const currentUserAccess = useAppSelector((state) => state.auth.access);
  const isFormReadOnly =
    readonly ||
    !accessMatcher(currentUserAccess, ACCESS_RESSOURCES.ROLE, PRIVILEGE.WRITE);

  const baseAccess = useRef<ACCESS[] | null>(null);

  if (baseRole.current?.access) baseAccess.current = baseRole.current?.access;

  const onTitleChange = (
    e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>
  ) => {
    setRole((prevRole) => {
      if (!prevRole) {
        return prevRole;
      }

      return {
        ...prevRole,
        name: e.target.value,
      };
    });
  };

  const onAccessChange = (newAccess: ACCESS[]) => {
    setRole((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        access: newAccess,
      };
    });
  };

  return {
    onTitleChange,
    isFormReadOnly,
    onAccessChange,
    baseAccess,
  };
};
