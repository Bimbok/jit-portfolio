"use client";

import React from "react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { motion } from "framer-motion";

export default function TracingBeamSection() {
  return (
    <section className="relative bg-[#202020] px-4 py-24 md:px-6 font-mono border-t border-gruv-bg-soft overflow-hidden">
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
          Trace the evolution of the architecture, from its foundational lexical
          analysis to its robust tree-walk interpretation and dynamic memory
          management.
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
              className="mb-24"
            >
              <h3 className="bg-gruv-bg-soft text-gruv-yellow border border-gruv-yellow/30 rounded-full text-[10px] md:text-xs w-fit px-4 py-1 mb-6 uppercase tracking-widest">
                {item.phase}
              </h3>

              <p className="text-xl md:text-3xl font-bold text-gruv-fg mb-6">
                {item.title}
              </p>

              <div className="text-sm md:text-base leading-relaxed text-gruv-gray space-y-6">
                {item?.image && (
                  <CardContainer className="w-full py-0">
                    <CardBody className="relative group/card w-full h-auto">
                      <CardItem translateZ="100" className="w-full">
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-gruv-blue/20 to-gruv-aqua/20 blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                          <img
                            src={item.image}
                            alt="System trace thumbnail"
                            className="rounded-lg mb-8 object-cover border border-gruv-bg-soft relative grayscale hover:grayscale-0 transition-all duration-500 w-full"
                          />
                        </div>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
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
          The architecture began with a single goal: creating a conversational,
          dynamically typed interpreted language running on the JVM. The initial
          lexer (<code className="text-gruv-aqua">Scanner.java</code>) was
          hand-rolled to ensure maximum performance, zero-dependency operation,
          and complete control over the token stream.
        </p>
        <p>
          <span className="italic text-gruv-fg">
            "Syntax should feel like a command, not an equation."
          </span>
          This mantra drove the creation of the first intermediate
          representation (AST), dropping traditional heavy boilerplate in favor
          of intuitive commands like
          <code className="text-gruv-yellow">out</code> and{" "}
          <code className="text-gruv-yellow">in</code>, parsed cleanly by a
          custom recursive descent parser.
        </p>
      </div>
    ),
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2070",
  },
  {
    title: "Mastering Lexical Scoping and Turing Completeness",
    phase: "Phase 03: Control Flow",
    description: (
      <div className="space-y-4">
        <p>
          As the pipeline evolved, we introduced the{" "}
          <code className="text-gruv-aqua">Environment</code>
          engine to handle dynamic lexical scoping. The language moved beyond
          linear execution, deeply integrating complex AST structures to support
          conditional logic.
        </p>
        <p>
          The results were immediate: by implementing the classic{" "}
          <code className="text-gruv-yellow">while</code>
          loop alongside the uniquely conversational{" "}
          <code className="text-gruv-yellow">from ... to</code>
          structure, Sizuka achieved Turing completeness, capable of handling
          infinite nesting and complex logical expressions safely within the
          JVM.
        </p>
      </div>
    ),
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2070",
  },
  {
    title: "Dynamic Memory and the 'Pack' Engine",
    phase: "Phase 05: Data Structures",
    description: (
      <div className="space-y-4">
        <p>
          To handle complex algorithms without relying on recursive call stacks,
          the architecture required a robust memory structure. The{" "}
          <code className="text-gruv-yellow">pack</code>
          data structure was engineered—a highly flexible, heterogeneous array
          system backed dynamically by Java's{" "}
          <code className="text-gruv-aqua">ArrayList</code>.
        </p>
        <p>
          By hooking <code className="text-gruv-orange">IndexGet</code> and
          <code className="text-gruv-orange">IndexSet</code> operations into the
          highest precedence levels of the parser, Sizuka bridged the gap
          between high-level scripting and low-level memory mutation, allowing
          for real-time list allocation and dynamic indexing.
        </p>
      </div>
    ),
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=2070",
  },
  {
    title: "The Visitor Pattern Interpreter",
    phase: "Phase 07: Execution",
    description: (
      <div className="space-y-4">
        <p>
          The final piece of the puzzle: real-time execution. By implementing
          the classic Visitor design pattern, the compiler traverses the deeply
          nested Abstract Syntax Tree in real-time.
        </p>
        <p>
          The <code className="text-gruv-aqua">Interpreter.java</code> acts as
          the beating heart of Sizuka, seamlessly mapping custom AST nodes to
          native Java bytecode operations. This architecture achieved highly
          optimized sub-100ms runtimes for manual-stack sorting algorithms,
          proving Sizuka as a capable, embeddable scripting engine.
        </p>
      </div>
    ),
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2070",
  },
];
