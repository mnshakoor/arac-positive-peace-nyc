---
# Copy this file to content/press-media/<slug>.md. The file name becomes the URL:
# content/press-media/community-site-launch.md -> /press-media/community-site-launch
# Files starting with "_" never publish. Run `npm test` to validate before you commit.

title: "Headline, 10 to 110 characters, specific and searchable"
description: "One or two sentences, 50 to 200 characters. This is the Google snippet and the social share text, so name the event, place and community."
date: 2026-11-02                      # Publication date (ISO 8601)
# updated: 2026-11-05                 # Optional: set when the story is materially revised
category: Press Release          # Press Release | Media Coverage | Announcement
author: m-nuri-shakoor                # Slug from src/lib/team.ts
photographers: [alla-bevzenko]        # Slugs from src/lib/team.ts
contributors: []
tags: [festival, queens]
pillars: [acceptance-of-the-rights-of-others, good-relations-with-neighbours]
programs: []                          # mind-youth-project | ny-urban-art-project
featured: false                       # true pins the story to the top of the home page
draft: true                           # Drafts show in `npm run dev` only

# event: optional, same fields as the NYC Events template

# Cover: JPEG or PNG, at least 1600px wide, landscape. Used on cards, in Google results and in share cards.
cover:
  src: /media/press-media/<slug>/cover.jpg
  alt: "Describe what is in the photo for readers who cannot see it"
  caption: "Optional caption."
  credit: "Alla Bevzenko"

gallery:
  - src: /media/press-media/<slug>/01.jpg
    alt: "Describe the photo"
    caption: "Optional caption."
    credit: "Alla Bevzenko"

videos:
  - provider: youtube                 # youtube | vimeo | file
    id: "YOUTUBE_VIDEO_ID"            # for youtube or vimeo
    # src: /media/press-media/<slug>/clip.mp4   # for provider: file
    title: "Video title"
    uploadDate: 2026-11-02
    duration: PT3M20S                 # Optional ISO 8601 duration

sources:
  - label: "Official event listing"
    url: "https://official-listing.example"
---

Lead paragraph: who, what, where, when, in two or three sentences.

## Section heading

Body text in Markdown. Separate what you observed from what you interpret, and link factual claims to their sources.

> A pull quote from someone at the event, attributed in the following sentence.
