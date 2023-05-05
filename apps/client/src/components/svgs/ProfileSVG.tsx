import * as React from "react";
import { SVGProps } from "react";

const ProfileSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg className="m-1 w-2" viewBox="0 0 16 16" {...props}>
    <path
      d="M7.99996 8.00002C6.15929 8.00002 4.66663 6.50735 4.66663 4.66669V4.00002C4.66663 2.15935 6.15929 0.666687 7.99996 0.666687C9.84063 0.666687 11.3333 2.15935 11.3333 4.00002V4.66669C11.3333 6.50735 9.84063 8.00002 7.99996 8.00002Z"
      fill="currentColor"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="square"
    ></path>
    <path
      d="M14.6666 13.9387C14.6666 12.7387 13.8686 11.6834 12.7106 11.368C11.448 11.0234 9.72398 10.6667 7.99998 10.6667C6.27598 10.6667 4.55198 11.0234 3.28931 11.368C2.13131 11.6834 1.33331 12.7387 1.33331 13.9387V15.3334H14.6666V13.9387Z"
      fill="currentColor"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeLinecap="square"
    ></path>
  </svg>
);

export default ProfileSVG;
