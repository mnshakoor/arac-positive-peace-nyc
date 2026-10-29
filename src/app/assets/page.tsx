import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { EmptyState, PageIntro, SectionHeader } from "@/components/SectionHeader";
import { getAllStories } from "@/lib/content";
import { breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

const description =
  "Photo stories, video and press assets from ARAC Community NYC coverage of New York City cultural events, with photographer credits and usage terms.";

export const metadata: Metadata = pageMetadata({ title: "Media Library", description, path: "/assets" });

export default function Page() {
  const stories = getAllStories();
  const collections = stories
    .map((s) => ({ story: s, images: [...(s.cover ? [s.cover] : []), ...s.gallery] }))
    .filter((c) => c.images.length);
  const videos = stories.flatMap((s) => s.videos.map((v) => ({ story: s, video: v })));

  const imageNodes = collections.flatMap(({ story, images }) =>
    images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: absoluteUrl(img.src),
      caption: img.caption ?? img.alt,
      ...(img.credit ? { creditText: img.credit, creator: { "@type": "Person", name: img.credit } } : {}),
      copyrightNotice: `© ${img.credit ?? site.organization.name}. Used by ${site.organization.name} with permission.`,
      acquireLicensePage: absoluteUrl("/assets#usage"),
      isPartOf: absoluteUrl(story.url),
    })),
  );

  return (
    <>
      <JsonLd
        data={graph(
          { "@type": "CollectionPage", name: "Media Library", description, url: absoluteUrl("/assets") },
          ...imageNodes,
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Media Library", path: "/assets" },
          ]),
        )}
      />
      <PageIntro kicker="Assets" title="Media Library">
        <p>Photo stories, video and press assets from our coverage, organized by event. Every image carries its photographer credit.</p>
      </PageIntro>

      <section className="shell mt-12" aria-labelledby="photo-collections">
        <SectionHeader kicker="Photography" title="Photo collections" />
        <h2 id="photo-collections" className="sr-only">Photo collections</h2>
        {collections.length ? (
          <div className="mt-8 space-y-14">
            {collections.map(({ story, images }) => (
              <div key={story.url}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link href={story.url} className="font-display text-xl text-ink hover:text-gold-light">{story.title}</Link>
                  <span className="kicker !text-muted">{images.length} photos</span>
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                  {images.map((img) => (
                    <li key={img.src}>
                      <a href={img.src} target="_blank" rel="noopener" className="block">
                        <div className="relative aspect-square overflow-hidden bg-card">
                          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 190px, 45vw" className="object-cover" />
                        </div>
                      </a>
                      {img.credit ? <p className="mt-1 truncate text-[0.7rem] text-muted">Photo: {img.credit}</p> : null}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState title="Collections publish with each story">
              Photo collections appear here automatically when an event story with a cover or gallery is published.
            </EmptyState>
          </div>
        )}
      </section>

      {videos.length ? (
        <section className="shell mt-20" aria-labelledby="video-heading">
          <SectionHeader kicker="Video" title="Video stories" />
          <h2 id="video-heading" className="sr-only">Video stories</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map(({ story, video }) => (
              <li key={`${story.url}-${video.id ?? video.src}`} className="border border-line bg-card p-5">
                <p className="kicker">Video</p>
                <Link href={story.url} className="mt-2 block font-display text-lg text-ink hover:text-gold-light">{video.title}</Link>
                <p className="mt-1 text-xs text-muted">From: {story.title}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="shell mt-20" aria-labelledby="press-kit">
        <SectionHeader kicker="Press" title="Press kit" />
        <h2 id="press-kit" className="sr-only">Press kit</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="flex items-center gap-6 border border-line bg-card p-6">
            <Image src="/brand/arac-mark.svg" alt="ARAC Community NYC eight-segment Positive Peace mark" width={88} height={88} />
            <div>
              <p className="font-display text-lg text-ink">Community mark</p>
              <p className="mt-1 text-sm text-muted">Eight segments, one for each Pillar of Positive Peace.</p>
              <div className="mt-3 flex gap-4 text-sm">
                <a href="/brand/arac-mark.svg" download className="text-gold hover:text-gold-light">SVG</a>
                <a href="/brand/arac-mark-512.png" download className="text-gold hover:text-gold-light">PNG 512</a>
              </div>
            </div>
          </div>
          <div id="usage" className="scroll-mt-28 border border-line bg-card p-6 text-sm leading-relaxed text-ink-2">
            <p className="font-display text-lg text-ink">Usage terms</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Photographs remain the work of the credited volunteer photographer.</li>
              <li>Media outlets may use images for coverage of ARAC programs with visible credit and a link to the story.</li>
              <li>Commercial use or alteration requires written permission from {site.organization.name}.</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
