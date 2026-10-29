import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro, SectionHeader } from "@/components/SectionHeader";
import { StoryCard } from "@/components/StoryCard";
import { getAllStories } from "@/lib/content";
import { breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";
import { network } from "@/lib/site";

const description =
  "ARAC International advocates for media, digital and AI literacy in every New York City community, through THINK services and toolkits and through public access to the tools that make critical thinking possible.";

export const metadata: Metadata = pageMetadata({
  title: "Media, Digital and AI Literacy",
  description,
  path: "/digital-literacy",
});

const commitments = [
  {
    title: "Critical thinking",
    body: "Practical methods for checking a claim, tracing it to its source and separating evidence from assertion.",
  },
  {
    title: "Digital literacy",
    body: "Safe and confident use of devices, accounts and online services, including privacy and scam awareness.",
  },
  {
    title: "AI literacy",
    body: "How generative AI tools work, where they fail, and how to recognize synthetic images, audio and text.",
  },
  {
    title: "Access and advocacy",
    body: "Support for community tools and services, such as connectivity and public technology programs, so access does not depend on neighborhood or language.",
  },
];

export default function Page() {
  const stories = getAllStories().filter(
    (s) => s.category === "Media & Digital Literacy" || s.pillars.includes("free-flow-of-information"),
  );
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Digital Literacy", path: "/digital-literacy" },
          ]),
        )}
      />
      <PageIntro kicker="Free Flow of Information" title="No community left behind in media, digital and AI literacy">
        <p>
          The Free Flow of Information is one of the eight Pillars of Positive Peace. It depends on more than open
          media: residents need the skills to evaluate what they read, watch and share, and the tools to take part
          online. ARAC delivers this work through{" "}
          <a href={network.think.url} className="text-gold-light underline decoration-gold-dim underline-offset-4">
            THINK
          </a>
          .
        </p>
      </PageIntro>

      <section className="shell mt-12" aria-labelledby="focus">
        <h2 id="focus" className="sr-only">Focus areas</h2>
        <div className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {commitments.map((c) => (
            <div key={c.title} className="bg-card p-6">
              <h3 className="font-display text-xl text-ink">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell mt-16">
        <div className="brand-panel flex flex-col items-start justify-between gap-6 border border-line p-8 sm:p-10 md:flex-row md:items-center">
          <div>
            <p className="kicker">THINK by ARAC International</p>
            <p className="mt-2 font-display text-3xl text-ink">Toolkits, workshops and services</p>
            <p className="mt-3 max-w-2xl text-ink-2">{network.think.blurb}</p>
          </div>
          <a href={network.think.url} className="btn btn-solid shrink-0">Go to THINK ↗</a>
        </div>
      </section>

      {stories.length ? (
        <section className="shell mt-20">
          <SectionHeader kicker="Coverage" title="Literacy in the community" />
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <StoryCard key={s.url} story={s} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
