import { useEffect, useRef } from "react";

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log("Starfield mounted ✨");

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    // 👆 the "!" tells TS: this will not be null, trust me

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const numStars = 30000;
    const focalLength = width;
    const stars: {
      x: number;
      y: number;
      z: number;
      baseSize: number;
      baseBrightness: number;
      blinkSpeed: number;
      blinkOffset: number;
      glowing: boolean;
      color: string;
    }[] = [];

    // star color palette
    const colors = [
      { color: "rgba(170,200,255,", weight: 0.15 }, // blue-white
      { color: "rgba(255,255,255,", weight: 0.45 }, // white
      { color: "rgba(255,244,200,", weight: 0.25 }, // yellow
      { color: "rgba(255,200,150,", weight: 0.1 }, // orange
      { color: "rgba(255,180,180,", weight: 0.05 }, // red
    ];

    function getRandomColor() {
      let total = colors.reduce((sum, c) => sum + c.weight, 0);
      let rand = Math.random() * total;
      for (let c of colors) {
        if (rand < c.weight) return c.color;
        rand -= c.weight;
      }
      return colors[1].color; // fallback white
    }

    // create stars in 3D space
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,

        baseSize: Math.random() * 1.5 + 0.5,
        baseBrightness: Math.random() * 0.8 + 0.2,
        blinkSpeed: Math.random() * 0.05 + 0.01,
        blinkOffset: Math.random() * Math.PI * 2,

        glowing: Math.random() < 0.1,
        color: getRandomColor(),
      });
    }

    let tick = 0;
    let animationFrameId: number;

    function animate() {
      tick += 0.05;

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];

        // Move forward
        star.z -= 0.05;
        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = width;
        }

        // 3D → 2D projection
        const k = focalLength / star.z;
        const sx = star.x * k + width / 2;
        const sy = star.y * k + height / 2;

        const size = star.baseSize * (1 - star.z / width);

        // Twinkle brightness
        const blink =
          Math.sin(tick * star.blinkSpeed + star.blinkOffset) * 0.5 + 0.5;
        const brightness = star.baseBrightness * (0.5 + blink * 0.5);

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          if (star.glowing) {
            ctx.shadowBlur = 10 * size;
            ctx.shadowColor = `${star.color}${brightness})`;
          } else {
            ctx.shadowBlur = 0;
            ctx.shadowColor = "transparent";
          }

          ctx.fillStyle = `${star.color}${brightness})`;
          ctx.beginPath();
          ctx.arc(sx, sy, size, 0, 2 * Math.PI);
          ctx.fill();

          // reset shadow
          ctx.shadowBlur = 0;
          ctx.shadowColor = "transparent";
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
}
