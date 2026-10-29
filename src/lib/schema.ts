import { z } from "zod";
import { pillarIds } from "./pillars";

/**
 * Frontmatter contract for every story in /content. Validation runs at build
 * time and in the test suite, so a missing alt text, an unknown pillar or a
 * malformed date stops the build instead of reaching readers or crawlers.
 */

export const sections = ["nyc-events", "press-media"] as const;
export type Section = (typeof sections)[number];

export const categories = [
  "Positive Peace",
  "Cultural Heritage",
  "Diaspora Communities",
  "Unity & Goodwill",
  "Media & Digital Literacy",
  "Youth",
  "Urban Art",
  "Press Release",
  "Media Coverage",
  "Announcement",
] as const;
export type Category = (typeof categories)[number];

const isoDate = z
  .union([z.string(), z.date()])
  // YAML parses a bare date (2026-11-02) as UTC midnight. Keep it date-only so
  // it is not shown as the previous evening in New York time.
  .transform((v) => {
    if (!(v instanceof Date)) return v;
    const iso = v.toISOString();
    return iso.endsWith("T00:00:00.000Z") ? iso.slice(0, 10) : iso;
  })
  .refine((v) => !Number.isNaN(Date.parse(v)), "Must be an ISO 8601 date, e.g. 2026-11-02 or 2026-11-02T18:00:00-05:00");

const mediaPath = z
  .string()
  .refine((v) => v.startsWith("/media/") || /^https:\/\//.test(v), "Use a /media/... path or an https URL");

export const imageSchema = z.object({
  src: mediaPath,
  alt: z.string().min(8, "Alt text is required and must describe the image"),
  caption: z.string().optional(),
  credit: z.string().optional(),
});
export type StoryImage = z.infer<typeof imageSchema>;

export const videoSchema = z.object({
  provider: z.enum(["youtube", "vimeo", "file"]),
  id: z.string().optional(),
  src: mediaPath.optional(),
  title: z.string(),
  description: z.string().optional(),
  thumbnail: mediaPath.optional(),
  uploadDate: isoDate,
  duration: z
    .string()
    .regex(/^PT(\d+H)?(\d+M)?(\d+S)?$/, "ISO 8601 duration, e.g. PT3M20S")
    .optional(),
  credit: z.string().optional(),
}).refine((v) => (v.provider === "file" ? Boolean(v.src) : Boolean(v.id)), {
  message: "YouTube and Vimeo videos need `id`; file videos need `src`",
});
export type StoryVideo = z.infer<typeof videoSchema>;

export const eventSchema = z.object({
  name: z.string(),
  startDate: isoDate,
  endDate: isoDate.optional(),
  venue: z.string(),
  address: z.string().optional(),
  borough: z.enum(["Manhattan", "Brooklyn", "Queens", "The Bronx", "Staten Island", "Citywide", "Virtual"]),
  organizer: z.string().optional(),
  sponsor: z.string().optional(),
  url: z.string().url().optional(),
  free: z.boolean().optional(),
});
export type StoryEvent = z.infer<typeof eventSchema>;

export const sourceSchema = z.object({ label: z.string(), url: z.string().url() });

export const frontmatterSchema = z.object({
  title: z.string().min(10).max(110),
  description: z.string().min(50).max(200),
  date: isoDate,
  updated: isoDate.optional(),
  category: z.enum(categories),
  author: z.string(),
  photographers: z.array(z.string()).default([]),
  contributors: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  pillars: z.array(z.enum(pillarIds)).default([]),
  programs: z.array(z.enum(["mind-youth-project", "ny-urban-art-project"])).default([]),
  cover: imageSchema.optional(),
  gallery: z.array(imageSchema).default([]),
  videos: z.array(videoSchema).default([]),
  event: eventSchema.optional(),
  sources: z.array(sourceSchema).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});
export type Frontmatter = z.infer<typeof frontmatterSchema>;
