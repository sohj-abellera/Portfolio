// app/components/Starfield/layers/stars.ts

export type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
};

export function generateStars(
  count: number,
  width: number,
  height: number,
  sizeRange: [number, number],
  speedRange: [number, number],
): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const size =
      Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0];
    const speed =
      Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];

    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size,
      speed,
    });
  }
  return stars;
}

export function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  width: number,
  height: number,
  dx: number,
  dy: number,
  speedFactor: number
) {
  for (const star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);

    // Pure white, no glow
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // Move diagonally (Among Us drift)
    star.x += dx * star.speed * speedFactor;
    star.y += dy * star.speed * speedFactor;

    // Wrap around edges
    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;
  }
}
