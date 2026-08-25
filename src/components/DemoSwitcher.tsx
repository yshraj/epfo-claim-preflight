"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { X, Fingerprint } from "lucide-react";
import members from "@/data/mockMembers.json";
import { cn } from "@/lib/cn";

export default function DemoSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!pathname.startsWith("/dashboard") && !pathname.startsWith("/claim")) {
    return null;
  }

  const currentUan = searchParams.get("uan");

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[40]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "text-[10px] font-mono font-medium tracking-widest px-2 py-1 rounded transition-colors uppercase border",
            isOpen 
              ? "bg-slate-900 text-white border-slate-900" 
              : "bg-white/80 text-slate-400 border-slate-200 hover:bg-slate-100 hover:text-slate-600 backdrop-blur-sm"
          )}
          title="Press Cmd+B or Ctrl+B to toggle"
        >
          Prototype Data
        </button>
      </div>

      {isOpen && (
        <div className="fixed bottom-12 right-4 z-50">
          <div className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg shadow-2xl p-4 w-80 max-w-[calc(100vw-2rem)]">
            <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <Fingerprint className="h-4 w-4 text-brand-400" />
                <div className="font-mono text-sm font-semibold tracking-tight text-white">
                  Prototype Controls
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="text-xs text-slate-400 mb-3">
              Select a data scenario to test different user states.
            </div>
            <div className="flex flex-col gap-1.5">
              {members.map((m) => {
                const isActive = m.uan === currentUan;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set("uan", m.uan);
                      router.push(`${pathname}?${params.toString()}`);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "text-left text-xs px-3 py-2.5 rounded-md transition-colors border",
                      isActive 
                        ? "bg-brand-900/50 border-brand-500/50 text-white font-medium shadow-inner" 
                        : "bg-slate-800/50 border-transparent hover:bg-slate-800 text-slate-300 hover:border-slate-600"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-white capitalize">{m.id.replace('-', ' ')}</div>
                      {isActive && <div className="h-1.5 w-1.5 rounded-full bg-brand-500" />}
                    </div>
                    <div className={isActive ? "text-brand-200" : "text-slate-400"}>{m.scenarioLabel}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
