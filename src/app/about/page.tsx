import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/SectionHeader";
import { breadcrumbJsonLd, graph, pageMetadata } from "@/lib/seo";
import { absoluteUrl, network, site } from "@/lib/site";
import { programs, team, teamGroups, type ProgramId, type TeamGroup } from "@/lib/team";

const description =
  "Meet the ARAC International volunteers, photographers, advocates and board members behind ARAC Community NYC, the MIND Youth Project and the NY Urban Art Project.";

export const metadata: Metadata = pageMetadata({ title: "About and Team", description, path: "/about" });

const groupOrder: TeamGroup[] = ["editorial", "contributors", "advocates", "board"];

function initials(name: string) {
  return name
    .replace(/^M\.\s/, "M")
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function Page() {
  const boardMembers = team.filter((p) => p.boardMember);
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "AboutPage",
            url: absoluteUrl("/about"),
            name: "About ARAC Community NYC",
            description,
          },
          ...team.map((p) => ({
            "@type": "Person",
            "@id": absoluteUrl(`/about#${p.slug}`),
            name: p.name,
            jobTitle: p.roles.join(", "),
            affiliation: { "@type": "NGO", name: site.organization.name, url: site.organization.url },
          })),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        )}
      />
      <PageIntro kicker="About" title="A community newsroom for Positive Peace">
        <p>
          {site.name} is the community media site of{" "}
          <a href={network.arac.url} className="text-gold-light underline decoration-gold-dim underline-offset-4">
            ARAC International Inc.
          </a>{" "}
          Volunteer journalists, photographers and educators document the cultural life of New York City, connect it to
          the Pillars of Positive Peace, and promote media and digital literacy through{" "}
          <a href={network.think.url} className="text-gold-light underline decoration-gold-dim underline-offset-4">THINK</a>.
        </p>
      </PageIntro>

      <section className="shell mt-12 grid gap-6 md:grid-cols-2" aria-label="Programs">
        {(Object.keys(programs) as ProgramId[]).map((id) => {
          const members = team.filter((p) => p.programs.includes(id));
          return (
            <div key={id} id={id} className="scroll-mt-28 border border-line bg-card p-7">
              <p className="kicker">Program</p>
              <h2 className="mt-2 font-display text-2xl text-ink">{programs[id].name}</h2>
              <p className="mt-3 text-sm text-muted">Contributors</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{members.map((m) => m.name).join(", ")}</p>
            </div>
          );
        })}
      </section>

      <section id="team" className="shell mt-20 scroll-mt-28" aria-labelledby="team-heading">
        <h2 id="team-heading" className="border-b border-line pb-3 font-display text-3xl text-ink">Our people</h2>
        {groupOrder.map((g) => {
          const people = g === "board" ? boardMembers : team.filter((p) => p.group === g);
          return (
            <div key={g} className="mt-12">
              <h3 className="kicker">{teamGroups[g].label}</h3>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {people.map((p) => (
                  <li
                    key={`${g}-${p.slug}`}
                    id={g === "board" && p.group !== "board" ? undefined : p.slug}
                    className="flex scroll-mt-28 gap-4 border border-line bg-bg-2 p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-dim font-display text-gold-light"
                    >
                      {initials(p.name)}
                    </span>
                    <div>
                      <p className="font-display text-lg leading-snug text-ink">{p.name}</p>
                      <p className="mt-1 text-sm text-ink-2">{p.roles.join(" · ")}</p>
                      {p.programs.length ? (
                        <p className="mt-1 text-xs text-muted">{p.programs.map((id) => programs[id].name).join(", ")}</p>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="shell mt-20">
        <div className="border border-line bg-card p-7 text-sm leading-relaxed text-ink-2">
          <p className="kicker">Editorial standards</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Every photograph is credited to the volunteer who made it.</li>
            <li>Factual claims link to their sources. Coverage separates what was observed from what is interpreted.</li>
            <li>Pillar tags describe how an event connects to Positive Peace. They are not a measurement of peace.</li>
            <li>
              Event coverage does not imply endorsement by, or affiliation with, the City of New York or any agency.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
