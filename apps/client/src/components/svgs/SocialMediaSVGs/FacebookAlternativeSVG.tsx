import * as React from "react";
import { SVGProps } from "react";

const FacebookAlternativeSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    style={{
      //@ts-expect-error hello
      enableBackground: "new 0 0 24 24",
    }}
    xmlSpace="preserve"
    width={512}
    height={512}
    {...props}
  >
    <path d="M24 12.073c0 5.989-4.394 10.954-10.13 11.855v-8.363h2.789l.531-3.46h-3.32V9.86c0-.947.464-1.869 1.95-1.869h1.509V5.045s-1.37-.234-2.679-.234c-2.734 0-4.52 1.657-4.52 4.656v2.637H7.091v3.46h3.039v8.363C4.395 23.025 0 18.061 0 12.073c0-6.627 5.373-12 12-12s12 5.372 12 12z" />
  </svg>
);

export default FacebookAlternativeSVG;
