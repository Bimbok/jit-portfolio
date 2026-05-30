"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootPhases = [
  {
    id: "source",
    label: "SOURCE",
    command: "read Bratik.portfolio",
    output: "identity, projects, systems work",
    color: "text-gruv-aqua",
  },
  {
    id: "lexer",
    label: "LEXER",
    command: "tokenize skill_stream",
    output: "react next kotlin go c++ java",
    color: "text-gruv-yellow",
  },
  {
    id: "parser",
    label: "PARSER",
    command: "build project_ast",
    output: "AlgoScope bDoci Sizuka bimagic",
    color: "text-gruv-green",
  },
  {
    id: "optimizer",
    label: "OPTIMIZER",
    command: "fold repeated complexity",
    output: "fast, clear, deployable",
    color: "text-gruv-purple",
  },
  {
    id: "emitter",
    label: "EMITTER",
    command: "emit interactive_portfolio",
    output: "web android cli jvm",
    color: "text-gruv-red",
  },
];

const tokenStream = [
  "fn",
  "Bratik",
  "::",
  "compile",
  "(",
  "portfolio",
  ")",
  "=>",
  "FullStack",
  "+",
  "Android",
  "+",
  "CompilerDesign",
];

export default function SourceIntro() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const progress = Math.min(
    Math.round(((phaseIndex + 1) / bootPhases.length) * 100),
    100,
  );
  const activePhase = bootPhases[Math.min(phaseIndex, bootPhases.length - 1)];

  useEffect(() => {
    if (phaseIndex < bootPhases.length - 1) {
      const timeout = setTimeout(() => setPhaseIndex(phaseIndex + 1), 620);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setComplete(true), 950);
    return () => clearTimeout(timeout);
  }, [phaseIndex]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gruv-bg p-4 font-mono"
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
            transition: { duration: 0.65, ease: "easeInOut" },
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,73,52,0.16),transparent_28%,transparent_72%,rgba(142,192,124,0.14))]" />
          <motion.div
            className="absolute left-0 right-0 h-px bg-gruv-yellow/70 shadow-[0_0_32px_rgba(250,189,47,0.9)]"
            animate={{ top: ["12%", "88%", "12%"] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-[10px] md:text-xs uppercase tracking-[0.45em] text-gruv-gray"
              >
                bimbok compiler os
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 }}
                className="text-4xl font-bold leading-tight text-gruv-fg md:text-7xl md:leading-none"
              >
                Compiling
                <span className="block text-gruv-yellow">Bratik.exe</span>
              </motion.h1>

              <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2">
                {tokenStream.map((token, index) => (
                  <motion.span
                    key={`${token}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.035 }}
                    className="border border-gruv-bg-soft bg-gruv-bg-soft/70 px-3 py-1 text-xs md:text-sm text-gruv-aqua"
                  >
                    {token}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="border border-gruv-bg-soft bg-[#181818]/86 p-4 md:p-5 shadow-2xl backdrop-blur">
              <div className="mb-5 flex items-center justify-between border-b border-gruv-bg-soft pb-4">
                <div className="flex gap-2">
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-gruv-red" />
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-gruv-yellow" />
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-gruv-green" />
                </div>
                <span className="text-[10px] md:text-xs text-gruv-gray uppercase">loader.vm</span>
              </div>

              <div className="space-y-2 md:space-y-3">
                {bootPhases.map((phase, index) => {
                  const isActive = index === phaseIndex;
                  const isDone = index < phaseIndex;

                  return (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: isActive || isDone ? 1 : 0.38, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className={`grid gap-2 md:gap-3 border p-2 md:p-3 grid-cols-1 md:grid-cols-[110px_1fr] ${
                        isActive
                          ? "border-gruv-yellow bg-gruv-yellow/10"
                          : "border-gruv-bg-soft bg-gruv-bg/60"
                      }`}
                    >
                      <div className={`font-bold text-xs md:text-base ${phase.color}`}>
                        {isDone ? "[OK]" : isActive ? "[RUN]" : "[..]"}{" "}
                        {phase.label}
                      </div>
                      <div className="min-w-0">
                        <div className="text-gruv-fg text-xs md:text-base truncate">{phase.command}</div>
                        <div className="mt-1 text-[10px] md:text-xs text-gruv-gray truncate">
                          {phase.output}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs uppercase tracking-[0.25em] text-gruv-gray">
                  <span>{activePhase.label}</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 overflow-hidden bg-gruv-bg-soft">
                  <motion.div
                    className="h-full bg-gruv-yellow"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.42, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
