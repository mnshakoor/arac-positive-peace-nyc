import type { Metadata } from "next";
import { absoluteUrl, sameAs, site, SITE_URL } from "./site";
import { getPerson, personUrl } from "./team";
import { getPillar } from "./pillars";
import type { Story } from "./content";

/**
 * Metadata and schema.org builders. Pages call `pageMetadata` for title,
 * description, canonical, Open Graph and X cards; story pages add JSON-LD from
 * `storyJsonLd`. Keeping the builders here means Google, Facebook, LinkedIn,
 * WhatsApp and X all receive the same, consistent description of a page.
 */

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  images?: { url: string; alt: string }[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
  noindex?: boolean;
};

export function pageMetadata(input: PageMetaInput): Metadata {
  const url = absoluteUrl(input.path);
  const images = input.images?.map((i) => ({ url: absoluteUrl(i.url), alt: i.alt }));
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url, types: { "application/rss+xml": absoluteUrl("/feed.xml") } },
    openGraph: {
      type: input.type ?? "website",
      url,
      title: input.title,
      description: input.description,
      siteName: site.name,
      locale: site.locale,
      ...(images ? { images } : {}),
      ...(input.type === "article"
        ? {
            publishedTime: input.publishedTime,
            modifiedTime: input.modifiedTime,
            authors: input.authors,
            section: input.section,
            tags: input.tags,
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      ...(site.social.xHandle ? { site: site.social.xHandle, creator: site.social.xHandle } : {}),
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const ORG_ID = `${site.organization.url}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

export function organizationJsonLd() {
  return {
    "@type": "NGO",
    "@id": ORG_ID,
    name: site.organization.name,
    alternateName: "ARAC International",
    url: site.organization.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/brand/arac-mark-512.png"), width: 512, height: 512 },
    sameAs: sameAs(),
    ...(site.contactEmail ? { email: site.contactEmail } : {}),
    areaServed: { "@type": "City", name: "New York City" },
    knowsAbout: [
      "Positive Peace",
      "Media literacy",
      "Digital literacy",
      "AI literacy",
      "Diaspora communities",
      "Community journalism",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: site.name,
    alternateName: site.tagline,
    description: site.description,
    inLanguage: site.language,
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

function personRef(slug: string) {
  const p = getPerson(slug);
  return p
    ? { "@type": "Person", name: p.name, url: absoluteUrl(personUrl(slug)), jobTitle: p.roles[0] }
    : { "@type": "Person", name: slug };
}

export function storyImages(story: Story): string[] {
  const list = [story.cover?.src, ...story.gallery.map((g) => g.src)].filter((s): s is string => Boolean(s));
  return list.length ? list.map((s) => absoluteUrl(s)) : [absoluteUrl(`${story.url}/opengraph-image`)];
}

function videoJsonLd(story: Story) {
  return story.videos.map((v) => {
    const thumb =
      v.thumbnail ??
      (v.provider === "youtube" && v.id ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : story.cover?.src);
    return {
      "@type": "VideoObject",
      name: v.title,
      description: v.description ?? story.description,
      uploadDate: v.uploadDate,
      ...(v.duration ? { duration: v.duration } : {}),
      ...(thumb ? { thumbnailUrl: [absoluteUrl(thumb)] } : {}),
      ...(v.provider === "youtube" && v.id
        ? { embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`, contentUrl: `https://www.youtube.com/watch?v=${v.id}` }
        : v.provider === "vimeo" && v.id
          ? { embedUrl: `https://player.vimeo.com/video/${v.id}` }
          : v.src
            ? { contentUrl: absoluteUrl(v.src) }
            : {}),
    };
  });
}

function eventJsonLd(story: Story) {
  const e = story.event;
  if (!e) return null;
  const isVirtual = e.borough === "Virtual";
  return {
    "@type": "Event",
    name: e.name,
    startDate: e.startDate,
    ...(e.endDate ? { endDate: e.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: isVirtual
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/OfflineEventAttendanceMode",
    location: isVirtual
      ? { "@type": "VirtualLocation", url: e.url ?? absoluteUrl(story.url) }
      : {
          "@type": "Place",
          name: e.venue,
          address: {
            "@type": "PostalAddress",
            ...(e.address ? { streetAddress: e.address } : {}),
            addressLocality: e.borough === "Citywide" ? "New York" : e.borough,
            addressRegion: "NY",
            addressCountry: "US",
          },
        },
    image: storyImages(story),
    description: story.description,
    ...(e.organizer ? { organizer: { "@type": "Organization", name: e.organizer, ...(e.url ? { url: e.url } : {}) } } : {}),
    ...(e.sponsor ? { sponsor: { "@type": "Organization", name: e.sponsor } } : {}),
    ...(e.free ? { isAccessibleForFree: true } : {}),
  };
}

export function storyJsonLd(story: Story, sectionName: string) {
  const article = {
    "@type": story.section === "press-media" && story.category === "Press Release" ? "Article" : "NewsArticle",
    "@id": `${absoluteUrl(story.url)}#article`,
    mainEntityOfPage: absoluteUrl(story.url),
    headline: story.title,
    description: story.description,
    image: storyImages(story),
    datePublished: story.date,
    dateModified: story.updated ?? story.date,
    author: [personRef(story.author)],
    contributor: [...story.photographers, ...story.contributors].map(personRef),
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": SITE_ID },
    articleSection: sectionName,
    inLanguage: site.language,
    keywords: [...story.tags, ...story.pillars.map((p) => getPillar(p).name)].join(", "),
    ...(story.sources.length ? { citation: story.sources.map((s) => s.url) } : {}),
    ...(story.event ? { about: { "@id": `${absoluteUrl(story.url)}#event` } } : {}),
    ...(story.videos.length ? { video: videoJsonLd(story) } : {}),
  };
  const event = eventJsonLd(story);
  return [
    article,
    ...(event ? [{ ...event, "@id": `${absoluteUrl(story.url)}#event` }] : []),
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: sectionName, path: `/${story.section}` },
      { name: story.title, path: story.url },
    ]),
  ];
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/**
 * Story metadata. The share image comes from the colocated opengraph-image
 * route, which composites the cover photo with the headline, so it is not
 * set here (the file convention would override it anyway).
 */
export function storyMetadata(story: Story, sectionName: string): Metadata {
  const author = getPerson(story.author)?.name ?? story.author;
  return pageMetadata({
    title: story.title,
    description: story.description,
    path: story.url,
    type: "article",
    publishedTime: story.date,
    modifiedTime: story.updated ?? story.date,
    authors: [author],
    section: sectionName,
    tags: [...story.tags, ...story.pillars.map((p) => getPillar(p).name)],
    noindex: story.draft,
  });
}
