"use client";

import React, { useRef, useEffect } from "react";

export default function KineticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width: number;
    let height: number;
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    resize();

    const dots: { x: number; y: number }[] = [];
    const spacing = 30;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#ebdbb2"; // gruv-fg

      for (let x = spacing / 2; x < width; x += spacing) {
        for (let y = spacing / 2; y < height; y += spacing) {
          const dist = Math.sqrt((x - mouse.x) ** 2 + (y - mouse.y) ** 2);
          const maxDist = 150;
          let size = 1;
          let opacity = 0.05;

          if (dist < maxDist) {
            const ratio = 1 - dist / maxDist;
            size = 1 + ratio * 2;
            opacity = 0.05 + ratio * 0.2;
          }

          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
