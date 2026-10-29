import type { Metadata } from "next";
import { SectionIndex } from "@/components/SectionIndex";
import { sectionInfo } from "@/lib/sections";
import { pageMetadata } from "@/lib/seo";

const info = sectionInfo["nyc-events"];

export const metadata: Metadata = pageMetadata({
  title: info.name,
  description: info.description,
  path: "/nyc-events",
});

export default function Page() {
  return <SectionIndex section="nyc-events" />;
}
