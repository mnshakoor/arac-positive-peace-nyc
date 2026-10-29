import type { MetadataRoute } from "next";
import { getAllStories } from "@/lib/content";
import { storyImages } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const stories = getAllStories().filter((s) => !s.draft);
  const newest = stories[0]?.updated ?? stories[0]?.date ?? new Date().toISOString();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: newest, changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/nyc-events"), lastModified: newest, changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/press-media"), lastModified: newest, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/assets"), lastModified: newest, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/positive-peace"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/digital-literacy"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
  ];
  return [
    ...staticRoutes,
    ...stories.map((s) => ({
      url: absoluteUrl(s.url),
      lastModified: s.updated ?? s.date,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: storyImages(s),
      ...(s.videos.length
        ? {
            videos: s.videos
              .filter((v) => v.thumbnail || (v.provider === "youtube" && v.id) || s.cover)
              .map((v) => ({
                title: v.title,
                description: v.description ?? s.description,
                thumbnail_loc: absoluteUrl(
                  v.thumbnail ?? (v.provider === "youtube" ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : s.cover!.src),
                ),
                ...(v.provider === "youtube"
                  ? { player_loc: `https://www.youtube-nocookie.com/embed/${v.id}` }
                  : v.provider === "vimeo"
                    ? { player_loc: `https://player.vimeo.com/video/${v.id}` }
                    : { content_loc: absoluteUrl(v.src!) }),
                publication_date: v.uploadDate,
              })),
          }
        : {}),
    })),
  ];
}
