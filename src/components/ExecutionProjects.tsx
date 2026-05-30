"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal } from "@/components/ui/terminal";

const projectsData = [
  { 
    id: "ping", 
    title: "Ping", 
    desc: "Real-time communication platform built with React and Socket.io.",
    tech: ["React", "Socket.io", "Node.js"]
  },
  { 
    id: "bdoci", 
    title: "bDoci", 
    desc: "Native Android developer knowledge base featuring a unique floating UI.",
    tech: ["Android", "Kotlin", "Room"]
  },
  { 
    id: "sizuka", 
    title: "Sizuka", 
    desc: "Custom interpreted programming language running on the Java Virtual Machine (JVM).",
    tech: ["Java", "JVM", "ANTLR"]
  },
  { 
    id: "bimagic", 
    title: "Bimagic", 
    desc: "Git automation CLI tool tailored to optimize daily developer workflows.",
    tech: ["Bash", "Git", "GitHub CLI"]
  },
  { 
    id: "medcheck", 
    title: "MedCheck", 
    desc: "Healthcare management system for tracking patient records and appointments.",
    tech: ["Next.js", "Prisma", "PostgreSQL"]
  },
  { 
    id: "traffic", 
    title: "Traffic", 
    desc: "Smart traffic simulation and optimization engine using AI.",
    tech: ["Python", "TensorFlow", "C++"]
  },
];

export default function ExecutionProjects({ activeProject, onClose }: { activeProject: string | null, onClose: () => void }) {
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [activeProject]);

  if (!activeProject) return null;

  const project = projectsData.find(p => p.id === activeProject);
  if (!project) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8 font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-3xl bg-gruv-bg border-2 border-gruv-yellow rounded-xl p-6 md:p-10 text-gruv-fg shadow-[0_0_50px_rgba(250,189,47,0.2)] relative z-[110] max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 text-gruv-gray hover:text-gruv-red transition-colors text-xs md:text-base"
        >
          [ Close X ]
        </button>

        <div className="text-gruv-gray mb-2 text-[10px] md:text-sm uppercase tracking-widest">{"// Linked object inspection"}</div>
        <h2 className="text-3xl md:text-5xl font-bold text-gruv-yellow mb-4 md:mb-6">{project.title}</h2>
        <p className="text-lg md:text-2xl text-gruv-fg mb-6 md:mb-10 leading-relaxed">{project.desc}</p>

        <div className="flex flex-wrap gap-2 md:gap-4 mb-8 md:mb-10">
          {project.tech.map((tech) => (
            <span key={tech} className="px-2 py-1 md:px-3 md:py-1 bg-gruv-bg-soft border border-gruv-blue text-gruv-blue rounded-md text-xs md:text-sm">
              {tech}
            </span>
          ))}
        </div>

        <Terminal
          commands={["./inspect"]}
          outputs={{
            0: [
              "Resolving artifact metadata... [OK]",
              "Loading dependencies... [OK]",
              "Portfolio object linked... [SUCCESS]",
            ],
          }}
          username={`visitor@compiler:~/projects/${project.title.toLowerCase()}`}
          className="max-w-none px-0"
          showTitleBar={false}
          typingSpeed={30}
          initialDelay={100}
        />
      </motion.div>
    </motion.div>
  );
}
