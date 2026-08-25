"use client";

import { useSession } from "@/context/SessionContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isLoading && !user && !pathname.startsWith("/services")) {
      router.push("/login");
    }
  }, [user, isLoading, isMounted, router, pathname]);

  if (!isMounted || isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-600" />
      </div>
    );
  }

  // If not authenticated and not a services route, render nothing while redirecting
  if (!user && !pathname.startsWith("/services")) {
    return null;
  }

  return <>{children}</>;
}
