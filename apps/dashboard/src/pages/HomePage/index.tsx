import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { Button, useDarkMode } from "core-ui";
import AlertDialog, { useAlertDialog } from "core-ui/AlertDialog";
import clsx from "core-utils/clsx";
import Checkbox from "forms/Checkbox";
import FilePicker from "forms/FilePicker";
import Input from "forms/Input";
import RadioButton from "forms/RadioButton";
import { ACCESS_RESSOURCES, PRIVILEGE } from "shared-types";

import LanguageSelector from "components/LanguageSelector";
import AccessProtectedWrapper from "containers/AuthWrappers/AccessProtectedWrapper";
import PrivateWrapper from "containers/AuthWrappers/PrivateWrapper";

import { useAppSelector, useLoadingDispatch } from "hooks/reduxHooks";

import { logout } from "_redux/slices/auth";
import { decrementCounter, incrementCounter } from "_redux/slices/counter";
import { setCounterAsync } from "_redux/slices/counter/thunk";

const HomePage = () => {
  const count = useAppSelector((state) => state.counter.count);
  const { isLoading, dispatch, classicDispatch } = useLoadingDispatch();
  const { t } = useTranslation();

  const increment = () => {
    classicDispatch(incrementCounter());
  };

  const decrement = () => {
    classicDispatch(decrementCounter());
  };

  const setAsync = () => {
    dispatch(setCounterAsync(300));
  };
  const { toggleDarkMode } = useDarkMode();

  useLocation();
  const methods = useForm({
    defaultValues: { start: "" },
  });
  const onSubmit: SubmitHandler<{ start: string }> = (value) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  const [submitModalProps, handleSubmit] = useAlertDialog(onSubmit);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:text-gray-200">
      <LanguageSelector />
      <h1 className="mb-4">CRA + Tailwind CSS + TypeScript + Redux Tookit</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
        <a
          className={clsx(
            "inline-flex items-center rounded px-4 py-2 font-semibold",
            "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring",
            "shadow-sm",
            "transition-colors duration-75"
          )}
          href="/"
        >
          Go to client {process.env.REACT_APP_HELLO || "hello World"}
        </a>
      </p>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
        <Link
          className={clsx(
            "inline-flex items-center rounded px-4 py-2 font-semibold",
            "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring",
            "shadow-sm",
            "transition-colors duration-75",
            "disabled:cursor-not-allowed"
          )}
          to="/sign-in"
        >
          Go to sign-in
        </Link>
      </p>
      <PrivateWrapper>
        <Button
          primary
          onClick={() => {
            classicDispatch(logout());
          }}
        >
          logout
        </Button>
      </PrivateWrapper>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
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
          ></RadioButton>
          <Checkbox
            name="check"
            className="bg-dak"
            label="check box for test"
            defaultChecked
          ></Checkbox>
          <AccessProtectedWrapper
            previlages={[PRIVILEGE.DELETE_SELF, PRIVILEGE.DELETE]}
            ressource={ACCESS_RESSOURCES.USER}
          >
            <FilePicker
              name="image"
              label="Click to select image"
              accept=".jpeg,.jpg,.png,.docx,.pptx,.pdf,.xlsx"
            ></FilePicker>
          </AccessProtectedWrapper>
          <Button type="submit" light>
            submit
          </Button>
          <AlertDialog
            title="titre"
            message="Etes-vous sur de vouloir continuer?"
            confirmMessage="Confirmer"
            cancelMessage="Annuler"
            {...submitModalProps}
          />
        </form>
      </FormProvider>
      <Button onClick={toggleDarkMode} light>
        Toggle Dark mode
      </Button>
      <h2 className="my-3">Redux Counter : {count}</h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button
            primary
            disabled={count === 0 || isLoading}
            onClick={decrement}
          >
            {t("user.activation")}
          </Button>
          <Button primary disabled={isLoading} onClick={increment}>
            {t("api.notFound")}
          </Button>
        </div>
        <Button outline onClick={setAsync} isLoading={isLoading}>
          {t("api.updated")}
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
