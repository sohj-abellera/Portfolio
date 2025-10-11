"use client";

import { useEffect, useRef } from "react";

export default function AlienCity() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.35; // about top 35% of footer
      drawCity();
    };

    const drawCity = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // gradient sky
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "rgba(25,30,60,0.4)");
      g.addColorStop(1, "rgba(0,0,0,1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // procedural buildings
      const buildingCount = Math.floor(w / 40);
      for (let i = 0; i < buildingCount; i++) {
        const x = i * (w / buildingCount);
        const bw = 20 + Math.random() * 40;
        const bh = h * (0.3 + Math.random() * 0.6);
        const hue = 220 + Math.random() * 100;
        ctx.fillStyle = `hsl(${hue},40%,${30 + Math.random() * 10}%)`;
        ctx.fillRect(x, h - bh, bw, bh);

        // antennas / domes
        if (Math.random() > 0.7) {
          ctx.beginPath();
          ctx.arc(x + bw / 2, h - bh - 6, 4 + Math.random() * 4, 0, Math.PI * 2);
          ctx.fillStyle = `hsl(${hue + 40},70%,60%)`;
          ctx.fill();
        }

        // glowing windows
        for (let j = 0; j < 6; j++) {
          if (Math.random() > 0.6) {
            const wx = x + 4 + Math.random() * (bw - 8);
            const wy = h - bh + Math.random() * (bh - 8);
            ctx.fillStyle = `rgba(255,${200 + Math.random() * 55},${100 + Math.random() * 155},0.6)`;
            ctx.fillRect(wx, wy, 2, 4);
          }
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full"
      style={{ pointerEvents: "none" }}
    />
  );
}
