import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseStory } from "@/lib/content";
import { sections } from "@/lib/schema";
import { getPerson, team } from "@/lib/team";
import { storyJsonLd } from "@/lib/seo";

const root = path.join(process.cwd(), "content");

const files = sections.flatMap((section) =>
  fs
    .readdirSync(path.join(root, section))
    .filter((f) => f.endsWith(".md"))
    .map((f) => ({ section, file: f, raw: fs.readFileSync(path.join(root, section, f), "utf8") })),
);

describe("content", () => {
  it.each(files.filter((f) => !f.file.startsWith("_")))("$section/$file is valid", ({ section, file, raw }) => {
    const slug = file.replace(/\.md$/, "");
    expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    const story = parseStory(section, slug, raw);
    for (const s of [story.author, ...story.photographers, ...story.contributors]) {
      expect(getPerson(s), `unknown team slug "${s}"`).toBeDefined();
    }
    for (const img of [...(story.cover ? [story.cover] : []), ...story.gallery]) {
      if (img.src.startsWith("/media/")) {
        expect(fs.existsSync(path.join(process.cwd(), "public", img.src)), `missing file public${img.src}`).toBe(true);
      }
    }
  });

  it("templates parse once placeholders are filled", () => {
    for (const f of files.filter((x) => x.file.startsWith("_"))) {
      expect(() => parseStory(f.section, "template", f.raw)).not.toThrow();
    }
  });

  it("rejects an image without alt text", () => {
    const raw = `---\ntitle: "A sufficiently long headline"\ndescription: "${"x".repeat(60)}"\ndate: 2026-11-01\ncategory: Youth\nauthor: m-nuri-shakoor\ncover:\n  src: /media/a.jpg\n  alt: ""\n---\nBody`;
    expect(() => parseStory("nyc-events", "bad", raw)).toThrow(/cover.alt/);
  });
});

describe("team", () => {
  it("has unique slugs", () => {
    expect(new Set(team.map((p) => p.slug)).size).toBe(team.length);
  });
});

describe("structured data", () => {
  it("emits NewsArticle, Event and BreadcrumbList for an event story", () => {
    const raw = `---\ntitle: "Lunar New Year parade in Flushing"\ndescription: "${"x".repeat(60)}"\ndate: 2026-02-20\ncategory: Cultural Heritage\nauthor: m-nuri-shakoor\nevent:\n  name: Parade\n  startDate: 2026-02-21T11:00:00-05:00\n  venue: Main Street\n  borough: Queens\n---\nBody`;
    const nodes = storyJsonLd(parseStory("nyc-events", "lny", raw), "NYC Events") as { "@type": string }[];
    expect(nodes.map((n) => n["@type"])).toEqual(["NewsArticle", "Event", "BreadcrumbList"]);
    expect(JSON.stringify(nodes)).toContain("https://community.arac-international.org/nyc-events/lny");
  });
});
