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
