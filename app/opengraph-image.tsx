import { ImageResponse } from "next/og";

export const alt = "Seltrax — Launch your online store in minutes";
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
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, rgba(43,127,255,0.12) 2px, transparent 0), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.04) 2px, transparent 0)",
          backgroundSize: "100px 100px",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: "#2B7FFF",
            }}
          />
          <span style={{ fontSize: 36, fontWeight: 700 }}>Seltrax</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            <span>Launch your store today,</span>
            <span style={{ color: "#2B7FFF" }}>not next month.</span>
          </div>
          <span style={{ fontSize: 32, color: "#a3a3a3", maxWidth: 900 }}>
            A complete online store — themes, payments, analytics &amp; hosting.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignSelf: "flex-start",
            padding: "14px 28px",
            borderRadius: 999,
            border: "1px solid rgba(43,127,255,0.4)",
            backgroundColor: "rgba(43,127,255,0.08)",
            color: "#2B7FFF",
            fontSize: 30,
            fontWeight: 600,
          }}
        >
          Rs 1,349/mo · everything included
        </div>
      </div>
    ),
    { ...size }
  );
}
