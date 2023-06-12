import { Link } from "react-router-dom";

import AlertDialog from "core-ui/AlertDialog";
import { clsx } from "core-utils";
import RawSelect from "forms/Select/RawSelect";

import { toPropperCase } from "helpers/toProperCase";

import { useNavbar } from "./useNavbar";

const ProfileAvatar = () => {
  const { isLoading, handleLogout, userFirstLetter, modalProps } = useNavbar();

  return (
    <div className="relative pl-5">
      <RawSelect
        options={[
          {
            value: "/profile",
            label: "Edit Profile",
          },
          {
            value: "logout",
            label: "Sign out",
          },
        ]}
        trigger={
          <button className="flex h-10 w-10 cursor-pointer rounded-full bg-gray-300 text-sm focus:ring-4 md:mr-0">
            <span className="sr-only">Open user menu</span>
            <span className="m-auto text-2xl text-gray-700">
              {toPropperCase(userFirstLetter)}
            </span>
          </button>
        }
        itemClassName={clsx(
          "cursor-default select-none items-center rounded-md text-sm outline-none",
          "focus:bg-primary-200 dark:focus:bg-primary-800  text-gray-400 dark:text-gray-500"
        )}
        renderChildren={({ value, label }) =>
          value === "logout" ? (
            <div
              className={clsx("block p-2", {
                "cursor-pointer": !isLoading,
                "cursor-wait": isLoading,
              })}
              onClick={handleLogout}
            >
              <button
                onClick={handleLogout}
                className={clsx(
                  "flex-grow text-sm text-gray-700 dark:text-gray-300",
                  {
                    "cursor-pointer": !isLoading,
                    "cursor-wait": isLoading,
                  }
                )}
                title="Logout"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to={value}
              className="block flex-grow p-2 text-sm text-gray-700 dark:text-gray-300"
            >
              {label}
            </Link>
          )
        }
      />

      <AlertDialog
        title="Logout"
        confirmMessage="Confirm"
        cancelMessage="Cancel"
        message="Are you sure you want to logout?"
        size="small"
        {...modalProps}
      />
    </div>
  );
};

export default ProfileAvatar;
