import type { Metadata } from "next";
import Link from "next/link";
import { PeaceMark } from "@/components/PeaceMark";
import { EmptyState, SectionHeader } from "@/components/SectionHeader";
import { StoryCard } from "@/components/StoryCard";
import { getAllStories, getStories } from "@/lib/content";
import { pillars } from "@/lib/pillars";
import { pageMetadata } from "@/lib/seo";
import { network, site } from "@/lib/site";
import { programs, team } from "@/lib/team";

export const metadata: Metadata = pageMetadata({
  title: `${site.name}: ${site.tagline}`,
  description: site.description,
  path: "/",
});

const mission = [
  {
    n: "01",
    title: "Positive Peace in the City",
    body: "We document cultural awareness events sponsored by the City of New York and community partners, and show how each one reflects the eight Pillars of Positive Peace defined by the Institute for Economics & Peace.",
    href: "/nyc-events",
    cta: "NYC event stories",
  },
  {
    n: "02",
    title: "Media and Digital Literacy for All",
    body: "Through THINK, ARAC offers services and toolkits for critical thinking, digital literacy and AI literacy, and advocates for community tools that leave no neighborhood behind.",
    href: "/digital-literacy",
    cta: "Digital literacy",
  },
  {
    n: "03",
    title: "Diaspora and Community Understanding",
    body: "We cover events within New York's international communities to improve understanding of the social, political and economic issues they face, and to highlight gatherings that build unity and goodwill.",
    href: "/nyc-events",
    cta: "Community coverage",
  },
];

export default function Home() {
  const all = getAllStories();
  const featured = all.find((s) => s.featured) ?? all[0];
  const latest = all.filter((s) => s !== featured).slice(0, 4);
  const press = getStories("press-media").filter((s) => s !== featured).slice(0, 3);
  const programCounts = (Object.keys(programs) as (keyof typeof programs)[]).map((id) => ({
    id,
    name: programs[id].name,
    count: team.filter((p) => p.programs.includes(id)).length,
  }));

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="brand-panel absolute inset-0 opacity-80" aria-hidden="true" />
        <div className="shell relative grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="kicker">ARAC International · Positive Peace in Action</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] text-ink sm:text-6xl">
              Community stories that build Positive Peace in New York City
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2">
              Photo and video coverage of the city&apos;s cultural events and diaspora communities, alongside media and
              digital literacy resources for every neighborhood.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/nyc-events" className="btn btn-solid">Explore NYC Events</Link>
              <a href={network.think.url} className="btn btn-outline">THINK Literacy Toolkits ↗</a>
            </div>
          </div>
          <div className="hidden justify-center lg:flex" aria-hidden="true">
            <PeaceMark size={260} className="opacity-90 drop-shadow-[0_0_60px_rgba(200,169,110,0.25)]" />
          </div>
        </div>
      </section>

      <section className="shell mt-14" aria-labelledby="latest">
        <SectionHeader kicker="Latest" title="From the community" href="/nyc-events" linkLabel="All event stories" />
        {featured ? (
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
            <StoryCard story={featured} variant="lead" priority />
            {latest.length === 0 ? (
              <aside className="flex flex-col justify-center border border-line bg-bg-2 p-7">
                <p className="kicker">Coming next</p>
                <p className="mt-3 font-display text-2xl leading-snug text-ink">Event coverage from across the five boroughs</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-2">
                  Volunteer photographers from the MIND Youth Project and the NY Urban Art Project are preparing the first
                  photo and video stories.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={network.newsletter.url} className="btn btn-solid !py-2 text-xs">Get the newsletter</a>
                  <a href="/feed.xml" className="btn btn-outline !py-2 text-xs">RSS feed</a>
                </div>
              </aside>
            ) : (
              <ul className="space-y-6 lg:border-l lg:border-line lg:pl-8">
                {latest.map((s) => (
                  <li key={s.url} className="border-b border-line pb-6 last:border-0">
                    <StoryCard story={s} variant="compact" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState title="First stories are on the way">
              Volunteer photographers and contributors are preparing coverage of upcoming City-sponsored cultural events.
            </EmptyState>
          </div>
        )}
      </section>

      <section className="shell mt-24" aria-labelledby="mission-heading">
        <SectionHeader kicker="Our Mandate" title="Three commitments" />
        <h2 id="mission-heading" className="sr-only">Mission</h2>
        <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
          {mission.map((m) => (
            <div key={m.n} className="flex flex-col bg-card p-7">
              <span className="font-mono text-sm text-gold">{m.n}</span>
              <h3 className="mt-3 font-display text-2xl leading-snug text-ink">{m.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-2">{m.body}</p>
              <Link href={m.href} className="mt-6 text-sm text-gold hover:text-gold-light">{m.cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="shell mt-24" aria-labelledby="pillars-home">
        <SectionHeader kicker="Framework" title="The eight Pillars of Positive Peace" href="/positive-peace" linkLabel="How we apply them" />
        <h2 id="pillars-home" className="sr-only">Pillars of Positive Peace</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <li key={p.id}>
              <Link href={`/positive-peace#${p.id}`} className="group block h-full border border-line bg-bg-2 p-5 hover:border-gold-dim">
                <span className="font-mono text-xs text-gold-dim">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-display text-lg leading-snug text-ink group-hover:text-gold-light">{p.name}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{p.local}</p>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24 border-y border-line bg-bg-2" aria-labelledby="think-band">
        <div className="shell grid items-center gap-8 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="kicker">THINK by ARAC</p>
            <h2 id="think-band" className="mt-3 font-display text-3xl leading-tight text-ink sm:text-4xl">
              Critical thinking, digital and AI literacy, for every community
            </h2>
            <p className="mt-4 max-w-2xl text-ink-2">
              {network.think.blurb} Workshops, toolkits and guides help residents evaluate sources, recognize
              manipulation and use new technology with confidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <a href={network.think.url} className="btn btn-solid">Visit THINK ↗</a>
            <Link href="/digital-literacy" className="btn btn-outline">Why it matters</Link>
          </div>
        </div>
      </section>

      <section className="shell mt-24" aria-labelledby="programs-heading">
        <SectionHeader kicker="Programs" title="Made by community volunteers" href="/about" linkLabel="Meet the team" />
        <h2 id="programs-heading" className="sr-only">Programs</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {programCounts.map((p) => (
            <Link key={p.id} href={`/about#${p.id}`} className="group border border-line bg-card p-7 hover:border-gold-dim">
              <p className="kicker">Program</p>
              <p className="mt-2 font-display text-2xl text-ink group-hover:text-gold-light">{p.name}</p>
              <p className="mt-2 text-sm text-muted">{p.count} volunteer contributors and photographers</p>
            </Link>
          ))}
        </div>
      </section>

      {press.length ? (
        <section className="shell mt-24" aria-labelledby="press-home">
          <SectionHeader kicker="Newsroom" title="Press & Media" href="/press-media" />
          <h2 id="press-home" className="sr-only">Press and media</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {press.map((s) => (
              <StoryCard key={s.url} story={s} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
