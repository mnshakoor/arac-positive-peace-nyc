# ARAC Community NYC

**https://community.arac-international.org** · Community media site of ARAC International Inc.

The site publishes photo and video stories from New York City cultural events, media and digital literacy resources, and coverage of the city's diaspora communities. It serves three commitments:

1. **Positive Peace in the city.** Coverage of cultural awareness events sponsored by the City of New York and community partners, tagged against the eight Pillars of Positive Peace defined by the Institute for Economics & Peace (IEP). This forms part of ARAC's Positive Peace mandate under its IEP Positive Peace Ambassador.
2. **Media and digital literacy for all.** Links into [THINK](https://think.arac-international.org) services and toolkits, and advocacy for community access to them.
3. **Understanding diaspora communities.** Coverage of events within New York's international communities and of gatherings that promote unity and goodwill.

## Site map

| Path | Purpose |
| --- | --- |
| `/` | Front page: lead story, mandate, Pillars, THINK band, programs, newsroom |
| `/nyc-events` and `/nyc-events/<slug>` | Event coverage, photo stories and video |
| `/press-media` and `/press-media/<slug>` | Press releases, announcements, media coverage |
| `/assets` | Media Library: photo collections and video gathered from every story, press kit, usage terms |
| `/positive-peace` | The eight Pillars, with the stories tagged to each |
| `/digital-literacy` | Media, digital and AI literacy, linked to THINK |
| `/about` | Programs (MIND Youth Project, NY Urban Art Project), team roster, editorial standards |
| `/feed.xml`, `/sitemap.xml`, `/robots.txt` | Feeds and crawler files, generated from content |

## Publishing a story

Stories are Markdown files. No database or CMS is required.

1. Copy `content/nyc-events/_template.md` (or `content/press-media/_template.md`) to `content/<section>/<slug>.md`. The slug becomes the URL, so use lowercase words joined by hyphens.
2. Put photos in `public/media/<section>/<slug>/` (see `public/media/README.md` for size, format and privacy rules).
3. Fill in the frontmatter. Credit people by their slug from `src/lib/team.ts`.
4. Run `npm test`. It fails on a missing alt text, an unknown team member, an unknown Pillar, a missing photo file or a bad date.
5. Commit and push. Vercel builds and publishes.

Set `draft: true` to preview a story with `npm run dev` without publishing it. Set `featured: true` to pin it to the front page.

To add or change a team member, edit `src/lib/team.ts`.

## Search and social sharing

Every page is statically generated. What is built in:

- **Metadata:** unique title, description and canonical URL per page; Open Graph and X `summary_large_image` cards; `article:*` tags on stories.
- **Share images:** each story gets a 1200x630 card generated at build time. If the cover is a JPEG or PNG, the card uses the photo with the headline over it.
- **Structured data (JSON-LD):** `NGO` and `WebSite` site-wide; `NewsArticle` with author and photographer credits on every story; `Event` (venue, borough, date, sponsor) when a story has an `event` block; `VideoObject` for embedded video; `ImageObject` with photographer credit and license page on the Media Library; `BreadcrumbList` throughout.
- **Sitemap** with image and video entries; **RSS** with cover images; `robots.txt` that blocks Vercel preview deployments from indexing.
- **Performance:** responsive AVIF and WebP images, self-hosted fonts, no third-party scripts. Share buttons are plain links.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run verify     # lint, typecheck, tests, production build
```

Requires Node 20.9 or later. This project uses Next.js 16; read `AGENTS.md` before changing framework code.

## Deployment (Vercel)

1. Import `mnshakoor/arac-positive-peace-nyc` into Vercel. The framework is detected automatically.
2. Add the domain `community.arac-international.org` to the project. At the DNS host for `arac-international.org`, create a `CNAME` record for `community` pointing to the target Vercel shows (usually `cname.vercel-dns.com`).
3. Optional environment variables:

| Variable | Use |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Override the canonical origin. Defaults to `https://community.arac-international.org` |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag token |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools token |

4. In Google Search Console, add the property, verify it, and submit `https://community.arac-international.org/sitemap.xml`.

## Open items before launch

- **Brand alignment.** The palette and type follow the ARAC and Quanta Analytica family (obsidian and gold, Playfair Display, IBM Plex). They were not checked against the live arac-international.org, which could not be reached during the build. Adjust the tokens in `src/app/globals.css` (`:root` only) if the main site differs.
- **Official logo.** `public/brand/` holds a placeholder eight-segment mark. Replace `arac-mark.svg`, `arac-mark-192.png`, `arac-mark-512.png`, `src/app/icon.svg` and `src/app/apple-icon.png` with the official ARAC logo. Google uses the 512 px file as the organization logo.
- **Social profiles and contact email.** Fill in `site.social` and `site.contactEmail` in `src/lib/site.ts`. Empty values are left out of the footer and structured data.
- **Roster check.** Confirm name spellings in `src/lib/team.ts` (for example Igor Ktodoma, Loiba Maria, Kevin O'tey).
