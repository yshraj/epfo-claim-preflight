"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LogOut, User, Settings, Shield, FileText, Bell } from "lucide-react";
import { useSession } from "@/context/SessionContext";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import Button from "@/components/ui/Button";

export default function UserMenu() {
  const { user, logout } = useSession();
  const router = useRouter();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors"
      >
        Log in
      </Link>
    );
  }

  const initial = user.aadhaarName.charAt(0);
  const formattedUan = `${user.uan.slice(0, 4)} ${user.uan.slice(4, 8)} ${user.uan.slice(8, 12)}`;

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    router.push("/login");
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <Link href="/dashboard/activity" className="relative text-slate-500 hover:text-slate-700 transition-colors">
          <Bell className="h-5 w-5" />
          {user.notifications.some(n => !n.read) && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
          )}
        </Link>
        
        {/* User Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-brand-700 transition-colors outline-none group">
            <span className="h-8 w-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-semibold font-mono ring-2 ring-transparent group-hover:ring-brand-200 transition-all">
              {initial}
            </span>
            <span className="hidden sm:inline">{user.aadhaarName.split(" ")[0]}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:text-brand-500 transition-colors" aria-hidden="true" />
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="w-64 rounded-xl border border-slate-200 bg-white shadow-xl p-1 z-50 animate-in fade-in slide-in-from-top-2"
            >
              <div className="px-3 py-3 border-b border-slate-100 mb-1">
                <div className="font-semibold text-slate-900 truncate">{user.aadhaarName}</div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">UAN: {formattedUan}</div>
              </div>
              
              <DropdownMenu.Item asChild>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-slate-50 outline-none cursor-pointer text-slate-700"
                >
                  <User className="h-4 w-4 text-slate-400" />
                  Dashboard
                </Link>
              </DropdownMenu.Item>
              
              <DropdownMenu.Item asChild>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-slate-50 outline-none cursor-pointer text-slate-700"
                >
                  <Settings className="h-4 w-4 text-slate-400" />
                  Profile Settings
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <Link
                  href="/dashboard/documents"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-slate-50 outline-none cursor-pointer text-slate-700"
                >
                  <FileText className="h-4 w-4 text-slate-400" />
                  Document Center
                </Link>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <Link
                  href="/dashboard/security"
                  className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-slate-50 outline-none cursor-pointer text-slate-700"
                >
                  <Shield className="h-4 w-4 text-slate-400" />
                  Security
                </Link>
              </DropdownMenu.Item>
              
              <div className="h-px bg-slate-100 my-1 mx-2" />
              
              <DropdownMenu.Item asChild>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg hover:bg-red-50 outline-none cursor-pointer text-red-600 font-medium"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Log out of EPF Account?</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You will need to authenticate again to access your claims and documents.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex-row gap-2 justify-end">
            <Button variant="secondary" onClick={() => setShowLogoutConfirm(false)}>
              Cancel
            </Button>
            <Button variant="primary" className="bg-red-600 hover:bg-red-700 text-white" onClick={handleLogout}>
              Log out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
