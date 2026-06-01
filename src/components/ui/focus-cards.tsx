"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue } from "framer-motion";
import { generateRandomString, CardPattern } from "@/components/ui/evervault-card";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
    isActive,
  }: {
    card: {
      title: string;
      category: string;
      icon: React.ReactNode;
    };
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick?: () => void;
    isActive?: boolean;
  }) => {
    const [randomString, setRandomString] = useState(() => generateRandomString(1500));
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);

      const str = generateRandomString(1500);
      setRandomString(str);
    }

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        onMouseMove={onMouseMove}
        onClick={onClick}
        className={cn(
          "rounded-xl relative bg-gruv-bg-soft overflow-hidden h-40 md:h-60 w-full transition-all duration-300 ease-out cursor-pointer border-2 flex items-center justify-center group/card",
          hovered !== null && hovered !== index && "blur-[2px] scale-[0.98] opacity-50",
          isActive ? "border-gruv-yellow shadow-[0_0_20px_rgba(250,189,47,0.2)]" : "border-transparent hover:border-gruv-gray/50"
        )}
      >
        {/* Evervault Hover Pattern */}
        <CardPattern
          mouseX={mouseX}
          mouseY={mouseY}
          randomString={randomString}
        />

        {/* Memory Offset Chip */}
        <div className="absolute top-3 right-3 z-30">
          <div className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 text-[8px] md:text-[10px] font-mono text-gruv-orange uppercase tracking-tighter">
            Offset: 0x{((index + 1) * 1024).toString(16).toUpperCase()}
          </div>
        </div>
        
        {/* Large Themed Icon */}
        <div className={cn(
          "relative z-10 transition-all duration-500",
          hovered === index || isActive ? "scale-110 opacity-100" : "scale-100 opacity-40"
        )}>
          <div className={cn(
            "p-6 rounded-full bg-gruv-bg/50 border border-white/5 backdrop-blur-sm shadow-xl",
            isActive ? "text-gruv-yellow border-gruv-yellow/20" : "text-gruv-aqua"
          )}>
            {React.cloneElement(card.icon as React.ReactElement<{ size?: number }>, { size: 48 })}
          </div>
        </div>

        {/* Bottom Info Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-4 transition-opacity duration-300",
            hovered === index || isActive ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex items-center justify-between mb-1">
            <div className="text-[10px] text-gruv-yellow font-mono uppercase tracking-widest">{card.category}</div>
            <div className="text-[8px] text-gruv-gray font-mono uppercase">Density: 84%</div>
          </div>
          <div className="text-xl font-bold text-gruv-fg font-mono mb-2">
            {card.title}
          </div>
          
          {/* Byte Density Bar */}
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: hovered === index || isActive ? "84%" : "0%" }}
              className="h-full bg-gruv-aqua"
            />
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

type CardData = {
  title: string;
  category: string;
  icon: React.ReactNode;
};

export function FocusCards({ 
  cards, 
  activeCardIndex, 
  onCardClick 
}: { 
  cards: CardData[], 
  activeCardIndex?: number,
  onCardClick?: (index: number) => void
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
          onClick={() => onCardClick?.(index)}
          isActive={activeCardIndex === index}
        />
      ))}
    </div>
  );
}
