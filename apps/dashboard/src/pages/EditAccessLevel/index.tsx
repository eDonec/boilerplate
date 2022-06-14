import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import Api from "api";
import { useFirstMount } from "core-hooks";
import { Button } from "core-ui";
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";
import { ISelectOption } from "forms/Select";
import RawSelect from "forms/Select/RawSelect";
import { isApiError } from "server-sdk";
import { ACCESS, ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import AccessRessourcesDataTable from "containers/AccessRessourcesDataTable";
import { useInitRoute } from "containers/AppRouter/useInitRoute";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";

const EditAccessLevel = () => {
  const [t] = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isFirstMount = useFirstMount();
  const [customAccess, setCustomAccess] = useState<ACCESS[] | null>(null);
  const [grantableRoles, setGrantableRoles] = useState<ISelectOption[]>([]);
  const [selectedRole, setSelectedRole] = useState<ISelectOption>();
  const [loading, setLoading] = useState(false);

  if (isFirstMount && id) {
    Api.authSDK.getClientById({ params: { id } }).then((data) => {
      setCustomAccess(data.customAccessList || []);
      setSelectedRole({ label: data.role.name, value: data.role._id });
    });
    Api.authSDK
      .getGrantableRoles({ params: { authId: id } })
      .then(setGrantableRoles);
  }

  const baseAccess = useRef<ACCESS[] | null>(null);
  const baseRole = useRef<string | null>(null);

  if (selectedRole && !baseRole.current) baseRole.current = selectedRole.value;
  if (!baseAccess.current && customAccess) baseAccess.current = customAccess;

  const canSubmit =
    JSON.stringify(baseAccess.current) !== JSON.stringify(customAccess) ||
    selectedRole?.value !== baseRole.current;

  const onSubmit = async () => {
    if (!id || !customAccess || !selectedRole) return;
    try {
      setLoading(true);
      await Api.authSDK.updateClientAccess({
        params: { id },
        body: { role: selectedRole.value, access: customAccess },
      });
      setGrantableRoles(
        await Api.authSDK.getGrantableRoles({ params: { authId: id } })
      );
      baseAccess.current = customAccess;
      baseRole.current = selectedRole.value;
      toast.success("Access level updated");
    } catch (error) {
      if (
        isApiError<{ message: string }>(error) &&
        error.response?.data.message
      )
        toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const [submitModalProps, handleSubmit] = useAlertDialog(onSubmit);

  useInitRoute(
    {
      description: "Edit access",
      title: "Edit access",
      customButton: (
        <AccessProtectedWrapper
          privileges={PRIVILEGE.WRITE}
          ressource={ACCESS_RESSOURCES.USER}
        >
          <Button
            disabled={!canSubmit}
            isLoading={loading}
            success
            onClick={handleSubmit}
          >
            {t("misc.save")}
          </Button>
        </AccessProtectedWrapper>
      ),
    },
    [canSubmit, loading]
  );

  return (
    <>
      <RawSelect
        label="Role"
        value={selectedRole}
        options={grantableRoles}
        onChange={setSelectedRole}
        className="mb-3"
      />
      <AccessRessourcesDataTable
        label="Access Ressources"
        onAccessChange={setCustomAccess}
        access={customAccess || []}
        baseAccess={baseAccess}
      />
      <AlertDialog
        size="small"
        title={t("role.confirmationTitle")}
        message={t("role.confirmationBody")}
        confirmMessage={t("misc.confirm")}
        cancelMessage={t("misc.cancel")}
        {...submitModalProps}
      />
    </>
  );
};

export default EditAccessLevel;
