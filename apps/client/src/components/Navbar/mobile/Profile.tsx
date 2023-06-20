import React from "react";

import { useAuthClient } from "authenticator";
import { NextImage } from "core-next-components";
import { getImageUrl } from "core-utils";

import Link from "next/link";

const MobileProfile = ({
  handleCloseSidebar,
}: {
  handleCloseSidebar: () => void;
}) => {
  const authClient = useAuthClient();

  if (!authClient) return null;
  const userFirstLetter =
    (authClient.user.firstName ||
      authClient.userName ||
      authClient.email ||
      authClient.authID)[0].toUpperCase() +
    ((authClient.user.lastName || "")[0]?.toUpperCase() || "");

  return (
    <>
      <hr />
      <Link
        href="/profile"
        onClick={handleCloseSidebar}
        className="mt-3 flex w-full max-w-xs items-center justify-between "
      >
        <div className="w-auto">
          <div className="-mx-2 flex ">
            <div className="w-auto p-2">
              {authClient?.user.avatar ? (
                <NextImage
                  src={authClient.user.avatar.url}
                  loader={({ src, width }) => getImageUrl(src, width, width)}
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
            <div className="w-auto p-2">
              <h2
                className="text-sm font-semibold text-gray-800"
                data-config-id="auto-txt-23-1"
              >
                {authClient?.user.firstName || "John"}{" "}
                {authClient?.user.lastName || "Doe"}
              </h2>
              <p
                className="text-sm font-medium text-gray-700"
                data-config-id="auto-txt-24-1"
              >
                {authClient?.email}
              </p>
            </div>
          </div>
        </div>
        <div className="w-auto">
          <div className="text-gray-700 hover:text-gray-600">
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-config-id="auto-svg-21-1"
            >
              <path
                d="M16.29 8.71L18.59 11L9.00001 11C8.7348 11 8.48044 11.1054 8.29291 11.2929C8.10537 11.4804 8.00001 11.7348 8.00001 12C8.00001 12.2652 8.10537 12.5196 8.29291 12.7071C8.48044 12.8946 8.7348 13 9.00001 13L18.59 13L16.29 15.29C16.1963 15.383 16.1219 15.4936 16.0711 15.6154C16.0204 15.7373 15.9942 15.868 15.9942 16C15.9942 16.132 16.0204 16.2627 16.0711 16.3846C16.1219 16.5064 16.1963 16.617 16.29 16.71C16.383 16.8037 16.4936 16.8781 16.6154 16.9289C16.7373 16.9797 16.868 17.0058 17 17.0058C17.132 17.0058 17.2627 16.9797 17.3846 16.9289C17.5064 16.8781 17.617 16.8037 17.71 16.71L21.71 12.71C21.8011 12.6149 21.8724 12.5028 21.92 12.38C22.02 12.1365 22.02 11.8635 21.92 11.62C21.8724 11.4972 21.8011 11.3851 21.71 11.29L17.71 7.29C17.6168 7.19676 17.5061 7.1228 17.3843 7.07234C17.2624 7.02188 17.1319 6.99591 17 6.99591C16.8682 6.99591 16.7376 7.02188 16.6158 7.07234C16.4939 7.1228 16.3833 7.19676 16.29 7.29C16.1968 7.38324 16.1228 7.49393 16.0724 7.61575C16.0219 7.73757 15.9959 7.86814 15.9959 8C15.9959 8.13186 16.0219 8.26243 16.0724 8.38425C16.1228 8.50607 16.1968 8.61676 16.29 8.71ZM10 21C10 20.7348 9.89465 20.4804 9.70712 20.2929C9.51958 20.1054 9.26523 20 9.00001 20L5.00001 20C4.73479 20 4.48044 19.8946 4.2929 19.7071C4.10537 19.5196 4.00001 19.2652 4.00001 19L4.00001 5C4.00001 4.73478 4.10537 4.48043 4.2929 4.29289C4.48044 4.10536 4.73479 4 5.00001 4L9.00001 4C9.26523 4 9.51958 3.89464 9.70712 3.70711C9.89466 3.51957 10 3.26522 10 3C10 2.73478 9.89466 2.48043 9.70712 2.29289C9.51958 2.10536 9.26523 2 9.00001 2L5.00001 2C4.20436 2 3.4413 2.31607 2.87869 2.87868C2.31608 3.44129 2.00001 4.20435 2.00001 5L2.00001 19C2.00001 19.7956 2.31608 20.5587 2.87869 21.1213C3.4413 21.6839 4.20436 22 5.00001 22L9.00001 22C9.26523 22 9.51958 21.8946 9.70712 21.7071C9.89465 21.5196 10 21.2652 10 21Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MobileProfile;
