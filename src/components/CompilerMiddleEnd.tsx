"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Database, 
  Cpu, 
  Globe, 
  Smartphone, 
  Terminal as TerminalIcon, 
  Zap, 
  Hash,
  Search,
  ArrowDownToLine,
  ChevronRight,
  CheckCircle2,
  Activity,
  Code2,
  Layers
} from "lucide-react";

const semanticChecks = [
  {
    label: "Developer identity",
    value: "Bratik Mukherjee",
    status: "resolved",
    icon: <CheckCircle2 className="w-4 h-4 text-gruv-aqua" />,
    detail:
      "The symbol table binds the portfolio to one clear identity: Full Stack + Android developer from West Bengal, India.",
  },
  {
    label: "Education scope",
    value: "B.Tech IT, Techno Main Salt Lake",
    status: "valid",
    icon: <Activity className="w-4 h-4 text-gruv-yellow" />,
    detail:
      "Education provides the scope chain: engineering fundamentals, systems courses, and practical software delivery.",
  },
  {
    label: "Core language table",
    value: "C/C++, Java, Kotlin, Go, Rust, JS/TS, Python",
    status: "typed",
    icon: <Code2 className="w-4 h-4 text-gruv-orange" />,
    detail:
      "Each language maps to a target: JVM and compiler work, native Android, CLI tools, backend APIs, and frontend systems.",
  },
  {
    label: "Runtime targets",
    value: "Web, Android, CLI, JVM, AI canvas",
    status: "linked",
    icon: <Layers className="w-4 h-4 text-gruv-blue" />,
    detail:
      "The final portfolio can emit multiple artifact types instead of presenting every project as the same kind of work.",
  },
];

const irBlocks = [
  {
    op: "PROJECT",
    name: "Sizuka",
    icon: <Cpu className="w-4 h-4" />,
    args: ["Lexer", "Recursive Descent Parser", "AST", "Visitor Pattern"],
    detail:
      "Best compiler-design proof: a custom interpreted language with lexer, parser, AST, scoping, and runtime execution.",
  },
  {
    op: "PROJECT",
    name: "AlgoScope",
    icon: <Globe className="w-4 h-4" />,
    args: ["React", "D3.js", "Algorithm Playback", "Learning UX"],
    detail:
      "Best education proof: algorithms become interactive visual states that users can inspect step by step.",
  },
  {
    op: "PROJECT",
    name: "bDoci",
    icon: <Smartphone className="w-4 h-4" />,
    args: ["Kotlin", "Room", "MVVM", "Offline P2P QR Sync"],
    detail:
      "Best Android proof: offline-first docs, floating UI, QR-based sharing, Room storage, and real mobile constraints.",
  },
  {
    op: "PROJECT",
    name: "fyzenor",
    icon: <TerminalIcon className="w-4 h-4" />,
    args: ["C++17", "Terminal UI", "Async Preview", "File Indexing"],
    detail:
      "Best systems proof: terminal file navigation with fast traversal and asynchronous preview work.",
  },
  {
    op: "PROJECT",
    name: "creAItr",
    icon: <Zap className="w-4 h-4" />,
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
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gruv-bg px-6 py-12 md:py-24 font-mono">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-aqua">
              Phase 03
            </p>
            <h2 className="text-3xl font-bold text-gruv-fg md:text-6xl">
              Semantic Analysis
            </h2>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-gruv-gray mx-auto lg:mx-0">
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
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`border-l-4 p-4 md:p-5 text-left shadow-lg transition-colors ${
                  activeCheck === index
                    ? "border-gruv-yellow bg-gruv-yellow/10"
                    : "border-gruv-aqua bg-gruv-bg-soft/70 hover:bg-gruv-bg-soft"
                }`}
              >
                <div className="mb-2 flex items-center justify-between gap-4 text-[10px] md:text-xs uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2">
                    {check.icon}
                    <span className="text-gruv-gray">{check.label}</span>
                  </div>
                  <span className="text-gruv-green">[{check.status}]</span>
                </div>
                <div className="text-lg md:text-xl text-gruv-fg">{check.value}</div>
                {activeCheck === index && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-xs md:text-sm leading-relaxed text-gruv-gray"
                  >
                    {check.detail}
                  </motion.p>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden bg-[#202020] px-6 py-12 md:py-24 font-mono">
        <div className="mx-auto w-full max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end text-center lg:text-left"
          >
            <div>
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-yellow">
                Phase 04
              </p>
              <h2 className="text-3xl font-bold text-gruv-fg md:text-6xl">
                Intermediate Representation
              </h2>
            </div>
            <p className="max-w-lg text-sm md:text-base text-gruv-gray mx-auto lg:mx-0">
              Projects are lowered into a common IR so web apps, Android apps,
              CLI tools, and language runtimes can be compared in one pipeline.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-3">
            {irBlocks.map((block, index) => (
              <motion.button
                key={block.name}
                type="button"
                onClick={() => setActiveIr(index)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`grid gap-3 border p-4 md:p-5 text-left transition-colors grid-cols-1 md:grid-cols-[110px_160px_1fr] ${
                  activeIr === index
                    ? "border-gruv-yellow bg-gruv-yellow/10"
                    : "border-gruv-bg-soft bg-gruv-bg/80 hover:border-gruv-gray"
                }`}
              >
                <div className="flex items-center gap-2 text-gruv-red">
                  <Database className="w-3 h-3" />
                  <span className="text-[10px] md:text-xs">{block.op}</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-gruv-yellow">
                  {block.icon}
                  <span className="text-sm md:text-base">{block.name}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {block.args.map((arg) => (
                    <span
                      key={arg}
                      className="flex items-center gap-1 border border-gruv-blue/60 px-2 py-1 text-[10px] md:text-xs text-gruv-blue"
                    >
                      <Hash className="w-2 h-2 opacity-60" />
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
              className="border border-gruv-yellow/70 bg-gruv-bg p-5 md:p-6 flex flex-col"
            >
              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-gruv-gray">
                <div className="flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  <span>IR Inspector</span>
                </div>
                <span className="text-gruv-yellow opacity-50">0x{activeIr.toString(16).toUpperCase()}</span>
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gruv-yellow/10 border border-gruv-yellow/30 text-gruv-yellow">
                  {irBlocks[activeIr].icon}
                </div>
                <h3 className="text-3xl font-bold text-gruv-yellow">
                  {irBlocks[activeIr].name}
                </h3>
              </div>

              <div className="relative mb-6">
                <div className="absolute -left-3 top-0 bottom-0 w-px bg-gruv-bg-soft" />
                <p className="leading-relaxed text-gruv-fg text-sm pl-4 italic">
                  "{irBlocks[activeIr].detail}"
                </p>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] text-gruv-gray uppercase tracking-widest">Metadata</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gruv-bg-soft/40 p-2 border border-gruv-bg-soft flex items-center gap-2">
                      <Cpu className="w-3 h-3 text-gruv-aqua" />
                      <span className="text-[10px] text-gruv-fg">Arch: x86_64</span>
                    </div>
                    <div className="bg-gruv-bg-soft/40 p-2 border border-gruv-bg-soft flex items-center gap-2">
                      <Zap className="w-3 h-3 text-gruv-orange" />
                      <span className="text-[10px] text-gruv-fg">Opt: O3</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gruv-bg-soft flex items-center justify-between text-gruv-aqua">
                  <div className="flex items-center gap-2">
                    <ArrowDownToLine className="w-3 h-3" />
                    <span className="text-[10px] uppercase tracking-wider">Lowered artifact</span>
                  </div>
                  <ChevronRight className="w-3 h-3 animate-pulse" />
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
    </>
  );
}
