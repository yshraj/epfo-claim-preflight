export interface NavLink {
  href: string;
  label: string;
}

// Deliberately flat and small — the real EPFO site nests deep,
// audience-organised menus (About/Employee/Employer/Pensioner/...);
// this app intentionally does not replicate that depth.
export const marketingNav: NavLink[] = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/services", label: "Services" },
];

export const appNav: NavLink[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/services", label: "Services" },
];
