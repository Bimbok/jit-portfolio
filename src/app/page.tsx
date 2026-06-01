"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import SourceIntro from "@/components/SourceIntro";
import LexerHero from "@/components/LexerHero";
import ParserAST from "@/components/ParserAST";
import CompilerMiddleEnd from "@/components/CompilerMiddleEnd";
import OptimizerSkills from "@/components/OptimizerSkills";
import CodeGeneration from "@/components/CodeGeneration";
import TracingBeamSection from "@/components/TracingBeamSection";
import PixelatedCanvasSection from "@/components/PixelatedCanvasSection";
import ExecutionProjects from "@/components/ExecutionProjects";
import SignatureSection from "@/components/SignatureSection";
import TerminalFooter from "@/components/TerminalFooter";

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener("contextmenu", handleContextMenu);
    return () => window.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <main className="bg-gruv-bg min-h-screen text-gruv-fg selection:bg-gruv-yellow selection:text-gruv-bg relative font-mono">
      {/* Visual Overlays for CRT Effect */}
      <div className="fixed inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      <SourceIntro />

      <LexerHero />

      <div className="relative z-10">
        <ParserAST onNodeClick={(id) => setActiveProject(id)} />
      </div>

      <CompilerMiddleEnd />

      <OptimizerSkills />

      <CodeGeneration />

      <TracingBeamSection />

      <PixelatedCanvasSection />

      <AnimatePresence>
        {activeProject && (
          <ExecutionProjects
            activeProject={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>

      <SignatureSection />

      <TerminalFooter />
    </main>
  );
}
