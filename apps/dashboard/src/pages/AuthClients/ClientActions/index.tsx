import ButtonLink from "core-cra-components/ButtonLink";
import { Button } from "core-ui";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum CLIENT_ACTION_OPTIONS {
  SUSPEND_CLIENT = "SUSPEND_CLIENT",
  LIFT_SUSPENTION = "LIFT_SUSPENTION",
  BAN_CLIENT = "BAN_CLIENT",
  LIFT_BAN = "LIFT_BAN",
}

const ClientActions = ({
  isBanned,
  isSuspended,
  handelClientAction,
  isLoading,
}: {
  isBanned: boolean;
  isSuspended: boolean;
  isLoading: boolean;
  handelClientAction: (action: CLIENT_ACTION_OPTIONS) => void;
}) => (
  <div className="bg-op flex gap-2">
    <AccessProtectedWrapper
      ressource={ACCESS_RESSOURCES.AUTHENTICATED_CLIENTS}
      privileges={PRIVILEGE.WRITE}
    >
      <ButtonLink
        to="access-level/edit/:id"
        className="text-center"
        soft
        warning
        disabled={isSuspended || isBanned}
      >
        Change Client Access Level
      </ButtonLink>
    </AccessProtectedWrapper>
    <AccessProtectedWrapper
      ressource={ACCESS_RESSOURCES.SUSPEND_CLIENTS}
      privileges={PRIVILEGE.WRITE}
    >
      {isSuspended || isBanned ? (
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          soft
          success
          onClick={() =>
            handelClientAction(CLIENT_ACTION_OPTIONS.LIFT_SUSPENTION)
          }
        >
          Lift Suspension
        </Button>
      ) : (
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          soft
          danger
          onClick={() =>
            handelClientAction(CLIENT_ACTION_OPTIONS.SUSPEND_CLIENT)
          }
        >
          Suspend Client
        </Button>
      )}
    </AccessProtectedWrapper>
    <AccessProtectedWrapper
      ressource={ACCESS_RESSOURCES.BAN_CLIENTS}
      privileges={PRIVILEGE.WRITE}
    >
      {isBanned ? (
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          soft
          success
          onClick={() => handelClientAction(CLIENT_ACTION_OPTIONS.LIFT_BAN)}
        >
          Lift Ban
        </Button>
      ) : (
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          danger
          onClick={() => handelClientAction(CLIENT_ACTION_OPTIONS.BAN_CLIENT)}
        >
          Ban Client
        </Button>
      )}
    </AccessProtectedWrapper>
  </div>
);

export default ClientActions;
