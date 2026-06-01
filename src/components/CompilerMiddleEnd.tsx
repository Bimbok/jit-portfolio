"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
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
  Layers,
  ExternalLink
} from "lucide-react";
import { GithubLogo as Github } from "@phosphor-icons/react";
import { FocusCards } from "@/components/ui/focus-cards";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

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

interface IRBlock {
  op: string;
  name: string;
  icon: React.ReactNode;
  logoSrc?: string;
  args: string[];
  detail: string;
  github?: string;
  demo?: string;
}

const irBlocks: IRBlock[] = [
  {
    op: "PROJECT",
    name: "Sizuka",
    icon: <Cpu className="w-4 h-4" />,
    args: ["Lexer", "Recursive Descent Parser", "AST", "Visitor Pattern"],
    detail:
      "Best compiler-design proof: a custom interpreted language with lexer, parser, AST, scoping, and runtime execution.",
    github: "https://github.com/Bimbok/sizuka.git",
  },
  {
    op: "PROJECT",
    name: "AlgoScope",
    icon: <Globe className="w-4 h-4" />,
    logoSrc: "/algoscope.png",
    args: ["React", "D3.js", "Algorithm Playback", "Learning UX"],
    detail:
      "Lead Maintainer (GirlScript Summer of Code 2026): Managed 35+ global contributors, 50+ PR reviews, 27+ stars, and CI/CD pipelines to scale to 51+ forks.",
    github: "https://github.com/algoscope-hq/AlgoScope.git",
    demo: "https://algo-scope-virid.vercel.app/",
  },
  {
    op: "PROJECT",
    name: "bDoci",
    icon: <Smartphone className="w-4 h-4" />,
    logoSrc: "/bDoci.png",
    args: ["Kotlin", "Room", "MVVM", "Offline P2P QR Sync"],
    detail:
      "Best Android proof: offline-first docs, floating UI, QR-based sharing, Room storage, and real mobile constraints.",
    github: "https://github.com/Bimbok/bDoci-app.git",
  },
  {
    op: "PROJECT",
    name: "fyzenor",
    icon: <TerminalIcon className="w-4 h-4" />,
    logoSrc: "/fyzenor.png",
    args: ["C++17", "Terminal UI", "Async Preview", "File Indexing"],
    detail:
      "Best systems proof: terminal file navigation with fast traversal and asynchronous preview work.",
    github: "https://github.com/Bimbok/fyzenor.git",
  },
  {
    op: "PROJECT",
    name: "creAItr",
    icon: <Zap className="w-4 h-4" />,
    logoSrc: "/creaitr..png",
    args: ["Canvas", "Agentic AI", "Python Backend", "Workflow Automation"],
    detail:
      "Best AI/product proof: a creative workspace with an interactive canvas and backend automation pipeline.",
    github: "https://github.com/aasaan-hainn/creAItr..git",
    demo: "https://creaitr.arghyadevs.me/",
  },
];

