import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { Button, useDarkMode } from "core-ui";
import Checkbox from "forms/Checkbox";
import Input from "forms/Input";

import LanguageSelector from "components/LanguageSelector";

import { useAppSelector, useLoadingDispatch } from "hooks/reduxHooks";

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
  const onSubmit: SubmitHandler<{ start: string }> = (value) =>
    // eslint-disable-next-line no-console
    console.log(value);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center dark:text-gray-200">
      <LanguageSelector />
      <h1 className="mb-4">CRA + Tailwind CSS + TypeScript + Redux Tookit</h1>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
        <a href="/">Go to client</a>
      </p>
      <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
        <a href="/api/v1">Go to API</a>
      </p>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Input
            validate={[{ rule: "isEmpty" }]}
            name="start"
            type="text"
            placeholder="placeholder"
            label="Input for test"
          />
          <Checkbox
            name="check"
            className="bg-dak"
            label="check box for test"
            defaultChecked
          ></Checkbox>

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
