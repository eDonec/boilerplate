import { FormProvider, useForm } from "react-hook-form";

import { Button } from "core-ui";
import format from "date-fns/format";
import Input from "forms/Input";

interface IFormValues {
  suspensionLiftTime: string | Date;
  reason: string;
}

const SuspendClientForm = ({
  onSubmit,
}: {
  onSubmit: (values: { reason: string; suspensionLiftTime: Date }) => void;
}) => {
  const methods = useForm<IFormValues>({
    defaultValues: {
      suspensionLiftTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      reason: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        className="pt-3"
        onSubmit={methods.handleSubmit(({ reason, suspensionLiftTime }) =>
          onSubmit({ reason, suspensionLiftTime: new Date(suspensionLiftTime) })
        )}
      >
        <Input
          name="reason"
          label="Why are you suspending this client?"
          validate={[
            { rule: "exists" },
            { rule: "isAlphaSpace" },
            { rule: "minLength", param: 10 },
          ]}
          type="textArea"
          placeholder="Suspension reason ..."
        />
        <Input
          name="suspensionLiftTime"
          label="When Do you intend on lifting this suspension?"
          validate={[
            { rule: "exists" },
            { rule: "isDate" },
            { rule: "isAfterDate", param: new Date() },
          ]}
          type="datetime-local"
          placeholder="Ban reason ..."
        />

        <div className="float-right">
          <Button danger type="submit">
            Suspend Client
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default SuspendClientForm;
