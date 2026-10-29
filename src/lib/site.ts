/**
 * Single source of truth for site identity, canonical URLs and network links.
 * Every page, feed, sitemap and JSON-LD block reads from here, so a change to
 * the domain or a social profile is made once.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://community.arac-international.org").replace(/\/$/, "");

export const site = {
  name: "ARAC Community NYC",
  shortName: "ARAC Community",
  tagline: "Positive Peace in New York City",
  description:
    "Photo and video stories from New York City cultural events that build Positive Peace, plus media and digital literacy resources and coverage of the city's diaspora communities. A community media initiative of ARAC International Inc.",
  locale: "en_US",
  language: "en-US",
  organization: {
    name: "ARAC International Inc.",
    legalType: "NGO",
    url: "https://arac-international.org",
  },
  // Leave a profile empty until the account exists. Empty values are omitted
  // from the footer and from Organization.sameAs in structured data.
  social: {
    substack: "https://aracinternational.substack.com",
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    x: "",
    xHandle: "",
  },
  contactEmail: "",
} as const;

export const network = {
  arac: { label: "ARAC International", url: "https://arac-international.org" },
  think: {
    label: "THINK",
    url: "https://think.arac-international.org",
    blurb: "Media, digital and AI literacy services and toolkits from ARAC International.",
  },
  newsletter: {
    label: "Flashpoints & Frameworks",
    url: "https://newsletter.arac-international.org",
  },
  iep: { label: "Institute for Economics & Peace", url: "https://www.economicsandpeace.org" },
  visionOfHumanity: { label: "Vision of Humanity", url: "https://www.visionofhumanity.org" },
} as const;

export const nav = [
  { href: "/nyc-events", label: "NYC Events" },
  { href: "/positive-peace", label: "Positive Peace" },
  { href: "/digital-literacy", label: "Digital Literacy" },
  { href: "/press-media", label: "Press & Media" },
  { href: "/assets", label: "Media Library" },
  { href: "/about", label: "About" },
] as const;

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function sameAs(): string[] {
  const { xHandle, ...profiles } = site.social;
  void xHandle;
  const urls: string[] = [site.organization.url, ...Object.values(profiles)];
  return urls.filter(Boolean);
}
