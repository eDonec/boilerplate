import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/naming-convention
const _3Seconds = 3 * 1000;

let isConsent = false;

export const useGDPR = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined") {
        isConsent = localStorage.getItem("gdpr-consent") === "true";
      }

      if (!isConsent) {
        setShow(true);
      }
    }, _3Seconds);
  }, []);

  const onConsent = (accept?: boolean) => {
    if (accept) localStorage.setItem("gdpr-consent", "true");
    setShow(false);
  };

  return { show, isConsent, onConsent };
};

export default () => {
  const [consent, setConsent] = useState(isConsent);

  useEffect(() => {
    setConsent(isConsent);
  }, [isConsent]);

  return { isConsent: consent };
};
