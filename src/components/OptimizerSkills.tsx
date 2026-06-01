"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Terminal as TerminalIcon,
  TrendingUp,
} from "lucide-react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { GlareCard } from "@/components/ui/glare-card";
import { cn } from "@/lib/utils";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const BrandIcon = ({ src, name }: { src: string; name: string }) => (
  <Image
    src={src}
    alt={`${name} icon`}
    width={24}
    height={24}
    className="h-8 w-8 object-contain"
  />
);

const iconUrls = {
  typescript:
    "https://img.icons8.com/?size=100&id=uJM6fQYqDaZK&format=png&color=000000",
  react: "https://img.icons8.com/color/100/react-native.png",
  nextjs:
    "https://img.icons8.com/?size=100&id=MWiBjkuHeMVq&format=png&color=000000",
  kotlin: "https://img.icons8.com/color/100/kotlin.png",
  nodejs: "https://img.icons8.com/color/100/nodejs.png",
  go: "https://img.icons8.com/color/100/golang.png",
  python: "https://img.icons8.com/color/100/python.png",
  java: "https://img.icons8.com/color/100/java-coffee-cup-logo.png",
  linux:
    "https://img.icons8.com/?size=100&id=7seppVX8x2nf&format=png&color=000000",
  cli: "https://img.icons8.com/?size=100&id=WbRVMGxHh74X&format=png&color=000000",
  bash: "https://img.icons8.com/?size=100&id=50ZQHdJTmPqw&format=png&color=000000",
  mongodb:
    "https://img.icons8.com/?size=100&id=8rKdRqZFLurS&format=png&color=000000",
  postgresql: "https://img.icons8.com/color/100/postgreesql.png",
  flask:
    "https://img.icons8.com/?size=100&id=hCWb1IvpcBZ0&format=png&color=000000",
  socketio: "https://img.icons8.com/color/100/network.png",
  devops:
    "https://img.icons8.com/?size=100&id=BejoiOeRfYSo&format=png&color=000000",
  assembly: "https://img.icons8.com/color/100/assembly.png",
  agenticai: "https://img.icons8.com/color/100/artificial-intelligence.png",
};

const skills = [
  {
    name: "TypeScript",
    level: 92,
    category: "Core",
    icon: <BrandIcon src={iconUrls.typescript} name="TypeScript" />,
  },
  {
    name: "Next.js",
    level: 85,
    category: "Framework",
    icon: <BrandIcon src={iconUrls.nextjs} name="Next.js" />,
  },
  {
    name: "React",
    level: 90,
    category: "Framework",
    icon: <BrandIcon src={iconUrls.react} name="React" />,
  },
  {
    name: "Kotlin",
    level: 84,
    category: "Android",
    icon: <BrandIcon src={iconUrls.kotlin} name="Kotlin" />,
  },
  {
    name: "Node.js",
    level: 85,
    category: "Runtime",
    icon: <BrandIcon src={iconUrls.nodejs} name="Node.js" />,
  },
  {
    name: "Go",
    level: 82,
    category: "CLI",
    icon: <BrandIcon src={iconUrls.go} name="Go" />,
  },
  {
    name: "Shell Scripting",
    level: 82,
    category: "CLI",
    icon: <BrandIcon src={iconUrls.bash} name="Bash" />,
  },

  {
    name: "Python",
    level: 88,
    category: "AI/Data",
    icon: <BrandIcon src={iconUrls.python} name="Python" />,
  },
  {
    name: "Java",
    level: 80,
    category: "Backend",
    icon: <BrandIcon src={iconUrls.java} name="Java" />,
  },
  {
    name: "Linux (Arch Linux)",
    level: 85,
    category: "OS",
    icon: <BrandIcon src={iconUrls.linux} name="Linux" />,
  },
  {
    name: "CLI Tooling",
    level: 88,
    category: "CLI",
    icon: <BrandIcon src={iconUrls.cli} name="CLI tooling" />,
  },
  {
    name: "MongoDB",
    level: 75,
    category: "Database",
    icon: <BrandIcon src={iconUrls.mongodb} name="MongoDB" />,
  },
  {
    name: "PostgreSQL",
    level: 85,
    category: "Database",
    icon: <BrandIcon src={iconUrls.postgresql} name="PostgreSQL" />,
  },
  {
    name: "Flask",
    level: 82,
    category: "Framework",
    icon: <BrandIcon src={iconUrls.flask} name="Flask" />,
  },
  {
    name: "Socket.IO",
    level: 78,
    category: "Network",
    icon: <BrandIcon src={iconUrls.socketio} name="Socket.IO" />,
  },
  {
    name: "DevOps",
    level: 80,
    category: "Ops",
    icon: <BrandIcon src={iconUrls.devops} name="DevOps" />,
  },
  {
    name: "Assembly",
    level: 75,
    category: "Systems",
    icon: <BrandIcon src={iconUrls.assembly} name="Assembly" />,
  },
  {
    name: "Agentic AI",
    level: 85,
    category: "AI",
    icon: <BrandIcon src={iconUrls.agenticai} name="Agentic AI" />,
  },
];

