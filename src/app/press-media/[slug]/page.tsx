import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryPage } from "@/components/StoryPage";
import { getStories, getStory } from "@/lib/content";
import { sectionInfo } from "@/lib/sections";
import { storyMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getStories("press-media").map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/press-media/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const story = getStory("press-media", slug);
  return story ? storyMetadata(story, sectionInfo["press-media"].name) : {};
}

export default async function Page(props: PageProps<"/press-media/[slug]">) {
  const { slug } = await props.params;
  const story = getStory("press-media", slug);
  if (!story) notFound();
  return <StoryPage story={story} sectionName={sectionInfo["press-media"].name} />;
}
