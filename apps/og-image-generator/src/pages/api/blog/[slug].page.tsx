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
  const slug = req.url.split("/api/blog/")[1];

  let blog;

  try {
    const res = await fetch(
      `${
        process.env.NODE_ENV === "production"
          ? "http://blogs"
          : "https://localhost"
      }:3000/api/v1/blogs/blogs/${slug}`
    );

    blog = (await res.json()).blog;
    const title = blog.title;
    const image = blog.banner.url.replace("$w", `600`).replace("$h", `500`);

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
              height: "500px",
              maxWidth: "400px",
              alignItems: "center",
              background: "#f7f6ed",
              display: "flex",
            }}
          >
            <p
              style={{
                fontFamily: "alexandria",
                fontSize: `${fontSize}px`,
                padding: "20px",
                textAlign: "left",
                fontWeight: 700,
                borderRadius: 8,
              }}
            >
              {title}
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="avatar"
            src={`https://peaksource.group${image}`}
            height={500}
            width={600}
            style={{
              borderRadius: 8,
              objectFit: "cover",
              maxWidth: "600px",
              height: "500px",
            }}
          />
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
