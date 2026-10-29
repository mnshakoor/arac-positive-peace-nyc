import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "ARAC Community NYC: Positive Peace in New York City";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: "Positive Peace · Digital Literacy · Diaspora NYC",
    title: "Community stories that build Positive Peace in New York City",
  });
}
