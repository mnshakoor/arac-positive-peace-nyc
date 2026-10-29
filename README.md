# ARAC Community NYC

**https://community.arac-international.org** · the community media site of ARAC International Inc.

Hosted on **GitHub Pages**, the same way as [arac-international.org](https://arac-international.org) (`mnshakoor/arac-international-main`), and styled to match it: cream and sage grounds, charcoal navigation, Cormorant Garamond headlines, DM Sans text, and the ARAC logo.

There is nothing to install and no build step. GitHub Pages turns the files in this repository into the website each time a change is committed, usually within one or two minutes.

## Purpose

1. **Positive Peace in the city.** Promote and cover cultural awareness events sponsored by the City of New York that embody the eight Pillars of Positive Peace (Institute for Economics & Peace), as part of ARAC's Positive Peace Ambassador mandate.
2. **Media and digital literacy.** Advocate for critical thinking, digital and AI literacy through [THINK](https://think.arac-international.org), so no community is left behind.
3. **Diaspora and community understanding.** Cover NYC diaspora events and gatherings that build unity and goodwill.

## Site map

| Address | What it is | Where it comes from |
| --- | --- | --- |
| `/` | Home page | `index.html` |
| `/nyc-events/` | Event stories (photo and video) | one Markdown file per story in `_nyc_events/` |
| `/press-media/` | Press releases, announcements, media coverage | one Markdown file per item in `_press_media/` |
| `/assets/` | Media Library: every story's photos and videos, press kit | built automatically from the stories; photo files live in `assets/` |
| `/positive-peace/` | The eight Pillars, with the stories tagged to each | `positive-peace/index.html` and `_data/pillars.yml` |
| `/about/` | Programs, team roster, editorial standards | `about/index.html` and `_data/team.yml` |
| `/feed.xml`, `/sitemap.xml`, `/robots.txt` | RSS feed and search engine files | generated automatically |

## Publishing a story (in the browser, no software needed)

1. **Upload the photos.** On GitHub, open `assets/nyc-events/`, choose **Add file → Upload files**, and upload into a new folder named after the story, for example `assets/nyc-events/diwali-jackson-heights-2026/`. (To create the folder, type the folder name followed by `/` in the file name box.)
   - Use landscape JPGs about 1600 to 2400 pixels wide and under about 1.5 MB each.
   - Remove GPS location data before uploading, especially for photos of young people.
2. **Create the story.** Open `_templates/nyc-event-story.md`, copy all of it, then go to `_nyc_events/`, choose **Add file → Create new file**, name it `diwali-jackson-heights-2026.md`, and paste.
   - The file name becomes the web address: `community.arac-international.org/nyc-events/diwali-jackson-heights-2026/`
   - Use lowercase words joined by hyphens, no spaces.
3. **Fill in the fields** at the top (title, description, date, photos, event details) and write the story below the second `---` line. Delete optional blocks you do not need.
4. **Commit.** The story appears on the site, the NYC Events page, the home page, the Media Library, the sitemap and the RSS feed in a minute or two.

For press releases and announcements, use `_templates/press-media-item.md`, the `_press_media/` folder, and `assets/press-media/`.

**Good to know**

- **Dates:** a story whose `date` is in the future is hidden until the site is next rebuilt on or after that date. Use the publication date, not the event date.
- **Drafts:** add `published: false` to keep a story off the live site while you work on it.
- **Featured:** add `featured: true` to put a story in the home page hero.
- **Credits:** `author`, `photographers` and `contributors` use the short names (slugs) in `_data/team.yml`, so each credit links to the person on the About page.
- **Video:** put long video on YouTube or Vimeo and paste the video ID. Only short clips belong in the repository.
- **Formatting:** the story body uses Markdown: `## Heading`, `**bold**`, `[link text](https://...)`, `> quote`, and `- list item`.

## Everyday edits

| To change | Edit |
| --- | --- |
| A team member, role or program membership | `_data/team.yml` |
| Program names or descriptions | `_data/programs.yml` |
| Top menu | `_data/nav.yml` |
| Pillar descriptions | `_data/pillars.yml` |
| Site name, description, links to ARAC, THINK, newsletter, donate | `_config.yml` |
| Colors and fonts | the `:root` block at the top of `assets/css/site.css` |
| Header or footer | `_includes/nav.html`, `_includes/footer.html` |

A hand-built HTML page (like the STRATCOM field reports on the main site) can be added as-is: drop it in a folder, for example `nyc-events/special-report/index.html`, and it is published at that address unchanged.

## Search engines and social media

Every page carries a title, description, canonical address, and Open Graph and X (Twitter) card tags, so links shared on Facebook, LinkedIn, WhatsApp and X show a large photo preview. A story's cover photo is its share image; pages without one use the ARAC logo.

For Google, each story also publishes structured data: `NewsArticle` with author and photographer credits, `Event` (venue, borough, date, sponsor) when the story has an event block, `VideoObject` for YouTube video, and breadcrumbs. `sitemap.xml` lists every page with its photos and videos, and `robots.txt` points crawlers to it.

## One-time setup

1. **Turn on GitHub Pages:** repository **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`.
2. **Custom domain:** the `CNAME` file already contains `community.arac-international.org`. At the DNS provider for `arac-international.org`, add a `CNAME` record: name `community`, value `mnshakoor.github.io`. Then in **Settings → Pages**, confirm the custom domain and tick **Enforce HTTPS** once the certificate is issued.
3. **Google Search Console:** add `https://community.arac-international.org` as a property, verify it (the DNS method needs no site change), and submit `https://community.arac-international.org/sitemap.xml`.

## Previewing on your own computer (optional)

```bash
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000. This uses the same Jekyll version as GitHub Pages.
