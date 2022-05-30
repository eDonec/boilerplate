import { Link } from "react-router-dom";

import AlertDialog from "core-ui/AlertDialog";
import { clsx } from "core-utils";

import { toPropperCase } from "helpers/toProperCase";

import { useNavbar } from "./useNavbar";

const ProfileAvatar = () => {
  const {
    isLoading,
    handleLogout,
    userFirstLetter,
    modalProps,
    isOpen,
    toggleSubmenu,
  } = useNavbar();

  return (
    <div className="relative pl-5">
      <div
        onClick={toggleSubmenu}
        className="mr-3 flex h-10 w-10 cursor-pointer rounded-full bg-gray-300 text-sm focus:ring-4 md:mr-0"
      >
        <span className="sr-only">Open user menu</span>
        <span className="m-auto text-2xl">
          {toPropperCase(userFirstLetter)}
        </span>
      </div>

      <div
        id="dropdown"
        className={clsx(
          "absolute right-0 top-[3rem] z-10  w-44 divide-y rounded shadow dark:bg-gray-700",
          "transition-transform ease-in-out",
          { "pointer-events-none": !isOpen },
          isOpen ? "opacity-100" : " opacity-0",
          isOpen
            ? "translate-y-0 translate-x-0 scale-[1]"
            : "translate-y-[-35%] translate-x-[20%] scale-[0]"
        )}
      >
        <ul
          className="divide-gray-100 rounded bg-white text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefault"
        >
          <li className="">
            <Link
              to="/profile"
              className="block rounded-t px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit profile
            </Link>
          </li>
          <li className="">
            <div
              onClick={handleLogout}
              className={clsx(
                "block rounded-b px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ",
                {
                  "cursor-pointer": !isLoading,
                  "cursor-wait": isLoading,
                }
              )}
              title="Logout"
            >
              Sign out
            </div>
          </li>
        </ul>
      </div>
      <AlertDialog
        title="Logout"
        confirmMessage="Yes"
        cancelMessage="Cancel"
        message="Are you sure you want to logout?"
        {...modalProps}
      />
    </div>
  );
};

export default ProfileAvatar;
