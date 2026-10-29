"use client";

import { useState } from "react";

/**
 * Share links use each platform's public share URL, so no third-party script
 * loads and no reader data leaves the page until they click.
 */
export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "Email", href: `mailto:?subject=${t}&body=${u}` },
  ];

  async function share() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ url, title });
        return;
      } catch {
        // Reader dismissed the sheet; fall through to copy.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this story">
      <span className="kicker mr-1 !text-muted">Share</span>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-line px-2.5 py-1.5 text-xs text-ink-2 hover:border-gold hover:text-gold-light"
        >
          {l.label}
        </a>
      ))}
      <button
        type="button"
        onClick={share}
        className="border border-line px-2.5 py-1.5 text-xs text-ink-2 hover:border-gold hover:text-gold-light"
      >
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}
