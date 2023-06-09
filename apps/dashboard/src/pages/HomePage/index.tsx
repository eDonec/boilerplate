import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";

import Api from "api";
import { useLogout } from "authenticator";
import MediaFormContext from "contexts/MediaFormContext";
import ButtonLink from "core-cra-components/ButtonLink";
import { Button, useDarkMode } from "core-ui";
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";
import clsx from "core-utils/clsx";
import { Checkbox, Input, RadioButton, Select } from "forms";
import FilePicker from "forms/FilePicker";

import LanguageSelector from "components/LanguageSelector";
import { useInitRoute } from "containers/AppRouter/useInitRoute";

const HomePage = () => {
  useLocation();
  const { toggleDarkMode } = useDarkMode();
  const logout = useLogout();
  const fetchUploadToken = () =>
    Api.authSDK.getUploadToken({
      query: { mimeTypes: ["image/jpg", "image/jpeg", "image/png"] },
    });
  const methods = useForm({
    defaultValues: { start: "" },
  });
  const onSubmit: SubmitHandler<{ start: string }> = (value) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };
  const [submitModalProps, handleSubmit] = useAlertDialog(onSubmit);

  useInitRoute({
    title: "dashboard",
    description: "Overview of your store",
    customButton: (
      <ButtonLink to="edit" soft primary>
        Create
      </ButtonLink>
    ),
  });

  return (
    <>
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center dark:text-gray-200">
        <LanguageSelector />
        <h1 className="mb-4">CRA + Tailwind CSS + TypeScript</h1>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
          {/* <a
            className={clsx(
              "inline-flex items-center rounded px-4 py-2 font-semibold",
              "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
              "shadow-sm",
              "transition-colors duration-75"
            )}
            href="/"
          >
            Go to client {process.env.REACT_APP_HELLO || "hello World"}
          </a> */}
        </p>
        this is a modal
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
          <Link
            className={clsx(
              "inline-flex items-center rounded px-4 py-2 font-semibold",
              "focus:outline-none focus-visible:ring focus-visible:ring-primary-500",
              "shadow-sm",
              "transition-colors duration-75",
              "disabled:cursor-not-allowed"
            )}
            to="/sign-in"
          >
            Go to sign-in
          </Link>
        </p>
        <Button primary onClick={logout}>
          logout
        </Button>
        <MediaFormContext
          {...methods}
          fetchTokenFunction={fetchUploadToken}
          onSubmit={handleSubmit}
        >
          <Input
            validate={[{ rule: "isEmpty" }]}
            name="start"
            type="text"
            placeholder="placeholder"
            label="Input for test"
          />
          <RadioButton
            name="radio"
            values={[
              { value: "f", label: "Female" },
              { value: "m", label: "Male" },
            ]}
            className="bg-radio"
          />
          <Checkbox name="check" label="check box for test" defaultChecked />
          <Select
            name="select"
            initialValue={{ label: "English", value: "en" }}
            validate={[{ rule: "exists" }]}
            options={[
              { label: "English", value: "en" },
              { label: "Français", value: "fr" },
            ]}
          />
          <FilePicker
            name="image"
            label="Click to select image"
            accept={{ "image/png": [".jpeg", ".jpg", ".png"] }}
          />
          <Button type="submit" light>
            submit
          </Button>
          <AlertDialog
            title="Are you absolutely sure?"
            message="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            confirmMessage="Confirmer"
            cancelMessage="Annuler"
            {...submitModalProps}
          />
        </MediaFormContext>
        <Button onClick={toggleDarkMode} light>
          Toggle Dark mode
        </Button>
      </div>
      <div className="min-h-screen"></div>
    </>
  );
};

export default HomePage;
