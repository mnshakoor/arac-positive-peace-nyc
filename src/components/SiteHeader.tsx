import Link from "next/link";
import { nav, network, site } from "@/lib/site";
import { PeaceMark } from "./PeaceMark";

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/80 sticky top-0 z-40">
      <div className="hidden border-b border-line bg-bg-2 sm:block">
        <div className="shell flex h-8 items-center justify-between font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
          <span>A community media initiative of ARAC International Inc.</span>
          <ul className="flex gap-5">
            <li>
              <a href={network.arac.url} className="hover:text-gold-light">
                {network.arac.label}
              </a>
            </li>
            <li>
              <a href={network.think.url} className="hover:text-gold-light">
                {network.think.label}
              </a>
            </li>
            <li>
              <a href={network.newsletter.url} className="hover:text-gold-light">
                Newsletter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell flex items-center justify-between gap-6 py-3">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <PeaceMark size={34} />
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
              ARAC Community
            </span>
            <span className="block font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold">
              Positive Peace NYC
            </span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm font-medium text-ink-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-gold-light">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a href={network.think.url} className="btn btn-solid hidden !py-2 text-xs sm:inline-flex">
          THINK Toolkits
        </a>
        <details className="relative lg:hidden">
          <summary className="btn btn-outline cursor-pointer list-none !py-2 text-xs [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav
            aria-label="Mobile"
            className="absolute right-0 mt-2 w-64 border border-line-strong bg-card p-2 shadow-2xl"
          >
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block px-3 py-2.5 text-sm text-ink-2 hover:bg-lift hover:text-gold-light">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-line pt-1">
                <a href={network.think.url} className="block px-3 py-2.5 text-sm text-gold hover:bg-lift">
                  THINK Toolkits
                </a>
              </li>
              <li>
                <a href={network.arac.url} className="block px-3 py-2.5 text-sm text-ink-2 hover:bg-lift">
                  ARAC International
                </a>
              </li>
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
