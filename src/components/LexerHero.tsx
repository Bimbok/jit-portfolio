"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import KineticGrid from "@/components/KineticGrid";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const codeSnippet = `function compile(portfolio: Developer) {
  const projects = portfolio.getProjects();
  if (!projects.length) return "Keep coding!";
  
  return buildPipeline(projects);
}`;

const tokenize = (code: string) => {
  return code.split(/(\s+|[{}(),;=])/g).filter((t) => t.length > 0);
};

export default function LexerHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const tokens = tokenize(codeSnippet);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      gsap.to(scannerRef.current, {
        top: "100%",
        duration: 3,
        repeat: -1,
        ease: "power2.inOut",
        yoyo: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(".editor-window", {
        scale: 0.9,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.5,
      }, 0.2);

      gsap.utils.toArray(".token").forEach((token: any) => {
        tl.to(
          token,
          {
            y: () => window.innerHeight + Math.random() * 800,
            x: () => (Math.random() - 0.5) * 1000,
            rotation: () => (Math.random() - 0.5) * 1080,
            scale: 0.5,
            opacity: 0,
            ease: "power2.in",
          },
          0.1
        );
      });
    },
    { scope: containerRef }
  );

  const getColorClass = (token: string) => {
    if (["function", "const", "if", "return"].includes(token)) return "text-gruv-red";
    if (["compile", "getProjects", "buildPipeline"].includes(token)) return "text-gruv-aqua";
    if (token.startsWith('"')) return "text-gruv-green";
    return "text-gruv-fg";
  };

  return (
    <section 
      ref={containerRef} 
      className="h-screen w-full flex flex-col items-center justify-center bg-gruv-bg font-mono overflow-hidden relative"
    >
      {mounted && <KineticGrid />}

      {/* Background Gradients from Screenshot */}
      <div className="absolute top-0 left-0 w-[50%] h-full bg-gruv-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[50%] h-full bg-gruv-aqua/5 blur-[120px] pointer-events-none" />

      <div className="absolute top-20 text-gruv-gray text-xl text-center z-20">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          // PHASE 01: LEXICAL ANALYSIS
        </motion.div>
        <span className="text-xs tracking-[0.4em] uppercase opacity-50">Scrolling initiates tokenization...</span>
      </div>
      
      <div className="editor-window p-8 bg-gruv-bg-soft/80 backdrop-blur-md rounded-lg shadow-2xl border border-gruv-bg-soft z-10 w-full max-w-2xl relative overflow-hidden group">
        <div 
          ref={scannerRef}
          className="absolute left-0 right-0 h-[2px] bg-gruv-red z-30 shadow-[0_0_15px_#fb4934] pointer-events-none" 
          style={{ top: "0%" }}
        />
        <div className="absolute inset-0 bg-gruv-red/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="flex gap-2 mb-4 border-b border-gruv-bg-soft pb-4">
          <div className="w-3 h-3 rounded-full bg-gruv-red" />
          <div className="w-3 h-3 rounded-full bg-gruv-yellow" />
          <div className="w-3 h-3 rounded-full bg-gruv-green" />
          <span className="ml-4 text-xs text-gruv-gray">main.rs</span>
        </div>
        <pre className="text-lg whitespace-pre-wrap leading-relaxed relative z-20">
          {tokens.map((token, i) => (
            <motion.span
              key={i}
              className={`token inline-block ${getColorClass(token)}`}
            >
              {token === " " ? "\u00A0" : token}
            </motion.span>
          ))}
        </pre>
      </div>
    </section>
  );
}
