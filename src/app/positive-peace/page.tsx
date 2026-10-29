import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/SectionHeader";
import { StoryCard } from "@/components/StoryCard";
import { getAllStories } from "@/lib/content";
import { pillars } from "@/lib/pillars";
import { breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";
import { network } from "@/lib/site";

const description =
  "How ARAC International applies the Institute for Economics & Peace framework of Positive Peace, the attitudes, institutions and structures that sustain peaceful societies, to community events in New York City.";

export const metadata: Metadata = pageMetadata({
  title: "Positive Peace in New York City",
  description,
  path: "/positive-peace",
});

export default function Page() {
  const stories = getAllStories();
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Positive Peace", path: "/positive-peace" },
          ]),
        )}
      />
      <PageIntro kicker="Framework" title="Positive Peace, applied to the neighborhoods of New York">
        <p>
          The Institute for Economics &amp; Peace (IEP) defines Positive Peace as the attitudes, institutions and
          structures that create and sustain peaceful societies. It is measured through eight interdependent Pillars.
          ARAC&apos;s Positive Peace work is led by M. Nuri Shakoor, an IEP Positive Peace Ambassador, and this site
          applies the framework at the scale of a city: each story is tagged with the Pillars it illustrates.
        </p>
      </PageIntro>

      <div className="shell mt-12 grid gap-12 lg:grid-cols-[1fr_18rem]">
        <ol className="space-y-6">
          {pillars.map((p, i) => {
            const tagged = stories.filter((s) => s.pillars.includes(p.id));
            return (
              <li key={p.id} id={p.id} className="scroll-mt-28 border border-line bg-card p-6 sm:p-8">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-sm text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="font-display text-2xl text-ink sm:text-3xl">{p.name}</h2>
                </div>
                <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <dt className="kicker !text-muted">What it describes</dt>
                    <dd className="mt-2 text-ink-2">{p.summary}</dd>
                  </div>
                  <div>
                    <dt className="kicker !text-muted">What it looks like locally</dt>
                    <dd className="mt-2 text-ink-2">{p.local}</dd>
                  </div>
                </dl>
                {tagged.length ? (
                  <div className="mt-6 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
                    {tagged.slice(0, 4).map((s) => (
                      <StoryCard key={s.url} story={s} variant="compact" />
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="border border-line bg-bg-2 p-5">
            <p className="kicker">Systems view</p>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              IEP treats the Pillars as a system: they reinforce one another, and progress in one tends to depend on the
              others. A single event rarely moves a Pillar on its own. Our coverage records where community activity
              connects to each Pillar; it does not claim to measure peace.
            </p>
          </div>
          <div className="border border-line bg-bg-2 p-5">
            <p className="kicker">Primary sources</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href={network.iep.url} rel="noopener" className="text-gold hover:text-gold-light">{network.iep.label} ↗</a>
              </li>
              <li>
                <a href={network.visionOfHumanity.url} rel="noopener" className="text-gold hover:text-gold-light">
                  Vision of Humanity (IEP research portal) ↗
                </a>
              </li>
            </ul>
          </div>
          <Link href="/nyc-events" className="btn btn-solid w-full justify-center">See event coverage</Link>
        </aside>
      </div>
    </>
  );
}
