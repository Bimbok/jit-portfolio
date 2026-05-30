"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const semanticChecks = [
  {
    label: "Developer identity",
    value: "Bratik Mukherjee",
    status: "resolved",
    detail:
      "The symbol table binds the portfolio to one clear identity: Full Stack + Android developer from West Bengal, India.",
  },
  {
    label: "Education scope",
    value: "B.Tech IT, Techno Main Salt Lake",
    status: "valid",
    detail:
      "Education provides the scope chain: engineering fundamentals, systems courses, and practical software delivery.",
  },
  {
    label: "Core language table",
    value: "C/C++, Java, Kotlin, Go, Rust, JS/TS, Python",
    status: "typed",
    detail:
      "Each language maps to a target: JVM and compiler work, native Android, CLI tools, backend APIs, and frontend systems.",
  },
  {
    label: "Runtime targets",
    value: "Web, Android, CLI, JVM, AI canvas",
    status: "linked",
    detail:
      "The final portfolio can emit multiple artifact types instead of presenting every project as the same kind of work.",
  },
];

const irBlocks = [
  {
    op: "PROJECT",
    name: "Sizuka",
    args: ["Lexer", "Recursive Descent Parser", "AST", "Visitor Pattern"],
    detail:
      "Best compiler-design proof: a custom interpreted language with lexer, parser, AST, scoping, and runtime execution.",
  },
  {
    op: "PROJECT",
    name: "AlgoScope",
    args: ["React", "D3.js", "Algorithm Playback", "Learning UX"],
    detail:
      "Best education proof: algorithms become interactive visual states that users can inspect step by step.",
  },
  {
    op: "PROJECT",
    name: "bDoci",
    args: ["Kotlin", "Room", "MVVM", "Offline P2P QR Sync"],
    detail:
      "Best Android proof: offline-first docs, floating UI, QR-based sharing, Room storage, and real mobile constraints.",
  },
  {
    op: "PROJECT",
    name: "fyzenor",
    args: ["C++17", "Terminal UI", "Async Preview", "File Indexing"],
    detail:
      "Best systems proof: terminal file navigation with fast traversal and asynchronous preview work.",
  },
  {
    op: "PROJECT",
    name: "creAItr",
    args: ["Canvas", "Agentic AI", "Python Backend", "Workflow Automation"],
    detail:
      "Best AI/product proof: a creative workspace with an interactive canvas and backend automation pipeline.",
  },
];

export default function CompilerMiddleEnd() {
  const [activeCheck, setActiveCheck] = useState(0);
  const [activeIr, setActiveIr] = useState(0);

  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gruv-bg px-6 py-24 font-mono">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            className="flex flex-col justify-center"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-aqua">
              Phase 03
            </p>
            <h2 className="text-4xl font-bold text-gruv-fg md:text-6xl">
              Semantic Analysis
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gruv-gray">
              The compiler checks whether each symbol in the portfolio has a
              real type, scope, and purpose. Skills, education, systems work,
              and product goals resolve into one consistent developer profile.
            </p>
          </motion.div>

          <div className="grid gap-4">
            {semanticChecks.map((check, index) => (
              <motion.button
                key={check.label}
                type="button"
                onClick={() => setActiveCheck(index)}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-120px" }}
                transition={{ delay: index * 0.08 }}
                className={`border-l-4 p-5 text-left shadow-lg transition-colors ${
                  activeCheck === index
                    ? "border-gruv-yellow bg-gruv-yellow/10"
                    : "border-gruv-aqua bg-gruv-bg-soft/70 hover:bg-gruv-bg-soft"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.2em]">
                  <span className="text-gruv-gray">{check.label}</span>
                  <span className="text-gruv-green">[{check.status}]</span>
                </div>
                <div className="text-xl text-gruv-fg">{check.value}</div>
                {activeCheck === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-sm leading-relaxed text-gruv-gray"
                  >
                    {check.detail}
                  </motion.p>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden bg-[#202020] px-6 py-24 font-mono">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-yellow">
                Phase 04
              </p>
              <h2 className="text-4xl font-bold text-gruv-fg md:text-6xl">
                Intermediate Representation
              </h2>
            </div>
            <p className="max-w-lg text-gruv-gray">
              Projects are lowered into a common IR so web apps, Android apps,
              CLI tools, and language runtimes can be compared in one pipeline.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
            {irBlocks.map((block, index) => (
              <motion.button
                key={block.name}
                type="button"
                onClick={() => setActiveIr(index)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.06 }}
                className={`grid gap-4 border p-5 text-left transition-colors md:grid-cols-[110px_160px_1fr] ${
                  activeIr === index
                    ? "border-gruv-yellow bg-gruv-yellow/10"
                    : "border-gruv-bg-soft bg-gruv-bg/80 hover:border-gruv-gray"
                }`}
              >
                <span className="text-gruv-red">{block.op}</span>
                <span className="font-bold text-gruv-yellow">{block.name}</span>
                <div className="flex flex-wrap gap-2">
                  {block.args.map((arg) => (
                    <span
                      key={arg}
                      className="border border-gruv-blue/60 px-2 py-1 text-xs text-gruv-blue"
                    >
                      {arg}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
            </div>

            <motion.aside
              key={irBlocks[activeIr].name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gruv-yellow/70 bg-gruv-bg p-6"
            >
              <div className="mb-3 text-xs uppercase tracking-[0.25em] text-gruv-gray">
                IR Inspector
              </div>
              <h3 className="mb-4 text-3xl font-bold text-gruv-yellow">
                {irBlocks[activeIr].name}
              </h3>
              <p className="leading-relaxed text-gruv-fg">
                {irBlocks[activeIr].detail}
              </p>
              <div className="mt-6 border-t border-gruv-bg-soft pt-4 text-sm text-gruv-aqua">
                selected artifact lowered into portfolio IR
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
