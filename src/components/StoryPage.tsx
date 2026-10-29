import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/content";
import { getRelated } from "@/lib/content";
import { formatDate, formatEventWhen } from "@/lib/format";
import { getPillar } from "@/lib/pillars";
import { graph, storyJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { getPerson, personUrl, programs } from "@/lib/team";
import { JsonLd } from "./JsonLd";
import { Gallery, VideoEmbed } from "./Media";
import { ShareBar } from "./ShareBar";
import { StoryCard } from "./StoryCard";

function Credit({ slug }: { slug: string }) {
  const p = getPerson(slug);
  return p ? (
    <Link href={personUrl(slug)} className="text-ink hover:text-gold-light">
      {p.name}
    </Link>
  ) : (
    <span className="text-ink">{slug}</span>
  );
}

function CreditList({ slugs }: { slugs: string[] }) {
  return (
    <>
      {slugs.map((s, i) => (
        <span key={s}>
          {i > 0 ? ", " : ""}
          <Credit slug={s} />
        </span>
      ))}
    </>
  );
}

export function StoryPage({ story, sectionName }: { story: Story; sectionName: string }) {
  const related = getRelated(story);
  const url = absoluteUrl(story.url);
  return (
    <article>
      <JsonLd data={graph(...storyJsonLd(story, sectionName))} />

      <header className="shell pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb" className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
          <Link href="/" className="hover:text-gold-light">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/${story.section}`} className="hover:text-gold-light">{sectionName}</Link>
        </nav>
        <div className="mx-auto max-w-3xl">
          <p className="kicker mt-8">{story.category}</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.12] text-ink sm:text-5xl">{story.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-2 sm:text-xl">{story.description}</p>
          <div className="mt-6 flex flex-col gap-1 border-y border-line py-4 text-sm text-muted">
            <p>
              By <Credit slug={story.author} />
              {story.photographers.length ? (
                <>
                  {" "}· Photography by <CreditList slugs={story.photographers} />
                </>
              ) : null}
            </p>
            <p>
              <time dateTime={story.date}>{formatDate(story.date)}</time>
              {story.updated ? (
                <>
                  {" "}· Updated <time dateTime={story.updated}>{formatDate(story.updated)}</time>
                </>
              ) : null}
              {" "}· {story.readingMinutes} min read
              {story.draft ? <span className="ml-2 text-gold">DRAFT: not published</span> : null}
            </p>
          </div>
        </div>
      </header>

      {story.cover ? (
        <figure className="shell mt-8">
          <div className="relative mx-auto aspect-[16/9] max-w-5xl overflow-hidden bg-card">
            <Image src={story.cover.src} alt={story.cover.alt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
          {story.cover.caption || story.cover.credit ? (
            <figcaption className="mx-auto mt-2 max-w-5xl text-sm text-muted">
              {story.cover.caption ? <span className="text-ink-2">{story.cover.caption} </span> : null}
              {story.cover.credit ? <span>Photo: {story.cover.credit}</span> : null}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className="shell">
        <div className="mx-auto max-w-3xl">
          <div className="mt-8">
            <ShareBar url={url} title={story.title} />
          </div>

          {story.event ? (
            <aside className="mt-8 border border-line bg-card p-5" aria-label="Event details">
              <p className="kicker">Event</p>
              <p className="mt-2 font-display text-xl text-ink">{story.event.name}</p>
              <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
                <dt className="text-muted">When</dt>
                <dd className="text-ink-2">{formatEventWhen(story.event.startDate, story.event.endDate)}</dd>
                <dt className="text-muted">Where</dt>
                <dd className="text-ink-2">
                  {story.event.venue}
                  {story.event.address ? `, ${story.event.address}` : ""} ({story.event.borough})
                </dd>
                {story.event.organizer ? (
                  <>
                    <dt className="text-muted">Organizer</dt>
                    <dd className="text-ink-2">{story.event.organizer}</dd>
                  </>
                ) : null}
                {story.event.sponsor ? (
                  <>
                    <dt className="text-muted">Sponsor</dt>
                    <dd className="text-ink-2">{story.event.sponsor}</dd>
                  </>
                ) : null}
                {story.event.free ? (
                  <>
                    <dt className="text-muted">Admission</dt>
                    <dd className="text-ink-2">Free</dd>
                  </>
                ) : null}
              </dl>
              {story.event.url ? (
                <a href={story.event.url} rel="noopener" className="mt-4 inline-block text-sm text-gold hover:text-gold-light">
                  Official event listing →
                </a>
              ) : null}
            </aside>
          ) : null}

          {story.videos.length ? (
            <div className="mt-10 space-y-8">
              {story.videos.map((v) => (
                <VideoEmbed key={v.id ?? v.src} video={v} />
              ))}
            </div>
          ) : null}

          <div className="prose-story mt-10" dangerouslySetInnerHTML={{ __html: story.html }} />

          <Gallery images={story.gallery} title={story.title} />

          {story.pillars.length ? (
            <section className="mt-14 border-t border-line pt-8" aria-labelledby="pillars-heading">
              <h2 id="pillars-heading" className="kicker">Pillars of Positive Peace in this story</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {story.pillars.map((id) => (
                  <li key={id}>
                    <Link
                      href={`/positive-peace#${id}`}
                      className="inline-block border border-gold-dim/60 px-3 py-1.5 text-xs text-gold-light hover:bg-gold/10"
                    >
                      {getPillar(id).name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {story.sources.length ? (
            <section className="mt-10" aria-labelledby="sources-heading">
              <h2 id="sources-heading" className="kicker">Sources</h2>
              <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-ink-2">
                {story.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} rel="noopener" className="underline decoration-gold-dim underline-offset-2 hover:text-gold-light">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {story.contributors.length || story.programs.length ? (
            <p className="mt-10 text-sm text-muted">
              {story.contributors.length ? (
                <>
                  Contributors: <CreditList slugs={story.contributors} />.{" "}
                </>
              ) : null}
              {story.programs.length ? <>Produced with {story.programs.map((p) => programs[p].name).join(" and ")}.</> : null}
            </p>
          ) : null}

          <div className="mt-10 border-t border-line pt-6">
            <ShareBar url={url} title={story.title} />
          </div>
        </div>
      </div>

      {related.length ? (
        <section className="shell mt-20" aria-labelledby="related-heading">
          <h2 id="related-heading" className="border-b border-line pb-3 font-display text-2xl text-ink">More from the community</h2>
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((s) => (
              <StoryCard key={s.url} story={s} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
