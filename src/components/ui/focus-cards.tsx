"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
    onClick,
    isActive,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick?: () => void;
    isActive?: boolean;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onClick={onClick}
      className={cn(
        "rounded-xl relative bg-gruv-bg-soft overflow-hidden h-40 md:h-60 w-full transition-all duration-300 ease-out cursor-pointer border-2",
        hovered !== null && hovered !== index && "blur-[2px] scale-[0.98] opacity-50",
        isActive ? "border-gruv-yellow shadow-[0_0_20px_rgba(250,189,47,0.2)]" : "border-transparent hover:border-gruv-gray/50"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/60 flex flex-col justify-end p-4 transition-opacity duration-300",
          hovered === index || isActive ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="text-xs text-gruv-yellow mb-1 font-mono uppercase tracking-widest">{card.category}</div>
        <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200 font-mono">
          {card.title}
        </div>
      </div>
    </div>
  )
);

Card.displayName = "Card";

type CardData = {
  title: string;
  src: string;
  category: string;
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
