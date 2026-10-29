import type { Section } from "./schema";

export const sectionInfo: Record<Section, { name: string; kicker: string; title: string; description: string }> = {
  "nyc-events": {
    name: "NYC Events",
    kicker: "Event Coverage",
    title: "Photo and video stories from New York City's cultural events",
    description:
      "Coverage of City-sponsored cultural events, diaspora celebrations and community gatherings across the five boroughs that advance the eight Pillars of Positive Peace.",
  },
  "press-media": {
    name: "Press & Media",
    kicker: "Newsroom",
    title: "Press releases, announcements and media coverage",
    description:
      "Official announcements from ARAC International's community programs, press releases, and coverage of ARAC's Positive Peace and digital literacy work in New York City.",
  },
};
