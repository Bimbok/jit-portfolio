"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "TypeScript", level: "Senior", category: "Core" },
  { name: "Next.js", level: "Expert", category: "Framework" },
  { name: "React", level: "Expert", category: "Framework" },
  { name: "GSAP", level: "Fluent", category: "Motion" },
  { name: "Node.js", level: "Senior", category: "Runtime" },
  { name: "Go", level: "Intermediate", category: "Logic" },
  { name: "Python", level: "Fluent", category: "Data" },
  { name: "Tailwind", level: "Expert", category: "Style" },
];

export default function OptimizerSkills() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <section className="min-h-screen bg-gruv-bg flex flex-col items-center justify-center p-10 font-mono relative overflow-hidden">
      <div className="absolute top-10 text-gruv-gray text-xl text-center">
        // Phase 2.5: The Optimizer<br/>
        // Compressing tech stack for peak performance.
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 z-10 w-full max-w-6xl">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ 
              scale: 1.05, 
              rotateX: 10, 
              rotateY: -10,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)" 
            }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
            className="p-6 bg-gruv-bg-soft border-b-4 border-gruv-aqua rounded-lg flex flex-col gap-2 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gruv-aqua/0 group-hover:bg-gruv-aqua/10 transition-colors pointer-events-none" />
            
            <span className="text-xs text-gruv-aqua uppercase tracking-widest">{skill.category}</span>
            <h3 className="text-2xl font-bold text-gruv-fg">{skill.name}</h3>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gruv-gray">Optimization:</span>
              <span className="text-sm text-gruv-green font-bold">[ {skill.level} ]</span>
            </div>

            <div className="w-full h-1 bg-gruv-bg mt-2 overflow-hidden rounded-full">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                className="h-full bg-gruv-aqua"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        {mounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gruv-aqua text-[10px]"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: 0.2 
            }}
            animate={{ 
              y: ["0%", "100%"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            010110
          </motion.div>
        ))}
      </div>
    </section>
  );
}
