import type { Metadata } from "next";
import { SectionIndex } from "@/components/SectionIndex";
import { sectionInfo } from "@/lib/sections";
import { pageMetadata } from "@/lib/seo";

const info = sectionInfo["press-media"];

export const metadata: Metadata = pageMetadata({
  title: info.name,
  description: info.description,
  path: "/press-media",
});

export default function Page() {
  return <SectionIndex section="press-media" />;
}
