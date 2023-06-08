import * as React from "react";
import { SVGProps } from "react";
const AppLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      // @ts-expect-error this really is a valid style prop
      enableBackground: "new 0 0 1024 1024",
    }}
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path d="M1047.1 2413.8c-39.4 95.2-111.5 173.8-202.7 222 110.3-19.7 199.9-99.1 234.3-203.5-10.8-5.7-21.3-11.9-31.6-18.5z" />
    <path
      d="M1925.2 543c1.9 0 1.9-3 0-3-2 0-2 3 0 3z"
      style={{
        fill: "#5fa6ed",
      }}
    />
    <path d="M373.3 351.7c0 18.9-15.3 34.2-34.2 34.2-18.9 0-34.2-15.3-34.2-34.2s15.3-34.2 34.2-34.2c18.9 0 34.2 15.3 34.2 34.2zm-241.5-34.2c-18.9 0-34.2 15.3-34.2 34.2s15.3 34.2 34.2 34.2 34.2-15.3 34.2-34.2-15.4-34.2-34.2-34.2zm339-162.8-90.9 41s22.9-23.3 26.3-57.6c0 0-18 37.6-36.7 49.6-18.6 12-50.1 19.8-75 11.8-18.5-6.4-38.4-9.8-59.1-9.8-20.4 0-40.1 3.4-58.4 9.6-.1 0-.2.1-.3.1-25 8.2-56.7.3-75.4-11.7-18.7-12-36.7-49.6-36.7-49.6 3.4 34.2 26.3 57.6 26.3 57.6L0 154.6l111.4 84c49.4 35.8 91.7 80.9 124.1 132.7 32.4-51.9 74.7-97 124.1-132.7l111.2-83.9zM330.5 467.6c-35.3 0-67-15.7-88.4-40.4l-6.7 12.8-6.7-12.8c-21.4 24.8-53.1 40.4-88.4 40.4-28 0-53.7-9.8-73.8-26.2V906c103.5-23.8 194.7-80.8 261.2-159.1 51.8-61 89.4-131.2 89.4-211.2 0-39.8-7.2-86.1-9.1-97.5-20.5 18.3-47.7 29.4-77.5 29.4zM204.1 905.5c95.5 5 183.7-59.1 206-155.5 4.6-19.8 6-39.6 4.7-58.9C372 787.5 296 862.5 204.1 905.5zm319.1-547.6h46.6l12.7-149.5 31.8 149.5h33.3L678 208.7l13.2 149.1h48.7L715.2 141h-63.5l-9.6 48.7c-2.5 12.5-4.8 25.2-7 38.3l-5.4 33.6c-5.1-33.7-12.1-73.9-21-120.7h-62.2l-23.3 217zm255.6 0H828v-98.8h.8l39.8 98.8h52l-39.3-97.8c9.7-5 17.2-12.4 22.3-22.2 5.1-9.8 7.6-20 7.6-30.5 0-20.5-6.7-36.7-20.1-48.6-13.5-11.8-31.8-17.8-55-17.8h-57.3v216.9zm74.3-168c5 4.3 7.6 11.5 7.6 21.6 0 14.8-10.9 22.5-32.7 22.9v-51.5c11.7.3 20 2.7 25.1 7zm-322.2 438h88.2v-50.2h-39V411h-49.2v216.9zm121.5 0h99.9v-46.3h-50.7v-39.5h43.7v-45h-43.7v-40H752V411h-99.6v216.9zm-121.5 270h49.2v-82.5h8.4c23.3 0 41.5-6 54.7-18 13.2-12 19.7-28.5 19.7-49.6 0-20-6.5-36.2-19.5-48.4-13-12.2-30.2-18.4-51.7-18.4h-60.9v216.9zm73.9-169.1c5.1 3.8 7.6 10.4 7.6 19.7 0 8.7-2.6 15-7.9 19-5.3 4-13.4 6.1-24.4 6.3v-51.2c11.4.3 19.6 2.3 24.7 6.2zm136.3 174.8c20.1 0 36.8-6.1 49.9-18.4 13.1-12.3 19.7-27.8 19.7-46.5 0-16-5-30.1-15-42.3-10-12.2-19.9-21.6-29.6-28.3-16.4-11.4-24.5-21.6-24.5-30.7 0-5.2 1.8-9.3 5.3-12.3s8.3-4.5 14.4-4.5c9.1 0 21 4 35.6 12V684c-13.6-6-27.4-8.9-41.3-8.9-18.7 0-34 5.9-45.8 17.7-11.8 11.8-17.7 27.1-17.7 45.8 0 13.8 3.8 26.2 11.5 37.4 7.6 11.2 20 23.3 37 36.3 7 5.4 12 10 14.9 13.8 2.9 3.8 4.3 7.9 4.3 12.2 0 5.6-1.8 10.2-5.4 13.6-3.6 3.4-8.4 5.1-14.6 5.1-10.6 0-23.7-4.5-39.3-13.6v50.5c13.2 6.5 26.8 9.7 40.6 9.7zm141.5-103.8v98.1h49.9v-98.1l58.2-118.7h-56.5c-12 30.8-20.8 54.8-26.3 72.1h-.7c-5.5-16.9-14.4-40.9-26.6-72.1h-55.2l57.2 118.7z" />
  </svg>
);

export default AppLogo;