"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const NODE_WIDTH = 200;
const NODE_HEIGHT = 40;

const initialNodes = [
  { id: "root", label: "Program", x: 412, y: 20 },
  { id: "var", label: "VarDeclaration: projects", x: 412, y: 120 },
  { id: "ping", label: "String: 'Ping'", x: 87, y: 280, isProject: true },
  { id: "bdoci", label: "String: 'bDoci'", x: 217, y: 310, isProject: true },
  { id: "sizuka", label: "String: 'Sizuka'", x: 347, y: 280, isProject: true },
  {
    id: "bimagic",
    label: "String: 'Bimagic'",
    x: 477,
    y: 310,
    isProject: true,
  },
  {
    id: "medcheck",
    label: "String: 'MedCheck'",
    x: 607,
    y: 280,
    isProject: true,
  },
  {
    id: "traffic",
    label: "String: 'Traffic'",
    x: 737,
    y: 310,
    isProject: true,
  },
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

type Position = { x: number; y: number };
type DragState = {
  nodeId: string;
  pointerId: number;
  startPointer: Position;
  startNode: Position;
  hasMoved: boolean;
};

export default function ParserAST({
  onNodeClick,
}: {
  onNodeClick: (id: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const [positions, setPositions] = useState<
    Record<string, Position>
  >(() =>
    initialNodes.reduce(
      (acc, node) => ({ ...acc, [node.id]: { x: node.x, y: node.y } }),
      {},
    ),
  );

  const clampPosition = (position: Position) => {
    const container = containerRef.current;
    if (!container) return position;

    return {
      x: Math.min(
        Math.max(position.x, 0),
        container.clientWidth - NODE_WIDTH,
      ),
      y: Math.min(
        Math.max(position.y, 0),
        container.clientHeight - NODE_HEIGHT,
      ),
    };
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    id: string,
  ) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      nodeId: id,
      pointerId: event.pointerId,
      startPointer: { x: event.clientX, y: event.clientY },
      startNode: positions[id],
      hasMoved: false,
    };
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const delta = {
      x: event.clientX - dragState.startPointer.x,
      y: event.clientY - dragState.startPointer.y,
    };

    if (Math.abs(delta.x) > 3 || Math.abs(delta.y) > 3) {
      dragState.hasMoved = true;
    }

    const nextPosition = clampPosition({
      x: dragState.startNode.x + delta.x,
      y: dragState.startNode.y + delta.y,
    });

    setPositions((prev) => ({
      ...prev,
      [dragState.nodeId]: nextPosition,
    }));
  };

  const handlePointerUp = (
    event: React.PointerEvent<HTMLDivElement>,
    id: string,
    isProject?: boolean,
  ) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    event.currentTarget.releasePointerCapture(event.pointerId);
    dragStateRef.current = null;

    if (!dragState.hasMoved && isProject) {
      onNodeClick(id);
    }
  };

  const getBezierPath = (fromId: string, toId: string) => {
    const from = positions[fromId];
    const to = positions[toId];
    if (!from || !to) return "";

    const startX = from.x + NODE_WIDTH / 2;
    const startY = from.y + NODE_HEIGHT;
    const endX = to.x + NODE_WIDTH / 2;
    const endY = to.y;

    const cp1y = startY + (endY - startY) / 2;
    const cp2y = startY + (endY - startY) / 2;

    return `M ${startX} ${startY} C ${startX} ${cp1y}, ${endX} ${cp2y}, ${endX} ${endY}`;
  };

  return (
    <section className="relative w-full h-screen bg-gruv-bg font-mono overflow-hidden flex flex-col items-center justify-center border-t border-gruv-bg-soft px-4">
      <div className="absolute top-10 text-gruv-gray text-base md:text-xl text-center z-20">
        <TypewriterEffect 
          words={[{ text: "// PHASE 02: SYNTAX ANALYSIS", className: "text-gruv-gray text-sm md:text-xl font-mono" }]}
          className="text-base md:text-xl"
          cursorClassName="h-4 md:h-6 bg-gruv-gray"
        />
        <span className="text-[10px] md:text-sm opacity-60">{"// Projects become a draggable abstract syntax tree."}</span>
      </div>

      <div className="w-full flex justify-center items-center overflow-visible">
        <div
          ref={containerRef}
          className="relative z-10 h-[500px] w-[1024px] touch-none origin-center scale-[0.32] sm:scale-[0.5] md:scale-[0.75] lg:scale-100 shrink-0"
        >
          <svg className="absolute inset-0 h-full w-full pointer-events-none overflow-visible">
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
              onPointerDown={(event) => handlePointerDown(event, node.id)}
              onPointerMove={handlePointerMove}
              onPointerUp={(event) =>
                handlePointerUp(event, node.id, node.isProject)
              }
              onPointerCancel={() => {
                dragStateRef.current = null;
              }}
              style={{
                left: positions[node.id].x,
                top: positions[node.id].y,
                width: NODE_WIDTH,
                height: NODE_HEIGHT,
              }}
              className={`absolute rounded-full border flex items-center justify-center text-xs shadow-lg cursor-grab active:cursor-grabbing select-none transition-colors backdrop-blur-sm ${
                node.isProject
                  ? "bg-gruv-yellow/10 border-gruv-yellow text-gruv-yellow hover:bg-gruv-yellow/20 z-20"
                  : node.id === "root"
                    ? "bg-gruv-green/10 border-gruv-green text-gruv-green z-10"
                    : "bg-gruv-aqua/10 border-gruv-aqua text-gruv-aqua z-10"
              }`}
            >
              <div className="flex items-center gap-2">
                {node.isProject && (
                  <div className="w-1.5 h-1.5 rounded-full bg-gruv-yellow" />
                )}
                {node.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
