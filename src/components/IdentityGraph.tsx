import type { GraphData, GraphStatus } from "@/lib/identityGraph";

const STATUS_COLOR: Record<GraphStatus, { stroke: string; fill: string; text: string }> = {
  pass: { stroke: "#22c55e", fill: "#22c55e", text: "#166534" },
  warn: { stroke: "#f59e0b", fill: "#f59e0b", text: "#92400e" },
  fail: { stroke: "#ef4444", fill: "#ef4444", text: "#991b1b" },
};

const NODE_Y = [28, 80, 132];
const CENTER = { x: 232, y: 80 };
const SOURCE_X = 48;

// Server component: a small, honest SVG visualization of the real
// pre-flight check results — not decorative, every edge colour is a
// direct copy of matchEngine.ts's output. No WebGL, no animation
// dependency; degrades to nothing extra to load on slow connections.
export default function IdentityGraph({ data, idle = false }: { data: GraphData; idle?: boolean }) {
  const centerColor = idle ? "#94a3b8" : STATUS_COLOR[data.overallStatus].stroke;

  return (
    <svg
      viewBox="0 0 280 180"
      className="w-full max-w-xs mx-auto"
      role="img"
      aria-label={
        idle
          ? "Illustration of Aadhaar, exit date and bank records connecting to a verified identity"
          : `Verification graph — overall status ${data.overallStatus}`
      }
    >
      {data.edges.map((edge, i) => {
        const color = idle ? "#cbd5e1" : STATUS_COLOR[edge.status].stroke;
        const y = NODE_Y[i];
        return (
          <g key={edge.id}>
            <line
              x1={SOURCE_X + 16}
              y1={y}
              x2={CENTER.x - 16}
              y2={CENTER.y}
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
        cx={CENTER.x}
        cy={CENTER.y}
        r={22}
        fill={idle ? "white" : centerColor}
        fillOpacity={idle ? 1 : 0.12}
        stroke={centerColor}
        strokeWidth={2}
        className="transition-all duration-500"
      />
      <text
        x={CENTER.x}
        y={CENTER.y - 30}
        textAnchor="middle"
        fontSize={10}
        fill="#64748b"
      >
        {idle ? "Verified Identity" : data.overallStatus === "pass" ? "Verified" : "Checking"}
      </text>
    </svg>
  );
}
