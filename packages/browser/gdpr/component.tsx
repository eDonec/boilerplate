import { clsx } from "core-utils";

import { useGDPR } from "./useGDPR";

const GDPRConsent = () => {
  const { onConsent, show } = useGDPR();

  return (
    <div
      className={clsx(
        "fixed bottom-20 z-50 overflow-hidden rounded-lg bg-gray-50 shadow-2xl transition-all duration-150 ease-in-out dark:bg-gray-900 sm:right-4",
        { "pointer-events-none": !show },
        { "w-full max-w-[90%] sm:w-1/2 xl:w-1/4": show },
        show ? "opacity-100" : " opacity-0",
        show ? "scale-1" : "translate-y-[-46%] scale-[.96]"
      )}
    >
      {show && (
        <>
          <div className="relative overflow-hidden px-8 pt-8 text-gray-900 dark:text-gray-100">
            <div className="flex flex-col pb-4 text-lg sm:text-xl md:text-2xl">
              <small>Bonjour...</small>
              <span className="text-xl font-bold sm:text-2xl md:text-2xl">
                Nous utilisons des cookies!
              </span>
            </div>
            <div className="pb-4">
              <p>
                Nous voulions juste vous informer que nous utilisons des cookies
                et d&apos;autres technologies de suivi pour améliorer votre
                expérience de navigation sur notre site Web. Cela nous permet de
                vous montrer du contenu personnalisé et des publicités ciblées,
                d&apos;analyser le trafic de notre site Web et de comprendre
                d&apos;où viennent nos visiteurs. <br /> <br />
                <p className="">
                  En continuant, vous acceptez
                  <a target="_blank" href="/terms-of-service">
                    <strong> les conditions d&apos;utilisation </strong>de Mr le
                    Psy
                  </a>{" "}
                  et reconnaissez avoir lu notre
                  <a href="/privacy-policy" target="_blank">
                    <strong> Politique de confidentialité.</strong>
                  </a>
                </p>
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-center border-t border-solid border-gray-200 dark:border-gray-700">
            <button
              onClick={() => onConsent(true)}
              className="flex-1 border-r border-gray-200 px-4 py-3 text-success-800 duration-150 hover:bg-success-800 hover:text-white dark:border-gray-700 dark:text-success-200 dark:hover:text-white"
            >
              J&apos;accepte
            </button>
            <button
              onClick={() => onConsent()}
              className="flex-1 px-4 py-3 text-danger-800 duration-150 hover:bg-danger-800 hover:text-white dark:border-gray-700 dark:text-danger-400 dark:hover:text-white"
            >
              Je refuse
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GDPRConsent;
