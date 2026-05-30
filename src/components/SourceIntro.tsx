"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  "[ OK ] Initializing Compiler Pipeline v2.0.6...",
  "[ OK ] Checking System Resources...",
  "[ OK ] Mounting /dev/portfolio...",
  "[ OK ] Scanning Syntax Trees...",
  "[ OK ] Loading Kinetic Engine...",
  "READY. SCROLL TO BEGIN COMPILATION."
];

export default function SourceIntro() {
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (index < bootLines.length) {
      const timeout = setTimeout(() => setIndex(index + 1), 400 + Math.random() * 600);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => setComplete(true), 1000);
    }
  }, [index]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-gruv-bg flex flex-col items-center justify-center font-mono p-4"
          exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <div className="w-full max-w-xl text-left space-y-2">
            {bootLines.slice(0, index).map((line, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={i === bootLines.length - 1 ? "text-gruv-green mt-4 font-bold" : "text-gruv-fg"}
              >
                {line}
              </motion.div>
            ))}
            {index < bootLines.length && (
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="inline-block w-2 h-5 bg-gruv-fg align-middle ml-1"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
