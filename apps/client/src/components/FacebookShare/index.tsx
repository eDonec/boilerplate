import React, { useEffect, useState } from "react";

const FACEBOOK_SHARE_BASE_URL = "https://www.facebook.com/sharer.php?u=";
const FacebookShare = () => {
  const [currentUrl, setCurrentUrl] = useState("https://www.edonec.com/");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);
  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    window.open(
      `${FACEBOOK_SHARE_BASE_URL}${currentUrl}`,
      "popup",
      "width=600,height=500,menubar=no,location=no,resizable=true,scrollbars=yes,status=yes"
    );

    return false;
  };

  return (
    <a
      aria-label="Partager sur Facebook"
      className="ease mb-1 mr-1 inline-flex h-10 max-w-[13rem] items-center rounded-full border-2 border-gray-100 bg-gray-100 px-2 py-1 text-xs font-bold text-gray-800 shadow-lg transition duration-200 hover:border-gray-300 hover:bg-gray-300 md:text-sm"
      rel="noopener"
      href={`${FACEBOOK_SHARE_BASE_URL}${currentUrl}`}
      onClick={handleClick}
    >
      <svg
        aria-hidden="true"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="h-4 w-4"
      >
        <title>Facebook</title>
        <path d="M379 22v75h-44c-36 0-42 17-42 41v54h84l-12 85h-72v217h-88V277h-72v-85h72v-62c0-72 45-112 109-112 31 0 58 3 65 4z"></path>
      </svg>
      <span className="ml-1">
        Partager <span className="hidden sm:inline-block">sur Facebook</span>
      </span>
    </a>
  );
};

export default FacebookShare;
