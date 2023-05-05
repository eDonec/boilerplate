import React from "react";

import { clsx } from "core-utils";

import { TabsProps } from "./types";
import { useTabs } from "./useTabs";

const Tabs = <T,>(props: TabsProps<T>) => {
  const { isFirstMount, indicatorRef, tabRefs } = useTabs(props);

  const { className = "", tabs, onChange } = props;

  return (
    <div
      className={clsx(
        "relative mb-1 flex flex-wrap gap-6 self-start",
        className
      )}
    >
      {tabs.map((el, i) => (
        <button
          onClick={() => onChange?.(el.value)}
          ref={(ref) => (tabRefs.current[i] = ref)}
          className={clsx(
            "text-sm uppercase tracking-wide transition-colors hover:text-black",
            {
              "font-black": el.value === props.value,
              "font-semibold text-gray-500": el.value !== props.value,
            }
          )}
          key={`${el.value}`}
        >
          {el.label}
        </button>
      ))}
      <div
        ref={indicatorRef}
        className={clsx(
          "absolute top-0 right-0 left-0 h-[2px] rounded-lg bg-black",
          {
            "transition-all duration-500": !isFirstMount,
            "opacity-0": isFirstMount,
          }
        )}
      />
    </div>
  );
};

export default Tabs;
