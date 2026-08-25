"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { NavLink } from "./NavLinks";

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close on navigation.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-slate-100 outline-none"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" aria-hidden="true" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 z-40 md:hidden" />
        <Dialog.Content className="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white z-50 shadow-soft p-6 md:hidden flex flex-col gap-1">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="font-display font-bold text-lg">Menu</Dialog.Title>
            <Dialog.Close
              className="inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-slate-100 outline-none"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </div>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-3 text-sm font-medium rounded-lg hover:bg-slate-50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/login"
            className="px-3 py-3 text-sm font-medium rounded-lg hover:bg-slate-50 text-brand-700"
          >
            Log in
          </Link>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
