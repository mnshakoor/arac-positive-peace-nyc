import Link from "next/link";
import { nav, network, site } from "@/lib/site";
import { PeaceMark } from "./PeaceMark";

const socialLabels: Record<string, string> = {
  substack: "Substack",
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  x: "X",
};

export function SiteFooter() {
  const socials = Object.entries(site.social).filter(([k, v]) => k in socialLabels && v);
  return (
    <footer className="mt-24 border-t border-line bg-bg-2">
      <div className="rule-gold" />
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <PeaceMark size={30} />
            <span className="font-display text-lg text-ink">{site.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{site.description}</p>
        </div>
        <div>
          <h2 className="kicker">Sections</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-gold-light">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="kicker">ARAC Network</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-2">
            <li>
              <a href={network.arac.url} className="hover:text-gold-light">ARAC International</a>
            </li>
            <li>
              <a href={network.think.url} className="hover:text-gold-light">THINK: Media and Digital Literacy</a>
            </li>
            <li>
              <a href={network.newsletter.url} className="hover:text-gold-light">Flashpoints &amp; Frameworks</a>
            </li>
            <li>
              <a href="/feed.xml" className="hover:text-gold-light">RSS Feed</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="kicker">Positive Peace</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink-2">
            <li>
              <a href={network.iep.url} rel="noopener" className="hover:text-gold-light">{network.iep.label}</a>
            </li>
            <li>
              <a href={network.visionOfHumanity.url} rel="noopener" className="hover:text-gold-light">
                {network.visionOfHumanity.label}
              </a>
            </li>
            {socials.map(([k, v]) => (
              <li key={k}>
                <a href={v} rel="me noopener" className="hover:text-gold-light">{socialLabels[k]}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-col gap-3 py-6 text-xs leading-relaxed text-muted md:flex-row md:justify-between">
          <p className="max-w-3xl">
            Event coverage describes cultural programs sponsored by the City of New York and community partners.
            ARAC International Inc. is an independent nonprofit; coverage does not imply endorsement by, or
            affiliation with, any City agency. Photographs are credited to the volunteer who made them and may not be
            reused without permission.
          </p>
          <p className="shrink-0">© {new Date().getFullYear()} {site.organization.name}</p>
        </div>
      </div>
    </footer>
  );
}
