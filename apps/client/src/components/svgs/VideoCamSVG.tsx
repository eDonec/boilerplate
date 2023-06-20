import * as React from "react";
import { SVGProps } from "react";

const VideoCamSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-test="virtual-visit-icon"
    className="m-1 w-2"
    viewBox="5 5 20 20"
    {...props}
  >
    <path
      d="M18.826 13.187v2.723L23 17.652v-6.26l-4.174 1.795zm0-3.187H7v9.044h11.826V10z"
      stroke="currentColor"
      strokeWidth="2"
      strokeMiterlimit="10"
      fill="currentColor"
    ></path>
  </svg>
);

export default VideoCamSVG;
