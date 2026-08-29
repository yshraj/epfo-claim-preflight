import type { TranslationKey } from "@/i18n";

export interface NavLink {
  href: string;
  /** Resolved at render time so nav labels follow the active language. */
  labelKey: TranslationKey;
}

// Deliberately flat and small — the real EPFO site nests deep,
// audience-organised menus (About/Employee/Employer/Pensioner/...);
// this app intentionally does not replicate that depth.
export const marketingNav: NavLink[] = [
  { href: "/#how-it-works", labelKey: "nav.howItWorks" },
  { href: "/services", labelKey: "nav.services" },
];

export const appNav: NavLink[] = [
  { href: "/dashboard", labelKey: "nav.dashboard" },
  { href: "/services", labelKey: "nav.services" },
];
