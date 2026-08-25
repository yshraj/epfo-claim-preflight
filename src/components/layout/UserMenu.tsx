"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LogOut, User } from "lucide-react";
import members from "@/data/mockMembers.json";
import type { MemberProfile } from "@/types/member";

const typedMembers = members as MemberProfile[];

// The app's "session" lives entirely in the ?uan= URL param (see
// src/lib/claimState.ts) — there's no cookie/server session to read in
// a layout. This client leaf reads the URL itself so the rest of the
// shell (Header, Footer) can stay plain server components.
export default function UserMenu() {
  const searchParams = useSearchParams();
  const uan = searchParams.get("uan");
  const member = uan ? typedMembers.find((m) => m.uan === uan) : undefined;

  if (!member) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors"
      >
        Log in
      </Link>
    );
  }

  const initial = member.aadhaarName.charAt(0);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors outline-none">
        <span className="h-7 w-7 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-semibold font-mono">
          {initial}
        </span>
        <span className="hidden sm:inline">{member.aadhaarName.split(" ")[0]}</span>
        <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="min-w-48 rounded-lg border border-slate-200 bg-white shadow-soft p-1 z-50"
        >
          <div className="px-3 py-2 text-xs text-slate-500">
            UAN: <span className="font-mono">{member.uan}</span>
          </div>
          <DropdownMenu.Item asChild>
            <Link
              href={`/dashboard?uan=${member.uan}`}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-50 outline-none cursor-pointer"
            >
              <User className="h-4 w-4" aria-hidden="true" />
              Dashboard
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              href="/login"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-slate-50 outline-none cursor-pointer text-slate-600"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Log out
            </Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
