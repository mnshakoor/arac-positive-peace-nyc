import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getPerson } from "@/lib/team";
import { PeaceMark } from "./PeaceMark";

type Variant = "lead" | "standard" | "compact";

export function StoryMedia({ story, sizes, priority = false }: { story: Story; sizes: string; priority?: boolean }) {
  if (story.cover) {
    return (
      <Image
        src={story.cover.src}
        alt={story.cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }
  return (
    <div className="brand-panel absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <PeaceMark size={72} className="opacity-70" />
    </div>
  );
}

function MediaBadges({ story }: { story: Story }) {
  const badges = [
    story.videos.length ? "Video" : null,
    story.gallery.length ? `${story.gallery.length} Photos` : null,
  ].filter(Boolean);
  if (!badges.length) return null;
  return (
    <div className="absolute bottom-3 left-3 flex gap-2">
      {badges.map((b) => (
        <span key={b} className="bg-bg/85 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-gold-light">
          {b}
        </span>
      ))}
    </div>
  );
}

export function StoryCard({ story, variant = "standard", priority }: { story: Story; variant?: Variant; priority?: boolean }) {
  const author = getPerson(story.author)?.name ?? story.author;
  if (variant === "compact") {
    return (
      <Link href={story.url} className="card-link group flex gap-4">
        <div className="card-media relative aspect-square w-24 shrink-0 overflow-hidden bg-card">
          <StoryMedia story={story} sizes="96px" />
        </div>
        <div>
          <p className="kicker !text-[0.6rem]">{story.category}</p>
          <h3 className="card-title mt-1 font-display text-base leading-snug text-ink transition-colors">{story.title}</h3>
          <p className="mt-1 text-xs text-muted">{formatDate(story.date, { dateStyle: "medium" })}</p>
        </div>
      </Link>
    );
  }
  const lead = variant === "lead";
  return (
    <article>
      <Link href={story.url} className="card-link group block">
        <div className={`card-media relative overflow-hidden bg-card ${lead ? "aspect-[16/9]" : "aspect-[3/2]"}`}>
          <StoryMedia story={story} priority={priority} sizes={lead ? "(min-width: 1024px) 760px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"} />
          <MediaBadges story={story} />
        </div>
        <div className={lead ? "pt-5" : "pt-4"}>
          <p className="kicker">
            {story.category}
            {story.event ? <span className="text-muted"> · {story.event.borough}</span> : null}
          </p>
          <h3
            className={`card-title mt-2 font-display leading-tight text-ink transition-colors ${lead ? "text-3xl sm:text-4xl" : "text-xl"}`}
          >
            {story.title}
          </h3>
          <p className={`mt-3 text-ink-2 ${lead ? "text-base sm:text-lg" : "line-clamp-3 text-sm"}`}>{story.description}</p>
          <p className="mt-3 text-xs text-muted">
            {author} · <time dateTime={story.date}>{formatDate(story.date, { dateStyle: "medium" })}</time>
            {story.draft ? <span className="ml-2 text-gold">DRAFT</span> : null}
          </p>
        </div>
      </Link>
    </article>
  );
}
