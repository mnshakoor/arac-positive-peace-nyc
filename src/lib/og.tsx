import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * Branded 1200x630 share card for Facebook, LinkedIn, WhatsApp and X. When a
 * story has a JPEG or PNG cover in /public/media, the photo becomes the card
 * background so shares lead with the event image. Other formats (WebP, AVIF)
 * fall back to the typographic card because the renderer cannot decode them.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontFile = (pkg: string, file: string) =>
  fs.readFile(path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files", file));

async function coverDataUrl(src?: string): Promise<string | null> {
  if (!src || !src.startsWith("/media/")) return null;
  const ext = path.extname(src).toLowerCase();
  const mime = ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : null;
  if (!mime) return null;
  try {
    const buf = await fs.readFile(path.join(process.cwd(), "public", src));
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function renderOgImage({ kicker, title, cover }: { kicker: string; title: string; cover?: string }) {
  const [display, mono, photo] = await Promise.all([
    fontFile("playfair-display", "playfair-display-latin-600-normal.woff"),
    fontFile("ibm-plex-mono", "ibm-plex-mono-latin-500-normal.woff"),
    coverDataUrl(cover),
  ]);
  const titleSize = title.length > 80 ? 52 : title.length > 50 ? 62 : 72;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: "#0a0c10" }}>
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", background: "linear-gradient(160deg, #1f2436 0%, #0a0c10 70%)" }}>
            {/* Eight-segment Positive Peace ring, drawn as a large outline motif. */}
            <div
              style={{
                position: "absolute",
                left: 760,
                top: -140,
                width: 560,
                height: 560,
                borderRadius: 560,
                border: "56px dashed rgba(200,169,110,0.28)",
                display: "flex",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 970,
                top: 70,
                width: 140,
                height: 140,
                borderRadius: 140,
                background: "rgba(200,169,110,0.22)",
                display: "flex",
              }}
            />
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: photo
              ? "linear-gradient(180deg, rgba(10,12,16,0.15) 0%, rgba(10,12,16,0.55) 45%, rgba(10,12,16,0.94) 100%)"
              : "transparent",
          }}
        />
        <div style={{ position: "absolute", left: 0, top: 0, width: 1200, height: 8, display: "flex", background: "linear-gradient(90deg, #9a7f52, #c8a96e, #dfc28e)" }} />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "64px 72px", width: "100%" }}>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 22, letterSpacing: 4, color: "#c8a96e", textTransform: "uppercase" }}>
            {kicker}
          </div>
          <div style={{ display: "flex", marginTop: 18, fontFamily: "Display", fontSize: titleSize, lineHeight: 1.1, color: "#eef0f4", maxWidth: 1050 }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 36, gap: 16 }}>
            <div style={{ width: 34, height: 34, borderRadius: 34, border: "6px solid #c8a96e", display: "flex" }} />
            <div style={{ display: "flex", fontFamily: "Mono", fontSize: 22, color: "#dfc28e", letterSpacing: 2 }}>
              ARAC COMMUNITY NYC · community.arac-international.org
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Display", data: display, style: "normal", weight: 600 },
        { name: "Mono", data: mono, style: "normal", weight: 500 },
      ],
    },
  );
}
