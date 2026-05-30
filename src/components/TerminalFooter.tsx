"use client";

import React, { useState } from "react";

export default function TerminalFooter() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Phase 07: Linking, Loading & Execution",
    "Type 'help' for available commands.",
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    let response = "";

    switch (cmd) {
      case "help":
        response = "Available commands: bio, stack, projects, contact, clear, whoami";
        break;
      case "bio":
        response = "Bratik Mukherjee: Full Stack and Android developer building web, CLI, JVM, and native Android systems.";
        break;
      case "stack":
        response = "React, Next.js, Node.js, PostgreSQL, Kotlin, Go, C/C++, Java, Python, Tailwind, D3.js.";
        break;
      case "projects":
        response = "Linked artifacts: AlgoScope, bDoci, Sizuka, bimagic, fyzenor, Ping, creAItr.";
        break;
      case "contact":
        response = "Email: tmsl.it27.bratik@gmail.com | GitHub: github.com/Bimbok | LinkedIn: linkedin.com/in/bratik-mukherjee";
        break;
      case "whoami":
        response = "visitor@bimbok-compiler";
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
          <h2 className="text-gruv-gray uppercase tracking-[0.2em]">Phase 07: Link, Load, Execute</h2>
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
