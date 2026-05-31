"use client";

import React from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { motion } from "framer-motion";
import { Image as ImageIcon, MousePointer2 } from "lucide-react";

export default function PixelatedCanvasSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gruv-bg px-6 py-12 md:py-24 font-mono border-t border-gruv-bg-soft">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="text-center lg:text-left order-2 lg:order-1">
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-orange">
            Visual Buffer
          </p>
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
            <ImageIcon className="w-6 h-6 md:w-8 md:h-8 text-gruv-orange" />
            <h2 className="text-3xl font-bold text-gruv-fg md:text-6xl">
              Visual Rendering
            </h2>
          </div>
          <p className="text-base md:text-lg leading-relaxed text-gruv-gray max-w-xl mx-auto lg:mx-0 mb-8">
            Artifacts aren't just code. The pipeline renders visual experiences
            using hardware-accelerated buffers and interactive distortion filters.
          </p>
          
          <div className="bg-gruv-bg-soft/30 border border-gruv-bg-soft p-6 rounded-xl inline-block text-left w-full lg:w-auto">
            <div className="flex items-center gap-3 text-gruv-aqua mb-4">
              <MousePointer2 className="w-4 h-4 animate-pulse" />
              <span className="text-sm uppercase tracking-widest">Interactive distortion</span>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-gruv-gray">
              <li className="flex gap-2">
                <span className="text-gruv-orange">01.</span>
                <span>Move cursor over the canvas to distort pixels.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gruv-orange">02.</span>
                <span>Swirl mode enabled with dynamic jitter.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gruv-orange">03.</span>
                <span>Adaptive dropout for high-contrast edges.</span>
              </li>
            </ul>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mx-auto lg:mx-0 order-1 lg:order-2 w-fit h-fit"
        >
          <div className="absolute -inset-4 bg-gruv-orange/5 blur-3xl rounded-full" />
          <div className="relative">
            <PixelatedCanvas
              src="/bimbok.png"
              width={400}
              height={500}
              cellSize={3}
              dotScale={0.9}
              shape="square"
              backgroundColor="#282828"
              dropoutStrength={0.4}
              interactive
              distortionStrength={3}
              distortionRadius={80}
              distortionMode="swirl"
              followSpeed={0.2}
              jitterStrength={4}
              jitterSpeed={4}
              sampleAverage
              tintColor="#FFFFFF"
              tintStrength={0.2}
              className="rounded-xl border border-gruv-bg-soft shadow-2xl relative z-10 w-full max-w-[320px] md:max-w-[400px] h-auto block"
            />
            
            {/* Decorative frame elements */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gruv-orange/30 -translate-x-2 -translate-y-2 z-20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gruv-orange/30 translate-x-2 translate-y-2 z-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
