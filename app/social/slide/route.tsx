import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Public image endpoint: composes a template screenshot onto a branded canvas at
// an Instagram format (default 4:5). The screenshot is *contained* (never cropped).
// Buffer/Instagram fetch these URLs directly.

export const runtime = "nodejs";

const ASPECTS: Record<string, { w: number; h: number }> = {
  "4x5": { w: 1080, h: 1350 },
  "1x1": { w: 1080, h: 1080 },
  "1.91x1": { w: 1080, h: 566 },
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const img = searchParams.get("img") ?? "";
  const title = searchParams.get("title") ?? "Templify";
  const tag = searchParams.get("tag") ?? "";
  const aspect = searchParams.get("aspect") ?? "4x5";
  const { w, h } = ASPECTS[aspect] ?? ASPECTS["4x5"];

  const font = await readFile(
    join(process.cwd(), "public", "fonts", "InstrumentSerif.ttf"),
  );

  const pad = Math.round(w * 0.06);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#161514",
          padding: pad,
          fontFamily: "Instrument Serif",
          position: "relative",
        }}
      >
        {/* soft warm glow */}
        <div
          style={{
            position: "absolute",
            top: -h * 0.25,
            left: w * 0.2,
            width: w * 0.6,
            height: h * 0.5,
            background:
              "radial-gradient(circle, rgba(233,196,106,0.14), rgba(22,21,20,0))",
            display: "flex",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: w * 0.045, color: "#ece7dd", display: "flex" }}>
            Templify
          </div>
          {tag && (
            <div
              style={{ fontSize: w * 0.028, color: "#8a857c", display: "flex" }}
            >
              {tag}
            </div>
          )}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: pad * 0.7,
            marginBottom: pad * 0.7,
          }}
        >
          {img && (
            // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
            <img
              src={img}
              width={w - pad * 2}
              height={aspect === "1.91x1" ? h - pad * 2 - w * 0.16 : h * 0.52}
              style={{
                objectFit: "contain",
                borderRadius: 18,
              }}
            />
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: w * 0.085,
              color: "#ffffff",
              lineHeight: 1,
              display: "flex",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: w * 0.03,
              color: "#e9c46a",
              marginTop: w * 0.02,
              display: "flex",
            }}
          >
            templify.projects.manu-web.de
          </div>
        </div>
      </div>
    ),
    {
      width: w,
      height: h,
      fonts: [{ name: "Instrument Serif", data: font, style: "normal" }],
      headers: {
        "cache-control": "public, max-age=86400, s-maxage=86400",
      },
    },
  );
}
