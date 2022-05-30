import { useDarkMode } from "core-ui";

import DarkModeIcon from "components/Icons/DarkModeIcon";
import LighModeIcon from "components/Icons/LightModeIcon";

const DarkModeButton = () => {
  const { theme, toggleDarkMode } = useDarkMode();

  return (
    <div className="relative pl-5">
      <div
        onClick={toggleDarkMode}
        className="mr-3 flex h-10 w-10 cursor-pointer rounded-full text-sm focus:ring-4 md:mr-0"
      >
        {theme === "light" ? (
          <LighModeIcon className="m-auto h-5 w-5 fill-slate-100 stroke-slate-100" />
        ) : (
          <DarkModeIcon className="m-auto h-5 w-5 fill-slate-100 stroke-slate-100" />
        )}
      </div>
    </div>
  );
};

export default DarkModeButton;
