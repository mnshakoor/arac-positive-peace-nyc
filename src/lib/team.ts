/**
 * ARAC community media roster. Article frontmatter references people by `slug`
 * (author, photographers, contributors), and the content tests fail if a slug
 * is not listed here, so every credit on the site resolves to a real entry.
 *
 * Names and roles are recorded as supplied by ARAC. Edit here, not in pages.
 */

export type ProgramId = "mind-youth-project" | "ny-urban-art-project";

export const programs: Record<ProgramId, { name: string }> = {
  "mind-youth-project": { name: "ARAC MIND Youth Project" },
  "ny-urban-art-project": { name: "ARAC NY Urban Art Project" },
};

export type TeamGroup = "editorial" | "contributors" | "advocates" | "board";

export const teamGroups: Record<TeamGroup, { label: string }> = {
  editorial: { label: "Editorial and Creative Direction" },
  contributors: { label: "Contributors and Photographers" },
  advocates: { label: "Advocates" },
  board: { label: "Board of Directors" },
};

export type Person = {
  slug: string;
  name: string;
  roles: string[];
  programs: ProgramId[];
  group: TeamGroup;
  boardMember?: boolean;
};

export const team: Person[] = [
  {
    slug: "m-nuri-shakoor",
    name: "M. Nuri Shakoor",
    roles: ["Positive Peace Ambassador", "Data Journalist", "Volunteer Researcher", "Community Educator"],
    programs: [],
    group: "editorial",
  },
  {
    slug: "alla-bevzenko",
    name: "Alla Bevzenko",
    roles: ["Volunteer Photographer", "Creative Director", "Content Creator"],
    programs: [],
    group: "editorial",
  },
  {
    slug: "furaha-moye",
    name: "Furaha Moye",
    roles: ["Volunteer Contributor", "Creative Director", "Board Member"],
    programs: ["ny-urban-art-project", "mind-youth-project"],
    group: "editorial",
    boardMember: true,
  },
  {
    slug: "igor-ktodoma",
    name: "Igor Ktodoma",
    roles: ["Volunteer Content Creator", "Photographer"],
    programs: ["mind-youth-project"],
    group: "contributors",
  },
  {
    slug: "mel-wright",
    name: "Mel Wright",
    roles: ["Volunteer Contributor", "Photographer"],
    programs: ["mind-youth-project"],
    group: "contributors",
  },
  {
    slug: "dez-santana",
    name: "Dez Santana",
    roles: ["Volunteer Contributor", "Photographer"],
    programs: ["mind-youth-project", "ny-urban-art-project"],
    group: "contributors",
  },
  {
    slug: "tomiko-sanchez",
    name: "Tomiko Sanchez",
    roles: ["Volunteer Contributor"],
    programs: ["mind-youth-project", "ny-urban-art-project"],
    group: "contributors",
  },
  {
    slug: "wendell-mike-kennedy",
    name: "Wendell Mike Kennedy",
    roles: ["Volunteer Contributor", "Photographer"],
    programs: ["ny-urban-art-project"],
    group: "contributors",
  },
  {
    slug: "sarkis-kesayev",
    name: "Sarkis Kesayev",
    roles: ["Volunteer Contributor", "Photographer"],
    programs: ["mind-youth-project"],
    group: "contributors",
  },
  {
    slug: "yvette-figueroa",
    name: "Yvette Figueroa",
    roles: ["Volunteer Contributor"],
    programs: ["ny-urban-art-project", "mind-youth-project"],
    group: "contributors",
  },
  {
    slug: "loiba-maria",
    name: "Loiba Maria",
    roles: ["Volunteer Contributor"],
    programs: ["ny-urban-art-project"],
    group: "contributors",
  },
  {
    slug: "millie-carbajal",
    name: "Millie Carbajal",
    roles: ["Volunteer Contributor"],
    programs: ["ny-urban-art-project"],
    group: "contributors",
  },
  {
    slug: "celi-padilla",
    name: "Celi Padilla",
    roles: ["Volunteer Contributor"],
    programs: ["ny-urban-art-project"],
    group: "contributors",
  },
  {
    slug: "quincy-france",
    name: "Quincy France",
    roles: ["Volunteer"],
    programs: ["ny-urban-art-project"],
    group: "contributors",
  },
  {
    slug: "anwar-hafez",
    name: "Anwar Hafez",
    roles: ["Volunteer"],
    programs: ["ny-urban-art-project"],
    group: "contributors",
  },
  {
    slug: "danny-kavadlo",
    name: "Danny Kavadlo",
    roles: ["Advocate"],
    programs: ["ny-urban-art-project"],
    group: "advocates",
  },
  {
    slug: "kevin-suber",
    name: "Kevin Suber",
    roles: ["Advocate", "Board Member"],
    programs: [],
    group: "board",
    boardMember: true,
  },
  {
    slug: "melvin-jackson",
    name: "Melvin Jackson",
    roles: ["Advocate", "Board Member"],
    programs: [],
    group: "board",
    boardMember: true,
  },
  {
    slug: "anthony-whitted",
    name: "Anthony Whitted",
    roles: ["Board Member"],
    programs: [],
    group: "board",
    boardMember: true,
  },
  {
    slug: "kevin-otey",
    name: "Kevin O'tey",
    roles: ["Board Member"],
    programs: [],
    group: "board",
    boardMember: true,
  },
];

const bySlug = new Map(team.map((p) => [p.slug, p]));

export function getPerson(slug: string): Person | undefined {
  return bySlug.get(slug);
}

export function personUrl(slug: string): string {
  return `/about#${slug}`;
}
