import type { GraphData, GraphStatus } from "@/lib/identityGraph";

const STATUS_COLOR: Record<GraphStatus, { stroke: string; fill: string; text: string }> = {
  pass: { stroke: "#0D9488", fill: "#0D9488", text: "#0f766e" },
  warn: { stroke: "#f59e0b", fill: "#f59e0b", text: "#92400e" },
  fail: { stroke: "#ef4444", fill: "#ef4444", text: "#991b1b" },
};

const CENTER_X = 232;
const SOURCE_X = 48;
const NODE_SPACING = 52;
const TOP_MARGIN = 28;

// Node positions are derived from the number of edges rather than hardcoded,
// so adding a check to matchEngine.ts can't silently produce NaN coordinates.
function layout(edgeCount: number) {
  const height = TOP_MARGIN * 2 + Math.max(edgeCount - 1, 0) * NODE_SPACING;
  return {
    height,
    nodeY: (i: number) => TOP_MARGIN + i * NODE_SPACING,
    centerY: height / 2,
  };
}

// Server component: a small, honest SVG visualization of the real
// pre-flight check results — not decorative, every edge colour is a
// direct copy of matchEngine.ts's output. No WebGL, no animation
// dependency; degrades to nothing extra to load on slow connections.
export default function IdentityGraph({ data, idle = false }: { data: GraphData; idle?: boolean }) {
  const centerColor = idle ? "#94a3b8" : STATUS_COLOR[data.overallStatus].stroke;
  const { height, nodeY, centerY } = layout(data.edges.length);

  return (
    <svg
      viewBox={`0 0 280 ${height}`}
      className="w-full max-w-xs mx-auto"
      role="img"
      aria-label={
        idle
          ? "Illustration of Aadhaar, birth date, exit date and bank records connecting to a verified identity"
          : `Verification graph — overall status ${data.overallStatus}`
      }
    >
      {data.edges.map((edge, i) => {
        const color = idle ? "#cbd5e1" : STATUS_COLOR[edge.status].stroke;
        const y = nodeY(i);
        return (
          <g key={edge.id}>
            <line
              x1={SOURCE_X + 16}
              y1={y}
              x2={CENTER_X - 16}
              y2={centerY}
              stroke={color}
              strokeWidth={2}
              strokeDasharray={idle ? "4 4" : undefined}
              className="transition-all duration-500"
            />
            <circle cx={SOURCE_X} cy={y} r={16} fill="white" stroke={color} strokeWidth={2} />
            <text
              x={SOURCE_X}
              y={y + 32}
              textAnchor="middle"
              fontSize={10}
              fill="#64748b"
              fontFamily="inherit"
            >
              {edge.label}
            </text>
          </g>
        );
      })}

      <circle
        cx={CENTER_X}
        cy={centerY}
        r={22}
        fill={idle ? "white" : centerColor}
        fillOpacity={idle ? 1 : 0.12}
        stroke={centerColor}
        strokeWidth={2}
        className="transition-all duration-500"
      />
      <text
        x={CENTER_X}
        y={centerY - 30}
        textAnchor="middle"
        fontSize={10}
        fill="#64748b"
      >
        {idle ? "Verified Identity" : data.overallStatus === "pass" ? "Verified" : "Checking"}
      </text>
    </svg>
  );
}
