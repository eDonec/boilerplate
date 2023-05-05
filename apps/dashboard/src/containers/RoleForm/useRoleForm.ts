import { useRef } from "react";

import { useAccessMatcher } from "authenticator";
import { ACCESS, ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import { RoleFormProps } from "./types";

export const useRoleForm = ({
  setRole,
  baseRole,
  isFormReadOnly: readonly,
}: RoleFormProps) => {
  const accessMatcher = useAccessMatcher();
  const isFormReadOnly =
    readonly ||
    !accessMatcher({
      ressource: ACCESS_RESSOURCES.ROLE,
      privileges: PRIVILEGE.WRITE,
    });

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
