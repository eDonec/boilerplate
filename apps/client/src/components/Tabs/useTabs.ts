import { useCallback, useEffect, useRef, useState } from "react";

import { TabsProps } from "./types";

export const useTabs = <T>({ tabs, value }: TabsProps<T>) => {
  const tabRefs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>(
    new Array(tabs.length).fill(null)
  );

  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  const indicatorRef = useRef<HTMLDivElement | null>(null);

  const handleSelectionStyle = useCallback(() => {
    const measurments = tabRefs.current.map((ref) => ({
      offsetLeft: ref?.offsetLeft ?? 0,
      width: ref?.clientWidth ?? 0,
      offsetTop: ref?.offsetTop ?? 0,
      height: ref?.clientHeight ?? 0,
    }));

    const selectedIndex = tabs.findIndex((el) => el.value === value);

    tabRefs.current.forEach((ref, i) => {
      if (i === selectedIndex) {
        ref?.classList.add("text-primary");
      } else ref?.classList.remove("text-primary");
    });

    if (indicatorRef.current) {
      indicatorRef.current.style.width =
        measurments[selectedIndex].width + "px";
      indicatorRef.current.style.transform = `translateX(${
        measurments[selectedIndex].offsetLeft
      }px) translateY(${
        measurments[selectedIndex].offsetTop +
        measurments[selectedIndex].height +
        4
      }px)`;
    }
  }, [tabs, value]);

  useEffect(() => {
    handleSelectionStyle();
    window.addEventListener("resize", handleSelectionStyle);

    return () => {
      window.removeEventListener("resize", handleSelectionStyle);
    };
  }, [handleSelectionStyle]);

  return {
    isFirstMount,
    indicatorRef,
    tabRefs,
  };
};
