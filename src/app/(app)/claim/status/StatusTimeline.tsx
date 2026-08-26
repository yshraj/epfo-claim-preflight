"use client";

import { CheckCircle2, CircleDashed, XCircle } from "lucide-react";
import type { ClaimRecord } from "@/types/account";

type StageStatus = "complete" | "current" | "pending" | "failed";
type Stage = { title: string; date: string; status: StageStatus };

const DEFAULT_STAGES: Stage[] = [
  { title: "Claim submitted", date: "18 Aug 2026", status: "complete" },
  { title: "Documents verified", date: "19 Aug 2026", status: "complete" },
  { title: "Regional processing", date: "In progress", status: "current" },
  { title: "Settlement approved", date: "", status: "pending" },
  { title: "Amount credited", date: "", status: "pending" },
];

// Real claims (from user.claims, see /dashboard/claims) get a timeline shaped
// by their actual status, instead of the fixed 5-stage placeholder used on
// the post-submit confirmation screen (/claim/status), which has no claim
// record to look at yet — that page keeps calling <StatusTimeline /> with
// no props and gets the original hardcoded stages.
function stagesForClaim(claim: ClaimRecord): Stage[] {
  const submitted: Stage = { title: "Claim submitted", date: claim.dateSubmitted, status: "complete" };
  const verified: Stage = { title: "Documents verified", date: "", status: "complete" };

  switch (claim.status) {
    case "approved":
      return [
        submitted,
        verified,
        { title: "Regional processing", date: "", status: "complete" },
        { title: "Settlement approved", date: "", status: "complete" },
        { title: "Amount credited", date: "", status: "complete" },
      ];
    case "rejected":
      return [submitted, verified, { title: "Claim rejected", date: "", status: "failed" }];
    case "pending_clarification":
      return [submitted, verified, { title: "Awaiting your response", date: "", status: "current" }];
    case "processing":
    default:
      return [
        submitted,
        verified,
        { title: "Regional processing", date: "In progress", status: "current" },
        { title: "Settlement approved", date: "", status: "pending" },
        { title: "Amount credited", date: "", status: "pending" },
      ];
  }
}

export default function StatusTimeline({ claim }: { claim?: ClaimRecord }) {
  const stages = claim ? stagesForClaim(claim) : DEFAULT_STAGES;
  const isRejected = claim?.status === "rejected";
  const isClarification = claim?.status === "pending_clarification";

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
      <div className="font-semibold text-slate-900 mb-6">Status timeline</div>

      <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
        {stages.map((stage) => {
          const isComplete = stage.status === "complete";
          const isCurrent = stage.status === "current";
          const isFailed = stage.status === "failed";

          return (
            <div key={stage.title} className="relative pl-6">
              <div className="absolute -left-[9px] top-1 bg-white">
                {isFailed ? (
                  <XCircle className="h-4 w-4 text-red-500" />
                ) : isComplete ? (
                  <CheckCircle2 className="h-4 w-4 text-brand-600" />
                ) : isCurrent ? (
                  <CircleDashed className="h-4 w-4 text-amber-500 animate-[spin_4s_linear_infinite]" />
                ) : (
                  <div className="h-4 w-4 rounded-full border-2 border-slate-200 bg-white" />
                )}
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-sm font-medium ${
                    isFailed
                      ? "text-red-700"
                      : isCurrent
                        ? "text-brand-900"
                        : isComplete
                          ? "text-slate-900"
                          : "text-slate-500"
                  }`}
                >
                  {stage.title}
                </span>
                {stage.date && <span className="text-xs text-slate-500 mt-1">{stage.date}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <h4 className="font-medium text-slate-900 mb-2">What happens next?</h4>
        {isRejected ? (
          <p className="text-sm text-slate-600">
            {claim?.note ?? "Your claim was rejected. Review the reason and resubmit once corrected."}
          </p>
        ) : isClarification ? (
          <p className="text-sm text-slate-600">
            {claim?.note ?? "EPFO needs more information before this claim can proceed."}
          </p>
        ) : (
          <p className="text-sm text-slate-600">
            Your claim is currently with the regional processing team. No action is required from you right now. We
            will notify you once the settlement is approved.
          </p>
        )}
      </div>
    </div>
  );
}
