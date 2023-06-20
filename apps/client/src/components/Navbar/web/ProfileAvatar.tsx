import { AuthResponse } from "auth-types/routes/authN";
import { NextImage } from "core-next-components";
import AlertDialog from "core-ui/AlertDialog";
import { clsx, getImageUrl } from "core-utils";
import RawSelect from "forms/Select/RawSelect";

import { useRouter } from "next/router";

import { useProfileAvatar } from "./useProfileAvatar";

const ProfileAvatar = ({ authClient }: { authClient: AuthResponse }) => {
  const { isLoading, handleLogout, userFirstLetter, modalProps } =
    useProfileAvatar({
      authClient,
    });
  const router = useRouter();

  return (
    <div className="relative pl-5">
      <RawSelect
        options={[
          {
            value: "/profile",
            label: "Modifier mon profil",
          },
          {
            value: "logout",
            label: "Sign out",
          },
        ]}
        trigger={
          <div className=" cursor-pointer ">
            <div className="w-auto p-3">
              <div className="-m-2 flex flex-wrap items-center">
                <div className="w-auto p-2">
                  <div className="-m-2 flex flex-wrap">
                    <div className="w-auto p-2">
                      {authClient?.user.avatar ? (
                        <NextImage
                          src={authClient.user.avatar.url}
                          loader={({ src, width }) =>
                            getImageUrl(src, width, width)
                          }
                          imgClassName="rounded-full object-cover"
                          className="relative h-9 w-9"
                          fill
                          alt="avatar"
                        />
                      ) : (
                        <button className="flex h-10 w-10 cursor-pointer rounded-full bg-gray-300 text-sm focus:ring-4 md:mr-0">
                          <span className="sr-only">Open user menu</span>
                          <span className="m-auto text-2xl text-gray-700">
                            {userFirstLetter.toUpperCase()}
                          </span>
                        </button>
                      )}
                    </div>
                    <div className="flex w-auto items-center">
                      <h2 className="text-sm font-semibold text-gray-800">
                        {authClient.user.firstName || ""}
                      </h2>
                    </div>
                  </div>
                </div>
                <div className="block max-w-max text-gray-500 hover:text-gray-600">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-config-id="auto-svg-7-1"
                  >
                    <path
                      d="M17 9.17C16.8126 8.98375 16.5592 8.87921 16.295 8.87921C16.0308 8.87921 15.7774 8.98375 15.59 9.17L12 12.71L8.46001 9.17C8.27265 8.98375 8.0192 8.87921 7.75501 8.87921C7.49082 8.87921 7.23737 8.98375 7.05001 9.17C6.95628 9.26297 6.88189 9.37357 6.83112 9.49543C6.78035 9.61729 6.75421 9.74799 6.75421 9.88C6.75421 10.012 6.78035 10.1427 6.83112 10.2646C6.88189 10.3864 6.95628 10.497 7.05001 10.59L11.29 14.83C11.383 14.9237 11.4936 14.9981 11.6154 15.0489C11.7373 15.0997 11.868 15.1258 12 15.1258C12.132 15.1258 12.2627 15.0997 12.3846 15.0489C12.5064 14.9981 12.617 14.9237 12.71 14.83L17 10.59C17.0937 10.497 17.1681 10.3864 17.2189 10.2646C17.2697 10.1427 17.2958 10.012 17.2958 9.88C17.2958 9.74799 17.2697 9.61729 17.2189 9.49543C17.1681 9.37357 17.0937 9.26297 17 9.17Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
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
                Se déconnecter
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                router.push(value);
              }}
              type="button"
              className="block w-full flex-grow cursor-pointer p-2 text-left text-sm text-gray-700 dark:text-gray-300"
            >
              {label}
            </button>
          )
        }
      />

      <AlertDialog
        title="Logout"
        confirmMessage="Confirmer"
        cancelMessage="Annuler"
        message="Êtes-vous sûr de vouloir vous déconnecter ?"
        size="small"
        {...modalProps}
      />
    </div>
  );
};

export default ProfileAvatar;
