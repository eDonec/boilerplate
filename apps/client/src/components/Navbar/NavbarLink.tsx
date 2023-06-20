import React from "react";

import { UnstyledLink } from "core-next-components";
import { clsx } from "core-utils";

import { useRouter } from "next/router";
export interface ILink {
  href: string;
  title: string;
}

interface IProps extends ILink {
  onClick?: () => void;
}

const NavbarLink: React.FC<IProps> = ({ href, title, onClick }) => {
  const router = useRouter();
  const isHome = href === "/";
  const isCurrentPath =
    router.asPath === href || (!isHome && router.asPath.startsWith(href));

  return (
    <li>
      <UnstyledLink
        passHref
        className={clsx(
          "block h-full cursor-pointer p-4 py-4 text-sm hover:text-primary-600 lg:px-0",
          {
            "text-primary-700": isCurrentPath,
            "text-gray-800": !isCurrentPath,
          }
        )}
        href={href}
      >
        <div onClick={onClick}>
          <span
            className={clsx(
              "my-auto cursor-pointer font-bold",
              isCurrentPath && "border-separate border-b-2 border-primary-700"
            )}
          >
            {title}
          </span>
        </div>
      </UnstyledLink>
    </li>
  );
};

export default NavbarLink;
