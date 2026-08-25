// Pure mapper from real CheckResult data to a small graph the
// IdentityGraph component renders. No fabricated state — every edge
// status is a direct copy of matchEngine.ts's own output.
import type { CheckResult } from "@/types/member";

export type GraphStatus = "pass" | "warn" | "fail";

export interface GraphEdge {
  id: string;
  label: string;
  status: GraphStatus;
}

export interface GraphData {
  edges: GraphEdge[];
  overallStatus: GraphStatus;
}

const LABELS: Record<CheckResult["key"], string> = {
  name_match: "Identity",
  date_of_exit: "Exit Date",
  bank_account: "Bank",
};

export function resultsToGraphData(results: CheckResult[]): GraphData {
  const edges = results.map((r) => ({ id: r.key, label: LABELS[r.key], status: r.status }));
  const overallStatus: GraphStatus = results.some((r) => r.status === "fail")
    ? "fail"
    : results.some((r) => r.status === "warn")
      ? "warn"
      : "pass";
  return { edges, overallStatus };
}

// Placeholder shape for the idle/ambient hero display, where there's no
// real member yet — same 3 labels as a real check, so the diagram reads
// as "this is what it looks like," not an empty/broken component.
// IdentityGraph ignores `status` entirely when rendered with idle=true.
export const IDLE_GRAPH_DATA: GraphData = {
  edges: [
    { id: "name_match", label: "Identity", status: "pass" },
    { id: "date_of_exit", label: "Exit Date", status: "pass" },
    { id: "bank_account", label: "Bank", status: "pass" },
  ],
  overallStatus: "pass",
};
