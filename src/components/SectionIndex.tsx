import { getStories } from "@/lib/content";
import type { Section } from "@/lib/schema";
import { sectionInfo } from "@/lib/sections";
import { breadcrumbJsonLd, graph } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "./JsonLd";
import { EmptyState, PageIntro } from "./SectionHeader";
import { StoryCard } from "./StoryCard";

export function SectionIndex({ section }: { section: Section }) {
  const info = sectionInfo[section];
  const stories = getStories(section);
  const [lead, ...rest] = stories;
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "CollectionPage",
            name: info.name,
            description: info.description,
            url: absoluteUrl(`/${section}`),
            mainEntity: {
              "@type": "ItemList",
              itemListElement: stories.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: absoluteUrl(s.url) })),
            },
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: info.name, path: `/${section}` },
          ]),
        )}
      />
      <PageIntro kicker={info.kicker} title={info.title}>
        <p>{info.description}</p>
      </PageIntro>
      <div className="shell mt-12">
        {lead ? (
          <>
            <StoryCard story={lead} variant="lead" priority />
            {rest.length ? (
              <div className="mt-16 grid gap-x-8 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((s) => (
                  <StoryCard key={s.url} story={s} />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <EmptyState title="First stories are on the way">
            Our volunteer photographers and contributors are preparing the first {info.name.toLowerCase()} stories.
            Follow the RSS feed or subscribe to Flashpoints &amp; Frameworks to be notified when they publish.
          </EmptyState>
        )}
      </div>
    </>
  );
}
