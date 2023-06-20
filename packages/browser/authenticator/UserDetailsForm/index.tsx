import { FC } from "react";

import Button from "core-ui/Button";
import { clsx } from "core-utils";
import { FilePicker, Input, MediaFormContext } from "forms";

import { useUserDetailsForm } from "./useUserDetailsForm";

type UserDetailsFromProps = {
  className?: string;
  onSuccessfullProfileUpdate?: () => void;
  submitText?: string;
};

const UserDetailsFrom: FC<UserDetailsFromProps> = ({
  className,
  onSuccessfullProfileUpdate: onSuccessfullSubmit,
  submitText = "Confirmer",
}) => {
  const { formMethods, handleSubmit, fetchUploadToken, isDirty } =
    useUserDetailsForm(onSuccessfullSubmit);

  return (
    <MediaFormContext
      className={clsx(className, "grid space-y-2")}
      onSubmit={handleSubmit}
      fetchTokenFunction={fetchUploadToken}
      {...formMethods}
    >
      <FilePicker
        validate={[{ rule: "isEmpty" }]}
        name="avatar"
        label="Avatar"
        displayName="L'avatar"
        maxFiles={1}
      />
      <Input
        validate={[{ rule: "isEmpty" }]}
        name="firstName"
        label="Prénom"
        displayName="Le prénom"
        placeholder="Prénom"
      />
      <Input
        validate={[{ rule: "isEmpty" }]}
        name="lastName"
        label="Nom"
        displayName="Le nom"
        placeholder="Nom"
      />
      <Input
        validate={[{ rule: "isEmpty" }]}
        name="phoneNumber"
        label="N° Téléphone"
        displayName="Le n° Téléphone"
        placeholder="N° Téléphone"
      />
      <Button disabled={!isDirty} className="mt-4" light type="submit">
        {submitText}
      </Button>
    </MediaFormContext>
  );
};

export default UserDetailsFrom;
