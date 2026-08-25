"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Briefcase, AlertTriangle, CheckCircle2, ChevronRight } from "lucide-react";
import { EmploymentDetail } from "@/types/member";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/Button";

function formatMonthYear(dateString: string) {
  if (dateString === "Present") return "Present";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function EmploymentTimeline({ employments }: { employments?: EmploymentDetail[] }) {
  const [selectedEmployment, setSelectedEmployment] = useState<EmploymentDetail | null>(null);

  if (!employments || employments.length === 0) return null;

  // Sort: active first, then by date (mocking this by keeping original order if array is mostly sorted, but let's assume it's sorted)
  
  return (
    <div>
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="divide-y divide-slate-100">
          {employments.map((emp) => (
            <button
              key={emp.id}
              onClick={() => setSelectedEmployment(emp)}
              className="w-full text-left p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group"
            >
              <div className="flex flex-col gap-1">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                  {formatMonthYear(emp.startDate)} — {formatMonthYear(emp.endDate)}
                </div>
                <div className="text-lg font-medium text-slate-900">{emp.employer}</div>
                <div className="flex items-center gap-2 mt-1">
                  {emp.status === "active" ? (
                    <span className="text-xs font-medium px-2 py-0.5 bg-brand-50 text-brand-700 rounded-full border border-brand-100 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Current employer
                    </span>
                  ) : emp.isConsolidated ? (
                    <span className="text-xs font-medium px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200 flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> PF consolidated
                    </span>
                  ) : (
                    <span className="text-xs font-medium px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full border border-amber-100 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" /> Action required
                    </span>
                  )}
                  {emp.status === "active" && (
                    <span className="text-xs font-medium text-slate-500">PF account active</span>
                  )}
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-brand-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <Dialog.Root open={!!selectedEmployment} onOpenChange={(open) => !open && setSelectedEmployment(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-xl rounded-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            
            {selectedEmployment && (
              <>
                <div className="flex flex-col gap-1">
                  <Dialog.Title className="text-xl font-bold text-slate-900">
                    {selectedEmployment.employer}
                  </Dialog.Title>
                  <Dialog.Description className="text-sm text-slate-500">
                    Employment details and PF account status
                  </Dialog.Description>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="flex flex-col gap-1 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Employment</span>
                    <span className="text-sm font-medium text-slate-900">
                      {formatMonthYear(selectedEmployment.startDate)} — {formatMonthYear(selectedEmployment.endDate)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-1 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">Status</span>
                    <span className="text-sm font-medium text-slate-900">
                      {selectedEmployment.status === "active" ? "Current employment" : "Previous employment"}
                    </span>
                  </div>
                  
                  <div className="col-span-2 flex flex-col gap-1 p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-xs text-slate-500 uppercase font-semibold tracking-wider">PF Balance</span>
                    <span className="text-2xl font-display font-bold text-slate-900">
                      ₹{selectedEmployment.pfBalance.toLocaleString("en-IN")}
                    </span>
                    <div className="flex items-center gap-1 mt-1">
                      {selectedEmployment.status === "active" ? (
                        <span className="text-xs text-brand-600 font-medium">Account is active and receiving contributions</span>
                      ) : selectedEmployment.isConsolidated ? (
                        <span className="text-xs text-slate-600 font-medium">Funds have been consolidated</span>
                      ) : (
                        <span className="text-xs text-amber-600 font-medium">Consolidation recommended</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <Dialog.Close className={cn(buttonVariants({ variant: "secondary" }))}>
                    Close
                  </Dialog.Close>
                  {selectedEmployment.status === "previous" && !selectedEmployment.isConsolidated && (
                    <button className={cn(buttonVariants({ variant: "primary" }))}>
                      Start Transfer
                    </button>
                  )}
                </div>
                
                <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
