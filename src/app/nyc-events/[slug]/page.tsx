import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryPage } from "@/components/StoryPage";
import { getStories, getStory } from "@/lib/content";
import { sectionInfo } from "@/lib/sections";
import { storyMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStories("nyc-events").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/nyc-events/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const story = getStory("nyc-events", slug);
  return story ? storyMetadata(story, sectionInfo["nyc-events"].name) : {};
}

export default async function Page(props: PageProps<"/nyc-events/[slug]">) {
  const { slug } = await props.params;
  const story = getStory("nyc-events", slug);
  if (!story) notFound();
  return <StoryPage story={story} sectionName={sectionInfo["nyc-events"].name} />;
}
