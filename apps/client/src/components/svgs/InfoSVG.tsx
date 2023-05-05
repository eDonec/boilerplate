import React, { SVGProps } from "react";

const InfoSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg data-test="icon-info" viewBox="0 0 13 13" {...props}>
    <path
      d="M6.5 0A6.5 6.5 0 1 0 13 6.5 6.507 6.507 0 0 0 6.5 0zm0 11.96a5.46 5.46 0 1 1 5.46-5.46 5.466 5.466 0 0 1-5.46 5.46z"
      fill="#667385"
    ></path>
    <path
      d="M5.72 3.12h1.56v1.56H5.72zm0 2.6h1.56v4.42H5.72z"
      fill="#667385"
    ></path>
  </svg>
);

export default InfoSVG;
