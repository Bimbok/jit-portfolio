"use client";

import React, { useState } from "react";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import { motion } from "framer-motion";
import { Image as ImageIcon, MousePointer2 } from "lucide-react";
import { ImageGallery } from "@/components/ui/ImageGallery";

export default function PixelatedCanvasSection() {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gruv-bg px-4 py-14 font-mono border-t border-gruv-bg-soft sm:px-6 md:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="order-2 w-full min-w-0 text-center lg:order-1 lg:text-left"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-gruv-orange">
            Visual Buffer
          </p>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              onClick={() => setIsGalleryOpen(true)}
              className="group relative flex items-center justify-center rounded-lg border border-gruv-orange/20 p-2 transition-all hover:bg-gruv-orange/10 active:scale-95"
              title="Open Image Gallery"
            >
              <ImageIcon className="h-5 w-5 text-gruv-orange transition-transform group-hover:scale-110 md:h-8 md:w-8" />
              <div className="absolute -inset-1 animate-pulse rounded-lg bg-gruv-orange/5 blur-sm group-hover:bg-gruv-orange/20" />
            </button>
            <h2 className="text-2xl font-bold leading-tight text-gruv-fg sm:text-3xl md:text-6xl">
              Visual Rendering
            </h2>
          </div>
          <p className="mx-auto mb-8 max-w-xl text-pretty text-base leading-relaxed text-gruv-gray md:text-lg lg:mx-0">
            Artifacts are not just code. The pipeline renders visual experiences
            using hardware-accelerated buffers and interactive distortion filters.
          </p>
          
          <div className="w-full rounded-xl border border-gruv-bg-soft bg-gruv-bg-soft/30 p-4 text-left sm:p-6 lg:max-w-xl">
            <div className="mb-4 flex items-center gap-3 text-gruv-aqua">
              <MousePointer2 className="h-4 w-4 shrink-0 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] sm:text-sm">
                Interactive distortion
              </span>
            </div>
            <ul className="space-y-2 text-xs md:text-sm text-gruv-gray">
              {[
                { id: "01.", text: "Move cursor over the canvas to distort pixels." },
                { id: "02.", text: "Swirl mode enabled with dynamic jitter." },
                { id: "03.", text: "Adaptive dropout for high-contrast edges." },
              ].map((item, i) => (
                <motion.li 
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex gap-2 leading-relaxed"
                >
                  <span className="shrink-0 text-gruv-orange">{item.id}</span>
                  <span className="min-w-0">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative order-1 mx-auto flex w-full max-w-[280px] items-center justify-center sm:max-w-[340px] md:max-w-[400px] lg:order-2 lg:mx-0 lg:justify-self-end"
        >
          <div className="absolute -inset-4 bg-gruv-orange/5 blur-3xl rounded-full" />
          <div className="relative w-full">
            <PixelatedCanvas
              src="/bimbok.png"
              width={400}
              height={500}
              responsive
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
              className="relative z-10 block rounded-xl border border-gruv-bg-soft shadow-2xl"
            />
            
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gruv-orange/30 -translate-x-2 -translate-y-2 z-20" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gruv-orange/30 translate-x-2 translate-y-2 z-20" />
          </div>
        </motion.div>
      </div>

      <ImageGallery 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
      />
    </section>
  );
}

