import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Node {
  id: string;
  x: number;
  y: number;
  risk: "high" | "medium" | "low";
  label: string;
}

interface Edge {
  from: string;
  to: string;
  amount: number;
}

const mockNodes: Node[] = [
  { id: "A001", x: 150, y: 100, risk: "high", label: "A001" },
  { id: "A002", x: 350, y: 80, risk: "medium", label: "A002" },
  { id: "A003", x: 300, y: 200, risk: "low", label: "A003" },
  { id: "A004", x: 100, y: 250, risk: "high", label: "A004" },
  { id: "A005", x: 450, y: 180, risk: "medium", label: "A005" },
  { id: "A006", x: 200, y: 320, risk: "low", label: "A006" },
  { id: "A007", x: 400, y: 300, risk: "high", label: "A007" },
  { id: "A008", x: 500, y: 100, risk: "low", label: "A008" },
];

const mockEdges: Edge[] = [
  { from: "A001", to: "A002", amount: 4999 },
  { from: "A001", to: "A003", amount: 4850 },
  { from: "A001", to: "A004", amount: 4750 },
  { from: "A002", to: "A005", amount: 3200 },
  { from: "A003", to: "A006", amount: 2100 },
  { from: "A004", to: "A007", amount: 4500 },
  { from: "A005", to: "A008", amount: 2800 },
  { from: "A007", to: "A001", amount: 1500 },
];

export function TransactionGraph() {
  const getNodeColor = (risk: string) => {
    switch (risk) {
      case "high": return "hsl(0, 75%, 55%)";
      case "medium": return "hsl(38, 92%, 50%)";
      case "low": return "hsl(145, 65%, 42%)";
      default: return "hsl(175, 70%, 45%)";
    }
  };

  const getNodeById = (id: string) => mockNodes.find(n => n.id === id);

  return (
    <div className="graph-container h-96 relative">
      <div className="absolute top-4 left-4 z-10 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-risk-high" />
          <span className="text-muted-foreground">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-risk-medium" />
          <span className="text-muted-foreground">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-risk-low" />
          <span className="text-muted-foreground">Low</span>
        </div>
      </div>

      <svg className="w-full h-full">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="hsl(220, 15%, 35%)"
            />
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {mockEdges.map((edge, index) => {
          const fromNode = getNodeById(edge.from);
          const toNode = getNodeById(edge.to);
          if (!fromNode || !toNode) return null;

          return (
            <g key={index}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="hsl(220, 15%, 25%)"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
                strokeDasharray="4"
                className="animate-flow"
              />
              <text
                x={(fromNode.x + toNode.x) / 2}
                y={(fromNode.y + toNode.y) / 2 - 8}
                fill="hsl(215, 15%, 55%)"
                fontSize="10"
                textAnchor="middle"
                className="font-mono"
              >
                ₹{edge.amount.toLocaleString()}
              </text>
            </g>
          );
        })}

        {/* Nodes */}
        {mockNodes.map((node) => (
          <g key={node.id} className="cursor-pointer">
            <circle
              cx={node.x}
              cy={node.y}
              r="24"
              fill="hsl(220, 18%, 10%)"
              stroke={getNodeColor(node.risk)}
              strokeWidth="2"
              filter="url(#glow)"
            />
            <circle
              cx={node.x}
              cy={node.y}
              r="20"
              fill={getNodeColor(node.risk)}
              opacity="0.15"
            />
            <text
              x={node.x}
              y={node.y + 4}
              fill="hsl(210, 20%, 95%)"
              fontSize="10"
              textAnchor="middle"
              className="font-mono font-medium"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div className="scan-line" />
    </div>
  );
}
