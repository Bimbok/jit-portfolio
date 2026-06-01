"use client";
import React from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

export default function GlobalImpactSection() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#282828",
    showAtmosphere: true,
    atmosphereColor: "#83a598",
    atmosphereAltitude: 0.15,
    emissive: "#282828",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(142,192,124,0.7)",
    ambientLight: "#8ec07c",
    directionalLeftLight: "#ebdbb2",
    directionalTopLight: "#ebdbb2",
    pointLight: "#ebdbb2",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.5726, lng: 88.3639 }, // Kolkata
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };
  const colors = ["#fabd2f", "#fb4934", "#83a598", "#8ec07c", "#d3869b"];
  const sampleArcs = [
    {
      order: 1,
      startLat: 22.5726,
      startLng: 88.3639, // Kolkata
      endLat: 40.7128,
      endLng: -74.006, // NY
      arcAlt: 0.3,
      color: colors[0],
    },
    {
      order: 2,
      startLat: 22.5726,
      startLng: 88.3639,
      endLat: 51.5074,
      endLng: -0.1278, // London
      arcAlt: 0.2,
      color: colors[1],
    },
    {
      order: 3,
      startLat: 22.5726,
      startLng: 88.3639,
      endLat: 35.6762,
      endLng: 139.6503, // Tokyo
      arcAlt: 0.4,
      color: colors[2],
    },
    {
      order: 4,
      startLat: 22.5726,
      startLng: 88.3639,
      endLat: -33.8688,
      endLng: 151.2093, // Sydney
      arcAlt: 0.5,
      color: colors[3],
    },
    {
      order: 5,
      startLat: 22.5726,
      startLng: 88.3639,
      endLat: 48.8566,
      endLng: 2.3522, // Paris
      arcAlt: 0.1,
      color: colors[4],
    },
  ];

  return (
    <section className="min-h-screen bg-gruv-bg flex flex-col items-center pt-24 pb-0 relative w-full overflow-hidden border-t border-gruv-bg-soft">
      <div className="max-w-7xl mx-auto w-full relative flex flex-col items-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-50 text-center max-w-3xl mb-10"
        >
          <p className="text-gruv-aqua text-sm uppercase tracking-[0.35em] mb-4">Phase 07: Global Linking</p>
          <h2 className="text-3xl md:text-6xl font-bold text-gruv-fg mb-6">
            Global Impact
          </h2>
          <div className="space-y-2 font-mono text-xs md:text-base text-gruv-gray">
            <p>{"// Managed 35+ global contributors across timezones."}</p>
            <p>{"// Scaling open-source software to 50+ PRs and 51+ forks."}</p>
            <p>{"// Directing CI/CD pipelines for cross-continental delivery."}</p>
          </div>
        </motion.div>
        
        {/* Globe Container */}
        <div className="relative w-full h-[35rem] md:h-[50rem] z-10 pointer-events-none flex items-center justify-center">
          <div className="w-full h-full scale-125 md:scale-100 flex items-center justify-center">
            <World data={sampleArcs} globeConfig={globeConfig} />
          </div>
          {/* Subtle overlay to fade the globe top */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-gruv-bg to-transparent z-20 h-32" />
        </div>

        {/* Bottom fade out */}
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-gruv-bg z-40" />
      </div>
    </section>
  );
}
