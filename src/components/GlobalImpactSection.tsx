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
    <section className="min-h-screen bg-gruv-bg flex flex-col items-center justify-center py-20 relative w-full overflow-hidden border-t border-gruv-bg-soft">
      <div className="max-w-7xl mx-auto w-full relative h-[40rem] md:h-[50rem] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-50 text-center"
        >
          <p className="text-gruv-aqua text-sm uppercase tracking-[0.35em] mb-4">Phase 07: Global Linking</p>
          <h2 className="text-3xl md:text-6xl font-bold text-gruv-fg">
            Global Impact
          </h2>
          <p className="text-gruv-gray text-base md:text-lg max-w-2xl mt-4 mx-auto font-mono">
            {"// Managed 35+ global contributors across timezones."}<br/>
            {"// Scaling open-source software to 50+ PRs and 51+ forks."}<br/>
            {"// Directing CI/CD pipelines for cross-continental delivery."}
          </p>
        </motion.div>
        
        <div className="absolute w-full bottom-0 inset-x-0 h-40 bg-gradient-to-b pointer-events-none select-none from-transparent to-gruv-bg z-40" />
        <div className="absolute w-full inset-0 h-full z-10 scale-125 md:scale-100">
          <World data={sampleArcs} globeConfig={globeConfig} />
        </div>
      </div>
    </section>
  );
}
