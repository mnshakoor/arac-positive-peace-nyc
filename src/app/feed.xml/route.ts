import { getAllStories } from "@/lib/content";
import { absoluteUrl, site } from "@/lib/site";
import { getPerson } from "@/lib/team";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** RSS 2.0 feed with media:content so readers and aggregators show the cover photo. */
export function GET() {
  const stories = getAllStories().filter((s) => !s.draft).slice(0, 50);
  const items = stories
    .map((s) => {
      const url = absoluteUrl(s.url);
      const author = getPerson(s.author)?.name ?? s.author;
      return `    <item>
      <title>${esc(s.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(s.date).toUTCString()}</pubDate>
      <dc:creator>${esc(author)}</dc:creator>
      <category>${esc(s.category)}</category>
      <description>${esc(s.description)}</description>${
        s.cover ? `\n      <media:content url="${esc(absoluteUrl(s.cover.src))}" medium="image"><media:description>${esc(s.cover.alt)}</media:description></media:content>` : ""
      }
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${absoluteUrl("/")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>${esc(site.description)}</description>
    <language>${site.language}</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
