"use client";

import React from "react";
import { Terminal } from "@/components/ui/terminal";

export default function TerminalFooter() {
  const COMMANDS = [
    "whoami",
    "bio",
    "stack",
    "projects",
    "contact",
  ];

  const OUTPUTS = {
    0: ["visitor@bimbok-compiler"],
    1: ["Bratik Mukherjee: Full Stack and Android developer building web, CLI, JVM, and native Android systems."],
    2: ["React, Next.js, Node.js, PostgreSQL, Kotlin, Go, C/C++, Java, Python, Tailwind, D3.js."],
    3: ["Linked artifacts: AlgoScope, bDoci, Sizuka, bimagic, fyzenor, Ping, creAItr."],
    4: [
      "Email: tmsl.it27.bratik@gmail.com",
      "GitHub: github.com/Bimbok",
      "LinkedIn: linkedin.com/in/bratik-mukherjee",
    ],
  };

  return (
    <footer className="bg-gruv-bg-soft border-t border-gruv-bg-soft p-10 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-3 h-3 rounded-full bg-gruv-red animate-pulse" />
          <h2 className="text-gruv-gray uppercase tracking-[0.2em]">Phase 07: Link, Load, Execute</h2>
        </div>

        <Terminal
          commands={COMMANDS}
          outputs={OUTPUTS}
          username="visitor@compiler"
          className="max-w-none px-0"
        />

        <div className="mt-10 flex flex-col md:flex-row justify-between text-xs text-gruv-gray uppercase tracking-widest gap-4">
          <div>© 2026 Bratik Mukherjee</div>
          <div className="flex gap-6">
            <a href="https://github.com/Bimbok" className="hover:text-gruv-fg transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/bratik-mukherjee" className="hover:text-gruv-fg transition-colors">LinkedIn</a>
            <a href="https://bimbok-portfolio.vercel.app" className="hover:text-gruv-fg transition-colors">Portfolio</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
