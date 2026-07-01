import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Mustafa — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#131118",
          color: "#eceaf2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "50%",
            height: "100%",
            display: "flex",
            background:
              "radial-gradient(circle at 70% 40%, rgba(139,92,246,0.25) 0%, transparent 60%)",
          }}
        />
        <div style={{ fontSize: 28, color: "#a78bfa", display: "flex" }}>
          based in Islamabad · working with Sydney
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginTop: 16,
            display: "flex",
          }}
        >
          Muhammad Mustafa
        </div>
        <div style={{ fontSize: 40, color: "#9b95ad", marginTop: 12, display: "flex" }}>
          AI Engineer · LLM agents · vision · voice · silicon
        </div>
      </div>
    ),
    { ...size }
  );
}
