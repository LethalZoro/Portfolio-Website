export interface Social {
  label: string;
  url: string;
}

export interface SiteInfo {
  name: string;
  headline: string;
  roles: string[];
  shortBio: string;
  bio: string;
  personalityLine: string;
  email: string;
  phone: string;
  location: string;
  statusLine: string;
  socials: Social[];
  github: string;
  stats: { value: number; suffix: string; label: string }[];
}

export interface ExperienceRole {
  title: string;
  period: string;
  type: string;
}

export interface Experience {
  company: string;
  url: string;
  role: string;
  /** Sub-roles shown nested (e.g. a promotion within the same company). */
  roles?: ExperienceRole[];
  period: string;
  location: string;
  mode: "Remote" | "On-site" | "Hybrid";
  logo?: string;
  bullets: string[];
}

export interface LeadershipRole {
  org: string;
  role: string;
  period: string;
}

export type ProjectCategory = "ai" | "web" | "hardware";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  tech: string[];
  category: ProjectCategory;
  /** Path under /public. Omit to render the generated cover art. */
  image?: string;
  live?: string;
  repo?: string;
  /** true = big showcase card; false = compact "More on GitHub" row. */
  featured: boolean;
}

export interface SkillGroup {
  label: string;
  skills: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  detail: string[];
}

export interface Publication {
  title: string;
  venue: string;
  authors: string;
}

export interface Certification {
  title: string;
  provider: string;
}
