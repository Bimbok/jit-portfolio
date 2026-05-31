"use client";

import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { motion } from "framer-motion";

export default function TracingBeamSection() {
  return (
    <section className="relative bg-[#202020] px-6 py-24 font-mono border-t border-gruv-bg-soft overflow-hidden">
      <div className="max-w-4xl mx-auto mb-16 text-center lg:text-left">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-blue"
        >
          System Logs
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-gruv-fg md:text-6xl"
        >
          Pipeline History
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-6 text-base md:text-lg leading-relaxed text-gruv-gray max-w-2xl mx-auto lg:mx-0"
        >
          Trace the evolution of the compiler architecture, from initial lexical
          analysis to complex bytecode optimization and interactive artifact rendering.
        </motion.p>
      </div>

      <TracingBeam className="px-6">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {historyLogs.map((item, index) => (
            <motion.div 
              key={`log-${index}`} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <h3 className="bg-gruv-bg-soft text-gruv-yellow border border-gruv-yellow/30 rounded-full text-xs w-fit px-4 py-1 mb-6 uppercase tracking-widest">
                {item.phase}
              </h3>

              <p className="text-2xl font-bold text-gruv-fg mb-4">
                {item.title}
              </p>

              <div className="text-sm md:text-base leading-relaxed text-gruv-gray space-y-4">
                {item?.image && (
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gruv-blue/20 to-gruv-aqua/20 blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                    <img
                      src={item.image}
                      alt="System trace thumbnail"
                      className="rounded-lg mb-8 object-cover border border-gruv-bg-soft relative grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                )}
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>
      </TracingBeam>
    </section>
  );
}

const historyLogs = [
  {
    title: "The Birth of Sizuka Runtime",
    phase: "Phase 00: Foundation",
    description: (
      <div className="space-y-4">
        <p>
          The architecture began with a single goal: creating a type-safe, interpreted 
          language running on the JVM. The initial lexer was hand-rolled to ensure 
          maximum performance and zero-dependency operation.
        </p>
        <p>
          "Low-level logic shouldn't feel low-level to the developer." This mantra 
          drove the creation of the first intermediate representation, allowing 
          complex AST structures to be lowered into efficient bytecode blocks.
        </p>
      </div>
    ),
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
  },
  {
    title: "Optimizing for the Edge",
    phase: "Phase 05: Refinement",
    description: (
      <div className="space-y-4">
        <p>
          As the pipeline evolved, we introduced the global optimization engine. 
          Each artifact—be it a web bundle or a native APK—now undergoes 
          context-aware dead code elimination and constant folding.
        </p>
        <p>
          The results were immediate: a 40% reduction in cold-start times for 
          CLI tools and near-instant hydration for modern web artifacts.
        </p>
      </div>
    ),
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072",
  },
  {
    title: "Interactive Artifact Rendering",
    phase: "Phase 07: Execution",
    description: (
      <div className="space-y-4">
        <p>
          The final piece of the puzzle: visual rendering. By integrating 
          hardware-accelerated canvas buffers, the compiler now emits rich, 
          interactive previews of the built objects.
        </p>
      </div>
    ),
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=2070",
  },
];
