export interface NavLink {
  href: string;
  label: string;
}

// Deliberately flat and small — the real EPFO site nests deep,
// audience-organised menus (About/Employee/Employer/Pensioner/...);
// this app intentionally does not replicate that depth.
//
// NOTE: "/services" is added back once src/app/(app)/services exists
// (see the redesign plan, Phase 5) — Next.js prefetches visible Links,
// so pointing at a route that doesn't exist yet surfaces as a 404
// console error in Playwright.
export const marketingNav: NavLink[] = [{ href: "/#how-it-works", label: "How it works" }];

export const appNav: NavLink[] = [{ href: "/dashboard", label: "Dashboard" }];