const strategies = [
  {
    name: "Frontend UX",
    icon: <Monitor className="w-5 h-5" />,
    description: "Prioritize interactive web surfaces and motion-heavy UI.",
    boost: ["TypeScript", "Next.js", "React", "Socket.IO"],
  },
  {
    name: "Android Native",
    icon: <Smartphone className="w-5 h-5" />,
    description: "Prioritize offline-first mobile architecture and Kotlin UI.",
    boost: ["Kotlin", "TypeScript", "Node.js", "Java"],
  },
  {
    name: "Systems CLI",
    icon: <TerminalIcon className="w-5 h-5" />,
    description:
      "Prioritize terminal tooling, low-level performance, and automation.",
    boost: ["Go/Shell", "Python", "Linux", "CLI Tooling", "Assembly"],
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
          className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-aqua text-center lg:text-left"
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
            <TypewriterEffect
              words={[
                {
                  text: "Optimization",
                  className:
                    "text-2xl font-bold text-gruv-fg md:text-6xl text-left",
                },
              ]}
              className="text-left mb-6"
              cursorClassName="bg-gruv-yellow h-6 md:h-12"
            />
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
                  <div className="font-bold text-sm md:text-base">
                    {item.name}
                  </div>
                  <div
                    className={`${activeStrategy === index ? "text-gruv-yellow" : "text-gruv-gray group-hover:text-gruv-fg"}`}
                  >
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
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
              className="h-full"
            >
              <GlareCard
                className={cn(
                  "p-6 flex flex-col gap-2 h-full relative group overflow-hidden border-b-4",
                  strategy.boost.includes(skill.name)
                    ? "border-gruv-yellow shadow-[0_10px_30px_rgba(250,189,47,0.1)]"
                    : "border-gruv-aqua",
                )}
              >
                <div className="absolute inset-0 bg-gruv-aqua/0 group-hover:bg-gruv-aqua/10 transition-colors pointer-events-none" />

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gruv-aqua uppercase tracking-widest">
                    {skill.category}
                  </span>
                  {strategy.boost.includes(skill.name) && (
                    <TrendingUp className="w-3 h-3 text-gruv-yellow animate-bounce" />
                  )}
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <div
                    className={`p-2 rounded-md ${strategy.boost.includes(skill.name) ? "bg-gruv-yellow/10 text-gruv-yellow" : "bg-gruv-bg text-gruv-aqua"}`}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gruv-fg truncate">
                    {skill.name}
                  </h3>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gruv-gray">Weight:</span>
                  <span
                    className={`text-xs font-bold ${strategy.boost.includes(skill.name) ? "text-gruv-yellow" : "text-gruv-green"}`}
                  >
                    [{" "}
                    {strategy.boost.includes(skill.name)
                      ? skill.level + 8
                      : skill.level}
                    % ]
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
                    transition={{ duration: 1.5, delay: i * 0.05 }}
                    className={`h-full ${
                      strategy.boost.includes(skill.name)
                        ? "bg-gruv-yellow"
                        : "bg-gruv-aqua"
                    }`}
                  />
                </div>
              </GlareCard>
            </motion.div>
          )}
        />
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        {binaryRain.map((bit) => (
          <motion.div
            key={bit.id}
            className="absolute text-[8px] text-gruv-aqua whitespace-nowrap"
            initial={{ x: bit.x, y: "-10%" }}
            animate={{ y: "110%" }}
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
