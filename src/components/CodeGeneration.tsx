"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal } from "@/components/ui/terminal";

const codegenTargets = [
  {
    target: "web.bundle",
    output: "Next.js portfolio, AlgoScope, Ping",
    command: "emit --target web --runtime edge",
    detail:
      "Ships interactive web experiences: algorithm visualizers, real-time communication, and this compiler-themed portfolio.",
    accent: "text-gruv-aqua",
  },
  {
    target: "android.apk",
    output: "bDoci and Koala native Android apps",
    command: "emit --target android --mode offline-first",
    detail:
      "Packages Kotlin/MVVM apps that care about device constraints, offline access, overlays, and fast reading workflows.",
    accent: "text-gruv-green",
  },
  {
    target: "cli.bin",
    output: "bimagic Git automation and fyzenor file manager",
    command: "emit --target cli --profile power-user",
    detail:
      "Compiles terminal-first tooling for faster Git workflows, file traversal, and low-friction developer operations.",
    accent: "text-gruv-yellow",
  },
  {
    target: "jvm.bytecode",
    output: "Sizuka interpreted language runtime",
    command: "emit --target jvm --language sizuka",
    detail:
      "Highlights the compiler-design core: custom language infrastructure with lexer, parser, AST, and interpreter execution.",
    accent: "text-gruv-purple",
  },
];

export default function CodeGeneration() {
  const [activeTarget, setActiveTarget] = useState(0);
  const target = codegenTargets[activeTarget];

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#202020] px-6 py-24 font-mono">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-purple">
            Phase 06
          </p>
          <h2 className="text-4xl font-bold text-gruv-fg md:text-6xl">
            Code Generation
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gruv-gray">
            The optimized portfolio IR emits a different artifact for each kind
            of work: web, Android, CLI, and language runtime.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {codegenTargets.map((item, index) => (
              <button
                key={item.target}
                type="button"
                onClick={() => setActiveTarget(index)}
                className={`border px-4 py-3 text-left text-sm transition-colors ${
                  activeTarget === index
                    ? "border-gruv-yellow bg-gruv-yellow/10 text-gruv-yellow"
                    : "border-gruv-bg-soft bg-gruv-bg text-gruv-gray hover:border-gruv-gray hover:text-gruv-fg"
                }`}
              >
                {item.target}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={target.target}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative border border-gruv-bg-soft bg-gruv-bg p-6 shadow-2xl"
        >
          <div className="mb-6 flex items-center gap-2 border-b border-gruv-bg-soft pb-4">
            <div className="h-3 w-3 rounded-full bg-gruv-red" />
            <div className="h-3 w-3 rounded-full bg-gruv-yellow" />
            <div className="h-3 w-3 rounded-full bg-gruv-green" />
            <span className="ml-3 text-xs text-gruv-gray">codegen.vm</span>
          </div>

          <div className="space-y-5">
            <div>
              <div className="text-sm text-gruv-gray">selected target</div>
              <div className={`text-4xl font-bold ${target.accent}`}>
                {target.target}
              </div>
            </div>

            <Terminal
              key={target.target}
              commands={[target.command]}
              outputs={{ 0: [`output: ${target.output}`] }}
              username="visitor@compiler"
              className="max-w-none px-0"
              showTitleBar={false}
              typingSpeed={30}
              initialDelay={100}
            />

            <p className="text-lg leading-relaxed text-gruv-fg">
              {target.detail}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
