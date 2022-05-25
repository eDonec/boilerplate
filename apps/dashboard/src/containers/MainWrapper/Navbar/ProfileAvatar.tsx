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
/* <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown button <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
<!-- Dropdown menu -->
<div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700">
    <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
      </li>
      <li>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div> */