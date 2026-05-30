"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 font-mono"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-3xl bg-gruv-bg border-2 border-gruv-yellow rounded-xl p-10 text-gruv-fg shadow-[0_0_50px_rgba(250,189,47,0.2)] relative z-[110]"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: 0.96 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gruv-gray hover:text-gruv-red transition-colors"
        >
          [ Close X ]
        </button>

        <div className="text-gruv-gray mb-2">{"// Linked object inspection"}</div>
        <h2 className="text-5xl font-bold text-gruv-yellow mb-6">{project.title}</h2>
        <p className="text-2xl text-gruv-fg mb-10 leading-relaxed">{project.desc}</p>

        <div className="flex gap-4 mb-10">
          {project.tech.map((tech) => (
            <span key={tech} className="px-3 py-1 bg-gruv-bg-soft border border-gruv-blue text-gruv-blue rounded-md text-sm">
              {tech}
            </span>
          ))}
        </div>

        <div className="bg-gruv-bg-soft p-6 rounded-lg text-sm font-mono text-gruv-aqua border border-gruv-bg-soft">
          <span className="text-gruv-gray">~/projects/{project.title.toLowerCase()} $</span> ./inspect <br/>
          &gt; Resolving artifact metadata... [OK]<br/>
          &gt; Loading dependencies... [OK]<br/>
          &gt; Portfolio object linked... <span className="text-gruv-green">[SUCCESS]</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
