"use client";

import React from "react";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { motion } from "framer-motion";

export default function SignatureSection() {
  return (
    <section className="bg-gruv-bg py-20 flex flex-col items-center justify-center overflow-hidden border-t border-gruv-bg-soft">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-5xl"
      >
        <div className="h-[20rem] md:h-[30rem] w-full flex items-center justify-center">
          <TextHoverEffect text="BIMBOK" />
        </div>
        
        <div className="text-center -mt-10 md:-mt-20">
          <p className="text-gruv-gray font-mono text-xs md:text-sm uppercase tracking-[0.5em] opacity-50">
            {"// End of execution. Artifacts generated."}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