export default function CompilerMiddleEnd() {
  const [activeCheck, setActiveCheck] = useState(0);
  const [activeIr, setActiveIr] = useState(0);

  const focusCardsData = irBlocks.map(block => ({
    title: block.name,
    icon: block.icon,
    logoSrc: block.logoSrc,
    category: block.op
  }));

  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gruv-bg px-6 py-12 md:py-24 font-mono">
        {/* Background Symbol Table for technical density */}
        <div className="absolute top-20 left-10 opacity-[0.03] pointer-events-none select-none text-[10px] hidden xl:block">
          <div className="font-bold mb-2 text-gruv-yellow uppercase">[ Global Symbol Table ]</div>
          <div className="space-y-1">
            <div>_S0: DEV_NAME {"->"} &quot;Bratik&quot;</div>
            <div>_S1: LANG_KOTLIN {"->"} true</div>
            <div>_S2: SCOPE_GLOBAL {"->"} Object</div>
            <div>_S3: TYPE_CHECKED {"->"} [DONE]</div>
            <div>... [ 842 SYMBOLS RESOLVED ] ...</div>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center text-center lg:text-left"
          >
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-aqua text-left">
              Phase 03
            </p>
            <TypewriterEffect 
              words={[{ text: "Semantic Analysis", className: "text-2xl font-bold text-gruv-fg md:text-6xl" }]}
              className="text-left mb-6"
              cursorClassName="bg-gruv-aqua h-6 md:h-12"
            />
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
        {/* Background Type Registry for technical density */}
        <div className="absolute top-20 right-10 opacity-[0.02] pointer-events-none select-none text-[10px] hidden xl:block">
          <div className="font-bold mb-2 text-gruv-aqua uppercase">[ Symbol Table / Type Registry ]</div>
          <div className="space-y-1">
            <div>0x1A2F: class SizukaRuntime {"->"} Object</div>
            <div>0x1B44: struct InstructionPacket {"->"} [u8; 16]</div>
            <div>0x1C89: enum TargetPlatform {"->"} {"{ WEB, ANDROID, CLI }"}</div>
            <div>0x2001: fn entry_point() {"->"} void</div>
            <div>0x20A4: var symbol_table: HashMap{"<String, Value>"}</div>
            <div>0x3011: macro! emit_bytecode(target)</div>
            <div>... [ 1248 MORE SYMBOLS ] ...</div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end text-center lg:text-left"
          >
            <div className="flex flex-col items-center lg:items-start">
              <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-yellow text-left w-full">
                Phase 04
              </p>
              <TypewriterEffect 
                words={[{ text: "Intermediate Representation", className: "text-2xl font-bold text-gruv-fg md:text-6xl text-left" }]}
                className="text-left mb-6"
                cursorClassName="bg-gruv-yellow h-6 md:h-12"
              />
            </div>
            <p className="max-w-lg text-sm md:text-base text-gruv-gray mx-auto lg:mx-0">
              Projects are lowered into a common IR so web apps, Android apps,
              CLI tools, and language runtimes can be compared in one pipeline.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <FocusCards 
                cards={focusCardsData} 
                activeCardIndex={activeIr}
                onCardClick={setActiveIr}
              />
              
              <div className="mt-8 flex flex-wrap gap-3">
                {irBlocks[activeIr].args.map((arg) => (
                  <motion.span
                    key={arg}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 border border-gruv-blue/60 px-3 py-1.5 text-xs md:text-sm text-gruv-blue bg-gruv-blue/5 rounded-md"
                  >
                    <Hash className="w-3 h-3 opacity-60" />
                    {arg}
                  </motion.span>
                ))}
              </div>
            </div>

            <motion.aside
              key={irBlocks[activeIr].name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gruv-yellow/70 bg-gruv-bg p-5 md:p-6 flex flex-col h-fit relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 opacity-[0.03] text-[60px] font-bold pointer-events-none select-none -translate-y-4 translate-x-4">
                0x{activeIr}
              </div>

              <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-gruv-gray">
                <div className="flex items-center gap-2">
                  <Search className="w-3 h-3" />
                  <span>IR Inspector</span>
                </div>
                <span className="text-gruv-yellow opacity-50">Addr: 0x{(activeIr * 1024).toString(16)}</span>
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gruv-yellow/10 border border-gruv-yellow/30 text-gruv-yellow">
                  {irBlocks[activeIr].logoSrc ? (
                    <Image
                      src={irBlocks[activeIr].logoSrc}
                      alt={`${irBlocks[activeIr].name} logo`}
                      width={32}
                      height={32}
                      unoptimized={irBlocks[activeIr].logoSrc === "/bDoci.png"}
                      className="h-8 w-8 object-contain"
                    />
                  ) : (
                    irBlocks[activeIr].icon
                  )}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gruv-fg">
                  {irBlocks[activeIr].name}
                </h3>
              </div>

              {/* Instruction Stream */}
              <div className="mb-6 space-y-2">
                <div className="text-[10px] text-gruv-gray uppercase tracking-widest mb-2 border-b border-gruv-bg-soft pb-1">Instruction Stream</div>
                <div className="bg-black/20 p-3 rounded font-mono text-[10px] leading-relaxed text-gruv-aqua/80 max-h-32 overflow-hidden relative">
                  <div className="animate-pulse">
                    <div>0x00A1  PUSH  RBP</div>
                    <div>0x00A2  MOV   RBP, RSP</div>
                    <div className="text-gruv-yellow">0x00A5  CALL  _{irBlocks[activeIr].name.toLowerCase()}</div>
                    <div>0x00AF  CMP   EAX, 0x1</div>
                    <div>0x00B2  JZ    OFFSET_04</div>
                    <div className="opacity-40">0x00B4  ADD   ESP, 0x10</div>
                    <div className="opacity-40">0x00B7  RET</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gruv-bg to-transparent" />
                </div>
              </div>

              <div className="relative mb-8">
                <div className="absolute -left-3 top-0 bottom-0 w-px bg-gruv-bg-soft" />
                <p className="leading-relaxed text-gruv-fg text-sm pl-4 italic">
                  &quot;{irBlocks[activeIr].detail}&quot;
                </p>
              </div>

              {/* Register & Stack State */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-[8px] text-gruv-gray uppercase tracking-widest mb-1">Registers</div>
                  <div className="grid grid-cols-2 gap-x-2 text-[10px] font-mono border border-gruv-bg-soft p-2 bg-black/10">
                    <span className="text-gruv-orange">EAX:</span> <span className="text-gruv-fg">0x1</span>
                    <span className="text-gruv-orange">EBX:</span> <span className="text-gruv-fg">0x0</span>
                    <span className="text-gruv-orange">ECX:</span> <span className="text-gruv-fg">0xFF</span>
                    <span className="text-gruv-orange">EDX:</span> <span className="text-gruv-fg">0xA4</span>
                  </div>
                </div>
                <div>
                  <div className="text-[8px] text-gruv-gray uppercase tracking-widest mb-1">Metadata</div>
                  <div className="space-y-1">
                    <div className="bg-gruv-bg-soft/40 p-1.5 border border-gruv-bg-soft flex items-center gap-2">
                      <Cpu className="w-2.5 h-2.5 text-gruv-aqua" />
                      <span className="text-[9px] text-gruv-fg tracking-tighter">Arch: x86_64</span>
                    </div>
                    <div className="bg-gruv-bg-soft/40 p-1.5 border border-gruv-bg-soft flex items-center gap-2">
                      <Zap className="w-2.5 h-2.5 text-gruv-orange" />
                      <span className="text-[9px] text-gruv-fg tracking-tighter">Opt: O3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* External Links */}
              {(irBlocks[activeIr].github || irBlocks[activeIr].demo) && (
                <div className="mb-6 space-y-2">
                  <div className="text-[10px] text-gruv-gray uppercase tracking-widest mb-2 border-b border-gruv-bg-soft pb-1">External Links</div>
                  <div className="flex gap-2">
                    {irBlocks[activeIr].github && (
                      <a 
                        href={irBlocks[activeIr].github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-gruv-bg-soft bg-gruv-bg-soft/20 hover:bg-gruv-bg-soft/40 transition-colors text-[10px] text-gruv-fg uppercase tracking-wider"
                      >
                        <Github className="w-3 h-3" />
                        Source
                      </a>
                    )}
                    {irBlocks[activeIr].demo && (
                      <a 
                        href={irBlocks[activeIr].demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2 border border-gruv-bg-soft bg-gruv-bg-soft/20 hover:bg-gruv-bg-soft/40 transition-colors text-[10px] text-gruv-fg uppercase tracking-wider"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-gruv-bg-soft flex items-center justify-between text-gruv-aqua">
                <div className="flex items-center gap-2">
                  <ArrowDownToLine className="w-3 h-3" />
                  <span className="text-[10px] uppercase tracking-wider">Lowered artifact</span>
                </div>
                <ChevronRight className="w-3 h-3 animate-pulse" />
              </div>
            </motion.aside>
          </div>
        </div>

        {/* Bottom Status Bits */}
        <div className="absolute bottom-10 left-10 opacity-10 flex gap-10 font-mono text-[10px] hidden lg:flex">
          <div className="flex gap-4">
            <span className="text-gruv-aqua">MEM_DUMP:</span>
            <div className="flex gap-1">
              {[1,0,1,1,0,0,1,1,0,1,0].map((b, i) => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0.2, 1, 0.2] }} 
                  transition={{ duration: 1, delay: i * 0.1, repeat: Infinity }}
                  className={b ? "text-gruv-yellow" : "text-gruv-gray"}
                >
                  {b}
                </motion.div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-gruv-aqua">PIPELINE_STAGED:</span> <span className="text-gruv-green">TRUE</span>
          </div>
          <div>
            <span className="text-gruv-aqua">THROUGHPUT:</span> <span className="text-gruv-fg">1.2 GB/S</span>
          </div>
        </div>
      </section>
    </>
  );
}
