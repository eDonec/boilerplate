import { useTranslation } from "react-i18next";

import { Button } from "core-ui";

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <LanguageSelector />
      <h1 className="mb-4">{t("imagePicker.draggingPrompt")}</h1>
      <p className="mt-2 text-sm text-gray-700">
        <a href="/">{t("api.deleted")}</a>
      </p>
      <p className="mt-2 text-sm text-gray-700">
        <a href="/api/v1">{t("api.created")}</a>
      </p>
      <h2 className="my-3">
        {t("imagePicker.dragPrompt")} : {count}
      </h2>
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
