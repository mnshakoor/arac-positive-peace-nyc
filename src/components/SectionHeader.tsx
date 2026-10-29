import Link from "next/link";

export function SectionHeader({
  kicker,
  title,
  href,
  linkLabel = "View all",
  as: As = "h2",
}: {
  kicker?: string;
  title: string;
  href?: string;
  linkLabel?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-line pb-3">
      <div>
        {kicker ? <p className="kicker">{kicker}</p> : null}
        <As className="mt-1 font-display text-2xl text-ink sm:text-3xl">{title}</As>
      </div>
      {href ? (
        <Link href={href} className="shrink-0 text-sm text-gold hover:text-gold-light">
          {linkLabel} →
        </Link>
      ) : null}
    </div>
  );
}

export function PageIntro({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="border-b border-line bg-bg-2">
      <div className="shell py-14 sm:py-20">
        <p className="kicker">{kicker}</p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] text-ink sm:text-5xl">{title}</h1>
        {children ? <div className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-2">{children}</div> : null}
      </div>
    </div>
  );
}

export function EmptyState({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="brand-panel border border-line px-6 py-14 text-center">
      <p className="font-display text-2xl text-ink">{title}</p>
      <div className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-2">{children}</div>
    </div>
  );
}
