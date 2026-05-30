"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "TypeScript", level: 92, category: "Core" },
  { name: "Next.js", level: 85, category: "Framework" },
  { name: "React", level: 90, category: "Framework" },
  { name: "Kotlin", level: 84, category: "Android" },
  { name: "Node.js", level: 85, category: "Runtime" },
  { name: "Go", level: 82, category: "CLI" },
  { name: "Python", level: 88, category: "AI/Data" },
  { name: "C/C++", level: 80, category: "Systems" },
];

const strategies = [
  {
    name: "Frontend UX",
    description: "Prioritize interactive web surfaces and motion-heavy UI.",
    boost: ["TypeScript", "Next.js", "React"],
  },
  {
    name: "Android Native",
    description: "Prioritize offline-first mobile architecture and Kotlin UI.",
    boost: ["Kotlin", "TypeScript", "Node.js"],
  },
  {
    name: "Systems CLI",
    description: "Prioritize terminal tooling, low-level performance, and automation.",
    boost: ["C/C++", "Go", "Python"],
  },
];

const binaryRain = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  x: `${(index * 37) % 100}%`,
  y: `${(index * 53) % 100}%`,
  duration: 5 + (index % 7),
}));

export default function OptimizerSkills() {
  const [activeStrategy, setActiveStrategy] = useState(0);
  const strategy = strategies[activeStrategy];

  return (
    <section className="min-h-screen bg-gruv-bg flex flex-col items-center justify-center px-6 py-24 font-mono relative overflow-hidden">
      <div className="z-10 mb-10 w-full max-w-6xl">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-aqua">
          Phase 05
        </p>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <h2 className="text-4xl font-bold text-gruv-fg md:text-6xl">
              Optimization
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-gruv-gray">
              Optimization passes reshape the stack for the artifact being
              compiled, so frontend, Android, and systems work each get a
              different weight profile.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {strategies.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActiveStrategy(index)}
                className={`border p-4 text-left transition-colors ${
                  activeStrategy === index
                    ? "border-gruv-yellow bg-gruv-yellow/10 text-gruv-yellow"
                    : "border-gruv-bg-soft bg-gruv-bg-soft/70 text-gruv-gray hover:border-gruv-gray hover:text-gruv-fg"
                }`}
              >
                <div className="font-bold">{item.name}</div>
                <div className="mt-2 text-xs leading-relaxed text-gruv-gray">
                  {item.description}
                </div>
              </button>
            ))}
          </div>
        </div>
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
            className={`p-6 bg-gruv-bg-soft border-b-4 rounded-lg flex flex-col gap-2 relative group overflow-hidden ${
              strategy.boost.includes(skill.name)
                ? "border-gruv-yellow"
                : "border-gruv-aqua"
            }`}
          >
            <div className="absolute inset-0 bg-gruv-aqua/0 group-hover:bg-gruv-aqua/10 transition-colors pointer-events-none" />
            
            <span className="text-xs text-gruv-aqua uppercase tracking-widest">{skill.category}</span>
            <h3 className="text-2xl font-bold text-gruv-fg">{skill.name}</h3>
            
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gruv-gray">Weight:</span>
              <span className="text-sm text-gruv-green font-bold">
                [ {strategy.boost.includes(skill.name) ? skill.level + 8 : skill.level}% ]
              </span>
            </div>

            <div className="w-full h-1 bg-gruv-bg mt-2 overflow-hidden rounded-full">
              <motion.div
                key={`${activeStrategy}-${skill.name}`}
                initial={{ width: 0 }}
                animate={{
                  width: `${Math.min(
                    strategy.boost.includes(skill.name)
                      ? skill.level + 8
                      : skill.level,
                    100,
                  )}%`,
                }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
                className={`h-full ${
                  strategy.boost.includes(skill.name)
                    ? "bg-gruv-yellow"
                    : "bg-gruv-aqua"
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        {binaryRain.map((bit) => (
          <motion.div
            key={bit.id}
            className="absolute text-gruv-aqua text-[10px]"
            initial={{
              x: bit.x,
              y: bit.y,
              opacity: 0.2,
            }}
            animate={{
              y: ["0%", "100%"],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: bit.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            010110
          </motion.div>
        ))}
      </div>
    </section>
  );
}
