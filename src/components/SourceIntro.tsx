"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  "fn", "Bratik", "::", "compile", "(", "portfolio", ")", "=>", "FullStack", "+", "Android", "+", "CompilerDesign",
];

export default function SourceIntro() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [complete, setComplete] = useState(false);
  const [logLines, setLogLines] = useState<string[]>([]);
  
  const progress = Math.min(
    Math.round(((phaseIndex + 1) / bootPhases.length) * 100),
    100,
  );
  const activePhase = bootPhases[Math.min(phaseIndex, bootPhases.length - 1)];

  // Background grid lines
  const gridLines = useMemo(() => Array.from({ length: 15 }), []);

  useEffect(() => {
    if (phaseIndex < bootPhases.length - 1) {
      const timeout = setTimeout(() => {
        setPhaseIndex(phaseIndex + 1);
        setLogLines(prev => [
          ...prev, 
          `[0x${(Math.random() * 0xFFF).toString(16).toUpperCase().padStart(3, '0')}] LOAD: ${bootPhases[phaseIndex].label}`,
          `[0x${(Math.random() * 0xFFF).toString(16).toUpperCase().padStart(3, '0')}] EXEC: ${bootPhases[phaseIndex].command}`
        ].slice(-8));
      }, 750);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setComplete(true), 1200);
    return () => clearTimeout(timeout);
  }, [phaseIndex]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gruv-bg p-4 font-mono"
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
          }}
        >
          {/* Animated Tech Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
            {/* Horizontal Grid */}
            <div className="absolute inset-0 flex flex-col justify-between py-10">
              {gridLines.map((_, i) => (
                <div key={`h-${i}`} className="h-px w-full bg-gruv-bg-soft" />
              ))}
            </div>
            {/* Vertical Grid */}
            <div className="absolute inset-0 flex justify-between px-10">
              {gridLines.map((_, i) => (
                <div key={`v-${i}`} className="w-px h-full bg-gruv-bg-soft" />
              ))}
            </div>
            {/* Pulsing Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(142,192,124,0.1),transparent_70%)]" />
          </div>

          {/* Scanning Line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gruv-yellow/40 shadow-[0_0_24px_rgba(250,189,47,0.6)] z-20"
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          <div className="relative z-30 grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_400px] lg:items-center">
            <div className="text-center lg:text-left flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-6 flex items-center justify-center lg:justify-start gap-3"
              >
                <div className="px-2 py-0.5 bg-gruv-aqua/10 border border-gruv-aqua/30 text-[10px] text-gruv-aqua rounded uppercase tracking-tighter">System Initialized</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.45em] text-gruv-gray">
                  bimbok compiler v1.0.4
                </div>
              </motion.div>

              <div className="relative">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="text-4xl font-bold leading-tight text-gruv-fg md:text-7xl md:leading-none relative"
                >
                  <span className="relative">
                    Compiling
                    <motion.span 
                      animate={{ opacity: [1, 0.4, 1] }} 
                      transition={{ duration: 0.2, repeat: Infinity }}
                      className="absolute -right-4 top-0 text-gruv-red text-2xl md:text-4xl"
                    >_</motion.span>
                  </span>
                  <span className="block text-gruv-yellow drop-shadow-[0_0_15px_rgba(250,189,47,0.3)]">Bratik.exe</span>
                </motion.h1>
                
                {/* Background "Ghost" text for depth */}
                <div className="absolute -top-4 -left-4 opacity-5 pointer-events-none select-none text-8xl font-bold text-white hidden lg:block">
                  010101
                </div>
              </div>

              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-2 max-w-xl">
                {tokenStream.map((token, index) => (
                  <motion.span
                    key={`${token}-${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.04 }}
                    className="border border-gruv-bg-soft bg-gruv-bg-soft/40 px-3 py-1 text-xs md:text-sm text-gruv-aqua backdrop-blur-sm shadow-inner"
                  >
                    {token}
                  </motion.span>
                ))}
              </div>

              {/* Side Log Stream (Visible on desktop) */}
              <div className="mt-12 hidden lg:block">
                <div className="text-[10px] text-gruv-gray uppercase tracking-widest mb-4 border-b border-gruv-bg-soft pb-2 w-48 font-bold">Activity Feed</div>
                <div className="space-y-1.5 h-32 overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {logLines.map((line, i) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="text-[10px] font-mono text-gruv-gray opacity-60"
                      >
                        {line}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-gruv-bg-soft bg-[#181818]/90 p-4 md:p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gruv-yellow/5 -translate-y-8 translate-x-8 rotate-45" />

              <div className="mb-6 flex items-center justify-between border-b border-gruv-bg-soft pb-4">
                <div className="flex gap-2">
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-gruv-red" />
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-gruv-yellow" />
                  <div className="h-2.5 w-2.5 md:h-3 md:w-3 rounded-full bg-gruv-green" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-1.5 py-0.5 rounded bg-gruv-yellow/10 border border-gruv-yellow/30 text-[8px] text-gruv-yellow uppercase">Secure</div>
                  <span className="text-[10px] md:text-xs text-gruv-gray uppercase tracking-widest">loader.vm</span>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3 relative z-10">
                {bootPhases.map((phase, index) => {
                  const isActive = index === phaseIndex;
                  const isDone = index < phaseIndex;

                  return (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: isActive || isDone ? 1 : 0.25, x: 0 }}
                      className={`grid gap-2 md:gap-3 border p-3 md:p-4 grid-cols-1 md:grid-cols-[100px_1fr] transition-all duration-300 ${
                        isActive
                          ? "border-gruv-yellow bg-gruv-yellow/10 scale-[1.02] shadow-lg"
                          : "border-gruv-bg-soft bg-gruv-bg/40"
                      }`}
                    >
                      <div className={`font-bold text-xs md:text-sm flex items-center gap-2 ${phase.color}`}>
                        {isDone ? "[OK]" : isActive ? "[RUN]" : "[..]"}
                        <span className="md:hidden">{phase.label}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="text-gruv-fg text-xs md:text-sm font-bold truncate hidden md:block">{phase.label}</div>
                          <div className="text-[8px] text-gruv-gray opacity-40 font-mono hidden md:block">0x{(index * 256).toString(16).toUpperCase()}</div>
                        </div>
                        <div className="mt-1 flex flex-col gap-0.5">
                          <div className="text-gruv-gray text-[10px] truncate opacity-80">{phase.command}</div>
                          <div className="text-gruv-aqua text-[10px] truncate italic">{phase.output}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8">
                <div className="mb-2 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-gruv-aqua uppercase tracking-widest font-bold">Process Monitoring</span>
                    <span className="text-[10px] text-gruv-fg uppercase">{activePhase.label}</span>
                  </div>
                  <span className="text-xl font-bold text-gruv-yellow tracking-tighter">{progress}%</span>
                </div>
                <div className="h-3 overflow-hidden bg-gruv-bg-soft rounded-sm p-0.5 border border-white/5">
                  <motion.div
                    className="h-full bg-gruv-yellow shadow-[0_0_10px_rgba(250,189,47,0.5)]"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  />
                </div>
                <div className="mt-2 flex justify-between text-[8px] text-gruv-gray uppercase tracking-widest opacity-50 font-mono">
                  <span>Stack: Normal</span>
                  <span>Threads: 12</span>
                  <span>CRC: {progress.toString(16).toUpperCase()}F4</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
