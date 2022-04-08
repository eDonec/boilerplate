import React, { useEffect } from "react";

import i18n from "locales";
import ReactChildrenProps from "shared-types/ReactChildren";

import { useRouter } from "next/router";

const TranslationProvider: React.FC<ReactChildrenProps> = ({ children }) => {
  // Put Header or Footer Here
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return <>{children}</>;
};

export default TranslationProvider;
