import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zidi — Learn the language. Keep the connection.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#142A20",
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(192, 138, 46, 0.15) 0%, transparent 65%), radial-gradient(circle at 85% 80%, rgba(184, 80, 48, 0.1) 0%, transparent 50%)",
          color: "#FAF7F2",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            border: "1px solid rgba(250, 247, 242, 0.12)",
            borderRadius: 24,
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 110,
              height: 120,
              marginBottom: 16,
            }}
          >
            <svg viewBox="0 0 28 34" width="110" height="120" fill="none">
              <path
                d="M10.5 6.4 17.6 1.6"
                stroke="#C08A2E"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 9.6c-6.075 0-11 4.925-11 11V33h22V20.6c0-6.075-4.925-11-11-11Zm0 5.4a5.6 5.6 0 0 0-5.6 5.6V33h11.2V20.6A5.6 5.6 0 0 0 14 15Z"
                fill="#FAF7F2"
              />
            </svg>
          </div>

          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#FAF7F2",
              display: "flex",
              alignItems: "center",
            }}
          >
            Zidi
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "#FAF7F2",
              letterSpacing: "-0.01em",
              display: "flex",
              gap: 10,
            }}
          >
            <span>Learn the language.</span>
            <span style={{ color: "#C08A2E", fontStyle: "italic" }}>
              Keep the connection.
            </span>
          </div>

          <div
            style={{
              fontSize: 20,
              color: "rgba(250, 247, 242, 0.7)",
              marginTop: 6,
              letterSpacing: "0.02em",
            }}
          >
            Live Yorùbá & Igbo lessons online · Hand-matched tutors
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 44,
            display: "flex",
            alignItems: "center",
            gap: 8,
            backgroundColor: "rgba(250, 247, 242, 0.08)",
            padding: "8px 20px",
            borderRadius: 100,
            border: "1px solid rgba(250, 247, 242, 0.15)",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: "#C08A2E",
            textTransform: "uppercase",
          }}
        >
          learnwithzidi.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
