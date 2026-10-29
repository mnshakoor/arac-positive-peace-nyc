import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { frontmatterSchema, sections, type Frontmatter, type Section } from "./schema";

/**
 * Markdown story loader. Files live in /content/<section>/<slug>.md.
 * Files whose name begins with "_" are templates and never load.
 * Drafts (draft: true) render in `next dev` only.
 */

export type Story = Frontmatter & {
  section: Section;
  slug: string;
  url: string;
  html: string;
  readingMinutes: number;
};

const CONTENT_DIR = path.join(process.cwd(), "content");
const SHOW_DRAFTS = process.env.NODE_ENV === "development";

export function parseStory(section: Section, slug: string, raw: string): Story {
  const { data, content } = matter(raw);
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n");
    throw new Error(`Invalid frontmatter in content/${section}/${slug}.md\n${issues}`);
  }
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return {
    ...parsed.data,
    section,
    slug,
    url: `/${section}/${slug}`,
    // Content is authored by the ARAC team through reviewed commits, so the
    // Markdown is trusted. Do not route untrusted user input through here.
    html: marked.parse(content, { async: false, gfm: true }),
    readingMinutes: Math.max(1, Math.round(words / 225)),
  };
}

function readSection(section: Section): Story[] {
  const dir = path.join(CONTENT_DIR, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => parseStory(section, f.replace(/\.md$/, ""), fs.readFileSync(path.join(dir, f), "utf8")))
    .filter((s) => SHOW_DRAFTS || !s.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

let cache: Story[] | null = null;

export function getAllStories(): Story[] {
  if (!cache || SHOW_DRAFTS) cache = sections.flatMap(readSection).sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  return cache;
}

export function getStories(section: Section): Story[] {
  return getAllStories().filter((s) => s.section === section);
}

export function getStory(section: Section, slug: string): Story | undefined {
  return getStories(section).find((s) => s.slug === slug);
}

export function getRelated(story: Story, limit = 3): Story[] {
  const score = (s: Story) =>
    s.pillars.filter((p) => story.pillars.includes(p)).length * 2 +
    s.tags.filter((t) => story.tags.includes(t)).length +
    (s.category === story.category ? 1 : 0);
  return getAllStories()
    .filter((s) => s.url !== story.url)
    .map((s) => ({ s, n: score(s) }))
    .sort((a, b) => b.n - a.n || Date.parse(b.s.date) - Date.parse(a.s.date))
    .slice(0, limit)
    .map((x) => x.s);
}

export function shareImage(story: Story): string {
  return story.cover?.src ?? `${story.url}/opengraph-image`;
}
