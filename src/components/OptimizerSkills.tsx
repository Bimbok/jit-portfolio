"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Monitor, 
  Smartphone, 
  Terminal as TerminalIcon, 
  Code2, 
  Globe, 
  Atom, 
  Server, 
  FastForward, 
  Database, 
  Cpu,
  TrendingUp
} from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const skills = [
  { name: "TypeScript", level: 92, category: "Core", icon: <Code2 className="w-5 h-5" /> },
  { name: "Next.js", level: 85, category: "Framework", icon: <Globe className="w-5 h-5" /> },
  { name: "React", level: 90, category: "Framework", icon: <Atom className="w-5 h-5" /> },
  { name: "Kotlin", level: 84, category: "Android", icon: <Smartphone className="w-5 h-5" /> },
  { name: "Node.js", level: 85, category: "Runtime", icon: <Server className="w-5 h-5" /> },
  { name: "Go", level: 82, category: "CLI", icon: <FastForward className="w-5 h-5" /> },
  { name: "Python", level: 88, category: "AI/Data", icon: <Database className="w-5 h-5" /> },
  { name: "C/C++", level: 80, category: "Systems", icon: <Cpu className="w-5 h-5" /> },
];

const strategies = [
  {
    name: "Frontend UX",
    icon: <Monitor className="w-5 h-5" />,
    description: "Prioritize interactive web surfaces and motion-heavy UI.",
    boost: ["TypeScript", "Next.js", "React"],
  },
  {
    name: "Android Native",
    icon: <Smartphone className="w-5 h-5" />,
    description: "Prioritize offline-first mobile architecture and Kotlin UI.",
    boost: ["Kotlin", "TypeScript", "Node.js"],
  },
  {
    name: "Systems CLI",
    icon: <TerminalIcon className="w-5 h-5" />,
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
    <section className="min-h-screen bg-gruv-bg flex flex-col items-center justify-center px-6 py-12 md:py-24 font-mono relative overflow-hidden">
      <div className="z-10 mb-10 w-full max-w-6xl">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-aqua"
        >
          Phase 05
        </motion.p>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gruv-fg md:text-6xl">
              Optimization
            </h2>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-gruv-gray max-w-2xl mx-auto lg:mx-0">
              Optimization passes reshape the stack for the artifact being
              compiled, so frontend, Android, and systems work each get a
              different weight profile.
            </p>
          </motion.div>

          <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            {strategies.map((item, index) => (
              <motion.button
                key={item.name}
                type="button"
                onClick={() => setActiveStrategy(index)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`border p-4 text-left transition-colors flex flex-col gap-3 relative overflow-hidden group ${
                  activeStrategy === index
                    ? "border-gruv-yellow bg-gruv-yellow/10 text-gruv-yellow"
                    : "border-gruv-bg-soft bg-gruv-bg-soft/70 text-gruv-gray hover:border-gruv-gray hover:text-gruv-fg"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-bold text-sm md:text-base">{item.name}</div>
                  <div className={`${activeStrategy === index ? "text-gruv-yellow" : "text-gruv-gray group-hover:text-gruv-fg"}`}>
                    {item.icon}
                  </div>
                </div>
                <div className="text-[10px] md:text-xs leading-relaxed text-gruv-gray">
                  {item.description}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <div className="z-10 w-full max-w-6xl">
        <HoverEffect 
          items={skills}
          className="py-0"
          renderItem={(skill, i) => (
            <motion.div
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
              className={`p-6 bg-gruv-bg-soft border-b-4 rounded-lg flex flex-col gap-2 h-full relative group overflow-hidden ${
                strategy.boost.includes(skill.name)
                  ? "border-gruv-yellow shadow-[0_10px_30px_rgba(250,189,47,0.1)]"
                  : "border-gruv-aqua"
              }`}
            >
              <div className="absolute inset-0 bg-gruv-aqua/0 group-hover:bg-gruv-aqua/10 transition-colors pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gruv-aqua uppercase tracking-widest">{skill.category}</span>
                {strategy.boost.includes(skill.name) && (
                  <TrendingUp className="w-3 h-3 text-gruv-yellow animate-bounce" />
                )}
              </div>
              
              <div className="flex items-center gap-3 mt-1">
                <div className={`p-2 rounded-md ${strategy.boost.includes(skill.name) ? "bg-gruv-yellow/10 text-gruv-yellow" : "bg-gruv-bg text-gruv-aqua"}`}>
                  {skill.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gruv-fg">{skill.name}</h3>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gruv-gray">Weight:</span>
                <span className={`text-sm font-bold ${strategy.boost.includes(skill.name) ? "text-gruv-yellow" : "text-gruv-green"}`}>
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
          )}
        />
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
