import { ImageResponse } from "@vercel/og";

import { base64FallbackImage } from "./base64FallbackImage";
export const fallbackImage = new ImageResponse(
  (
    <div
      style={{
        backgroundColor: "#e5e5f7",
        display: "flex",
        height: "100%",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        backgroundSize: "cover",
        backgroundImage: `url("${base64FallbackImage}")`,
      }}
    />
  ),
  {
    width: 1200,
    height: 600,
  }
);
