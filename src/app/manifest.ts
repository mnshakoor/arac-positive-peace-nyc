import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0c10",
    theme_color: "#0a0c10",
    icons: [
      { src: "/brand/arac-mark-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/arac-mark-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
