"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TerminalFooter() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>(["Welcome to Compiler OS v1.0", "Type 'help' for available commands."]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response = "";

    switch (cmd) {
      case "help":
        response = "Available commands: bio, stack, contact, clear, whoami";
        break;
      case "bio":
        response = "Elite frontend engineer specializing in kinetic UIs and compiler-themed architectures.";
        break;
      case "stack":
        response = "Next.js, TypeScript, Framer Motion, GSAP, Tailwind CSS.";
        break;
      case "contact":
        response = "hello@compiler-dev.io";
        break;
      case "whoami":
        response = "root@compiler-os";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        response = `Command not found: ${cmd}. Type 'help' for options.`;
    }

    setHistory([...history, `> ${input}`, response]);
    setInput("");
  };

  return (
    <footer className="bg-gruv-bg-soft border-t border-gruv-bg-soft p-10 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-3 h-3 rounded-full bg-gruv-red animate-pulse" />
          <h2 className="text-gruv-gray uppercase tracking-[0.2em]">Live Terminal Session</h2>
        </div>

        <div className="bg-[#181818] p-6 rounded-lg border border-gruv-bg-soft h-[300px] overflow-y-auto shadow-inner custom-scrollbar">
          {history.map((line, i) => (
            <div key={i} className={line.startsWith(">") ? "text-gruv-yellow" : "text-gruv-aqua"}>
              {line}
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex gap-2 mt-2">
            <span className="text-gruv-green">visitor@compiler:~$</span>
            <input
              autoFocus
              className="bg-transparent border-none outline-none text-gruv-fg flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between text-xs text-gruv-gray uppercase tracking-widest gap-4">
          <div>© 2026 Compiler Pipeline Portfolio</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gruv-fg transition-colors">GitHub</a>
            <a href="#" className="hover:text-gruv-fg transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-gruv-fg transition-colors">X / Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
