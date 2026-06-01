"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const phases = [
  { label: "Source", detail: "portfolio graph" },
  { label: "Parse", detail: "project symbols" },
  { label: "Optimize", detail: "interactive surface" },
  { label: "Emit", detail: "ready" },
];

export default function SourceIntro() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const phaseTimer = window.setInterval(() => {
      setPhaseIndex((current) => Math.min(current + 1, phases.length - 1));
    }, 420);

    const exitTimer = window.setTimeout(() => {
      setComplete(true);
    }, 2100);

    return () => {
      window.clearInterval(phaseTimer);
      window.clearTimeout(exitTimer);
    };
  }, []);

  const progress = ((phaseIndex + 1) / phases.length) * 100;

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#202020] px-6 font-mono"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            filter: "blur(8px)",
            transition: { duration: 0.45, ease: "easeOut" },
          }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gruv-yellow/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gruv-aqua/30 to-transparent" />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="w-full max-w-xl"
          >
            <div className="mb-8 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.35em] text-gruv-gray">
              <span>compiler pipeline</span>
              <span className="text-gruv-aqua">boot</span>
            </div>

            <div className="mb-10">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.45 }}
                className="mb-3 text-xs uppercase tracking-[0.45em] text-gruv-yellow"
              >
                Bratik Mukherjee
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14, duration: 0.5 }}
                className="text-4xl font-bold leading-none text-gruv-fg md:text-6xl"
              >
                Loading workspace
              </motion.h1>
            </div>

            <div className="mb-5 h-1 overflow-hidden bg-gruv-bg-soft">
              <motion.div
                className="h-full bg-gruv-yellow"
                initial={{ width: "12%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.38, ease: [0.33, 1, 0.68, 1] }}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-3 md:grid-cols-4">
              {phases.map((phase, index) => {
                const isDone = index <= phaseIndex;

                return (
                  <motion.div
                    key={phase.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: isDone ? 1 : 0.35, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                    className="min-w-0"
                  >
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isDone ? "bg-gruv-aqua" : "bg-gruv-bg-soft"
                        }`}
                      />
                      <span className="truncate text-xs font-bold uppercase text-gruv-fg">
                        {phase.label}
                      </span>
                    </div>
                    <div className="truncate text-[10px] text-gruv-gray">
                      {phase.detail}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
