"use client";

import React, { useRef, useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

const initialNodes = [
  { id: "root", label: "Program", x: 400, y: 20 },
  { id: "var", label: "VarDeclaration: projects", x: 300, y: 120 },
  { id: "ping", label: "String: 'Ping'", x: 50, y: 280, isProject: true },
  { id: "bdoci", label: "String: 'bDoci'", x: 180, y: 310, isProject: true },
  { id: "sizuka", label: "String: 'Sizuka'", x: 310, y: 280, isProject: true },
  { id: "bimagic", label: "String: 'Bimagic'", x: 440, y: 310, isProject: true },
  { id: "medcheck", label: "String: 'MedCheck'", x: 570, y: 280, isProject: true },
  { id: "traffic", label: "String: 'Traffic'", x: 700, y: 310, isProject: true },
];

const edges = [
  { from: "root", to: "var" },
  { from: "var", to: "ping" },
  { from: "var", to: "bdoci" },
  { from: "var", to: "sizuka" },
  { from: "var", to: "bimagic" },
  { from: "var", to: "medcheck" },
  { from: "var", to: "traffic" },
];

export default function ParserAST({ onNodeClick }: { onNodeClick: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>(() => 
    initialNodes.reduce((acc, node) => ({ ...acc, [node.id]: { x: node.x, y: node.y } }), {})
  );

  const handleDrag = (id: string, info: any) => {
    setPositions((prev) => ({
      ...prev,
      [id]: { x: prev[id].x + info.delta.x, y: prev[id].y + info.delta.y },
    }));
  };

  const getBezierPath = (fromId: string, toId: string) => {
    const from = positions[fromId];
    const to = positions[toId];
    if (!from || !to) return "";

    const startX = from.x + 100;
    const startY = from.y + 40;
    const endX = to.x + 100;
    const endY = to.y;

    const cp1y = startY + (endY - startY) / 2;
    const cp2y = startY + (endY - startY) / 2;

    return `M ${startX} ${startY} C ${startX} ${cp1y}, ${endX} ${cp2y}, ${endX} ${endY}`;
  };

  return (
    <section className="relative w-full h-screen bg-gruv-bg font-mono overflow-hidden flex flex-col items-center justify-center border-t border-gruv-bg-soft">
      <div className="absolute top-10 text-gruv-gray text-xl text-center z-20">
        // Phase 2: The Parser<br/>
        // Fixed AST connections with Bezier curves
      </div>
      
      <LayoutGroup id="pipeline-ast">
        <div ref={containerRef} className="relative w-full max-w-5xl h-[500px] z-10">
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {edges.map((edge, i) => (
              <motion.path
                key={`${edge.from}-${edge.to}`}
                d={getBezierPath(edge.from, edge.to)}
                stroke="var(--gruv-gray)"
                strokeWidth="1.5"
                fill="transparent"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
          </svg>

          {initialNodes.map((node) => (
            <motion.div
              key={node.id}
              layoutId={node.isProject ? `project-${node.id}` : undefined}
              drag
              dragElastic={0.1}
              dragConstraints={containerRef}
              onDrag={(_, info) => handleDrag(node.id, info)}
              onClick={() => node.isProject && onNodeClick(node.id)}
              style={{ x: positions[node.id].x, y: positions[node.id].y }}
              className={`absolute w-[200px] h-[40px] rounded-full border flex items-center justify-center text-xs shadow-lg cursor-grab active:cursor-grabbing select-none transition-colors ${
                node.isProject 
                  ? "bg-gruv-yellow/20 border-gruv-yellow text-gruv-yellow hover:bg-gruv-yellow/30 z-20" 
                  : node.id === 'root'
                    ? "bg-gruv-green/20 border-gruv-green text-gruv-green z-10"
                    : "bg-gruv-aqua/20 border-gruv-aqua text-gruv-aqua z-10"
              }`}
            >
              <div className="flex items-center gap-2">
                {node.isProject && <div className="w-1.5 h-1.5 rounded-full bg-gruv-yellow" />}
                {node.label}
              </div>
            </motion.div>
          ))}
        </div>
      </LayoutGroup>
    </section>
  );
}
