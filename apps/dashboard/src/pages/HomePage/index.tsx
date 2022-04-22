import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { Button, useDarkMode } from "core-ui";
import Modal from "core-ui/Modal";
import clsx from "core-utils/clsx";
import Checkbox from "forms/Checkbox";
import FilePicker from "forms/FilePicker";
import Input from "forms/Input";
import RadioButton from "forms/RadioButton";
import Select from "forms/Select";

import LanguageSelector from "components/LanguageSelector";

import { useAppSelector, useLoadingDispatch } from "hooks/reduxHooks";

import { decrementCounter, incrementCounter } from "_redux/slices/counter";
import { setCounterAsync } from "_redux/slices/counter/thunk";

const HomePage = () => {
  const count = useAppSelector((state) => state.counter.count);
  const { isLoading, dispatch, classicDispatch } = useLoadingDispatch();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

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
  const onSubmit: SubmitHandler<{ start: string }> = (value) =>
    // eslint-disable-next-line no-console
    console.log(value);

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
            "transition-colors duration-75",
            "disabled:cursor-not-allowed",
            "bg-primary-700 text-white",
            "border-primary-600 border",
            "hover:bg-primary-600 hover:text-white",
            "active:bg-primary-500",
            "disabled:bg-primary-400 disabled:hover:bg-primary-400"
          )}
          href="/"
        >
          Go to client {process.env.REACT_APP_HELLO || "hello World"}
        </a>
      </p>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
        <a
          className={clsx(
            "inline-flex items-center rounded px-4 py-2 font-semibold",
            "focus-visible:ring-primary-500 focus:outline-none focus-visible:ring",
            "shadow-sm",
            "transition-colors duration-75",
            "disabled:cursor-not-allowed",
            "bg-primary-700 text-white",
            "border-primary-600 border",
            "hover:bg-primary-600 hover:text-white",
            "active:bg-primary-500",
            "disabled:bg-primary-400 disabled:hover:bg-primary-400"
          )}
          href="/api/v1"
        >
          Go to API
        </a>
      </p>
      <Button onClick={() => setOpen(true)}>Toggle modal</Button>
      <Modal isOpen={open} handleClose={() => setOpen(false)}>
        <p>
          Never gonna give you up Never gonna let you down Never gonna run
          around and desert you Never gonna make you cry Never gonna say goodbye
          Never gonna tell a lie and hurt you Never gonna give you up Never
          gonna let you down Never gonna run around and desert you Never gonna
          make you cry Never gonna say goodbye Never gonna tell a lie and hurt
          you
        </p>
      </Modal>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
          <Select
            name="select"
            validate={[{ rule: "exists" }]}
            options={[
              { label: "English", value: "en" },
              { label: "Français", value: "fr" },
            ]}
          />
          <FilePicker
            name="image"
            label="Click to select image"
            accept=".jpeg,.jpg,.png,.docx,.pptx,.pdf,.xlsx"
            maxFiles={10}
          ></FilePicker>
          <Button type="submit" light>
            submit
          </Button>
        </form>
      </FormProvider>
      <Button onClick={toggleDarkMode} light>
        Toggle Dark mode
      </Button>
      <h2 className="my-3">Redux Counter : {count}</h2>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Button disabled={count === 0 || isLoading} onClick={decrement}>
            {t("user.activation")}
          </Button>
          <Button disabled={isLoading} onClick={increment}>
            {t("api.notFound")}
          </Button>
        </div>
        <Button onClick={setAsync} isLoading={isLoading}>
          {t("api.updated")}
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
