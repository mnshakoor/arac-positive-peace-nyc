import { getStories, getStory } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "ARAC Community NYC story";

export function generateStaticParams() {
  return getStories("press-media").map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = getStory("press-media", slug);
  return renderOgImage({
    kicker: story?.event ? `${story.category} · ${story.event.borough}` : (story?.category ?? "ARAC Community NYC"),
    title: story?.title ?? "ARAC Community NYC",
    cover: story?.cover?.src,
  });
}
