// app/components/Starfield/Starfield.tsx
import { useEffect, useRef } from "react";
import { generateStars } from "./layers/stars";
import type { Star } from "./layers/stars";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // ---- STAR LAYERS (all white now) ----
    let farStars: Star[] = generateStars(100, width, height, [0.5, 1], [0.05, 0.15],);
    let midStars: Star[] = generateStars(50, width, height, [1, 1.5], [0.1, 0.2],);
    let nearStars: Star[] = generateStars(15, width, height, [1.5, 2.2], [0.3, 0.5],);

    const layers = [
      { stars: farStars, speed: 0.3 },
      { stars: midStars, speed: 0.6 },
      { stars: nearStars, speed: 1.0 },
    ];

    // Direction vector (diagonal drift like Among Us)
    const dx = -0.5;
    const dy = 0.5;

    function animate() {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      layers.forEach(({ stars, speed }) => {
        stars.forEach((star) => {
          ctx.fillStyle = "#ffffff"; // fixed white
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Move diagonally
          star.x += dx * speed;
          star.y += dy * speed;

          // Wrap around edges
          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
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
