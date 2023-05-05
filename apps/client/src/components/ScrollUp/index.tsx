import React, { useEffect, useState } from "react";

import { clsx } from "core-utils";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    }

    return () => {
      if (typeof window !== "undefined")
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <a
      href="#navbar"
      className={clsx(
        isVisible ? "opacity-100" : " opacity-0",
        isVisible ? "translate-y-0" : "translate-y-[-4%]",
        "z-20 transition-all duration-150 ease-in-out",
        "fixed bottom-0 right-0 m-4 mb-16 flex h-12 w-12 cursor-pointer flex-col justify-center rounded-full border border-primary-800 bg-black/5 text-center align-middle text-primary-800 shadow-inner drop-shadow backdrop-blur-lg xl:m-10 xl:h-16 xl:w-16"
      )}
    >
      <span className="">▲</span>
    </a>
  );
};

export default ScrollUp;
