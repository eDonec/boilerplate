import { ImageResponse } from "@vercel/og";

import { NextRequest } from "next/server";

import { base64BackgroundPattern } from "../base64BackgroundPattern";
import { base64FallbackImage } from "../base64FallbackImage";

export const config = {
  runtime: "edge",
};
const font = fetch(
  new URL("../../../assets/Alexandria-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const slug = req.url.split("/api/thread/")[1];

  let blog;

  try {
    const res = await fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "http://threads"
          : "https://localhost"
      }:3000/api/v1/threads/thread/${slug}`
    );

    blog = await res.json();
    const title = blog.thread.metaTitle || blog.thread.title;

    const fontSize = title.length > 45 ? 48 : 72;

    const fontData = await font;

    return new ImageResponse(
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
            backgroundImage: `url("${base64BackgroundPattern}")`,
          }}
        >
          <div
            style={{
              color: "#191717",
              height: "300px",
              width: "1000px",
              alignItems: "center",
              display: "flex",
              background: "#f7f6ed",
            }}
          >
            <p
              style={{
                fontFamily: "alexandria",
                fontSize: `${fontSize}px`,
                padding: "20px",
                margin: "auto",
                textAlign: "center",
                fontWeight: 700,
                borderRadius: 8,
                textTransform: "capitalize",
              }}
            >
              {title}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
        </div>
      ),
      {
        width: 1200,
        height: 600,
        fonts: [
          {
            name: "alexandria",
            data: fontData,
            style: "normal",
          },
        ],
      }
    );
  } catch (error) {
    return new ImageResponse(
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
  }
}
