import { useEffect, useRef } from "react";
import { generateStars } from "./layers/stars";
import type { Star } from "./layers/stars";

interface StarfieldProps {
  mode?: "normal" | "vertical" | "paused";
}

export default function Starfield({ mode = "normal" }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef<"normal" | "vertical" | "paused">(mode); // typed ref

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!; // ✅ force non-null
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const farStars: Star[] = generateStars(100, width, height, [0.5, 1], [0.05, 0.15]);
    const midStars: Star[] = generateStars(50, width, height, [1, 1.5], [0.1, 0.2]);
    const nearStars: Star[] = generateStars(15, width, height, [1.5, 2.2], [0.3, 0.5]);

    const layers = [
      { stars: farStars, speed: 0.3 },
      { stars: midStars, speed: 0.6 },
      { stars: nearStars, speed: 1.0 },
    ];

    function animate() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      layers.forEach(({ stars, speed }) => {
        stars.forEach((star) => {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          let dx = -0.5 * speed;
          let dy = 0.5 * speed;

          if (modeRef.current === "paused") {
            dx = 0;
            dy = 0;
          } else if (modeRef.current === "vertical") {
            dx = 0;
            dy = -10 * speed;
          }

          star.x += dx;
          star.y += dy;

          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
}
