// app/components/TabletScreen.tsx

type Margins = {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  
  function makeOctagon(cut: number, margins: Margins = {}): string {
    const top = margins.top ?? 0;
    const right = margins.right ?? 0;
    const bottom = margins.bottom ?? 0;
    const left = margins.left ?? 0;
  
    return [
      `${left + cut},${top}`,
      `${100 - right - cut},${top}`,
      `${100 - right},${top + cut}`,
      `${100 - right},${100 - bottom - cut}`,
      `${100 - right - cut},${100 - bottom}`,
      `${left + cut},${100 - bottom}`,
      `${left},${100 - bottom - cut}`,
      `${left},${top + cut}`,
    ].join(" ");
  }
  
  function getPointsArray(points: string): [number, number][] {
    return points.split(" ").map((p) => {
      const [x, y] = p.split(",").map(Number);
      return [x, y];
    });
  }
  
  function extendPoint(
    [x1, y1]: [number, number],
    [x2, y2]: [number, number],
    length: number
  ): [number, number] {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const ux = dx / dist;
    const uy = dy / dist;
    return [x1 + ux * length, y1 + uy * length];
  }
  
  interface TabletScreenProps {
    baseColor?: string;
    layer1Color?: string;
    layer2Color?: string;
  }
  
  export default function TabletScreen({
    baseColor = "white",
    layer1Color = "white",
    layer2Color = "red",
  }: TabletScreenProps) {
    const outerPoints = makeOctagon(8, { top: 2, right: 2, bottom: 2, left: 2 });
    const outerCoords = getPointsArray(outerPoints);
  
    // 🔥 Stroke thickness controls
    const thinStroke = 0.4; // base polygon outline
    const thickStroke1 = 2.5; // overlay layer 1
    const thickStroke2 = 5.5; // overlay layer 2 (highlight/shadow)
  
    // 🔥 Per-edge extend configuration (layer 1 — edge anchored)
    const edgeExtends1: Record<number, { back: number; forward: number }> = {
      1: { back: 12, forward: 8 }, // top-right cut
      3: { back: 8, forward: 12 }, // right-bottom cut
      5: { back: 12, forward: 8 }, // bottom-left cut
      7: { back: 8, forward: 12 }, // left-top cut
    };
  
     // 🔥 Per-corner extend configuration (layer 2 — choose which point of the cut edge to start from)
     const cornerExtends2: Record<number, { back: number; forward: number; startFrom?: "edgeStart" | "edgeEnd" }> = {
       1: { back: 10, forward: 10, startFrom: "edgeStart" },  // top-right cut: start from edge start point
       3: { back: 10, forward: 6, startFrom: "edgeEnd" }, // bottom-right cut: start from edge end point
       5: { back: 6, forward: 6, startFrom: "edgeEnd" }, // bottom-left cut: start from edge end point
       7: { back: 10, forward: 6, startFrom: "edgeStart" }, // top-left cut: start from edge start point
     };
  
    return (
      <svg
        className="w-[calc(100%-40px)] h-[calc(100%-20px)] mt-[10px] ml-[20px]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Base thin outline */}
        <polygon
          points={outerPoints}
          fill="none"
          stroke={baseColor}
          strokeWidth={thinStroke}
          vectorEffect="non-scaling-stroke"
        />
  
        {/* 🔥 Thick overlay layer 1 (edge anchored) */}
        {outerCoords.map(([x1, y1], i) => {
          const [x2, y2] = outerCoords[(i + 1) % outerCoords.length];
          const [x0, y0] = outerCoords[(i - 1 + outerCoords.length) % outerCoords.length];
          const [x3, y3] = outerCoords[(i + 2) % outerCoords.length];
  
          const isCornerEdge = i % 2 === 1;
          if (!isCornerEdge) return null;
  
          const { back, forward } = edgeExtends1[i] ?? { back: 4, forward: 4 };
          const [bx, by] = extendPoint([x1, y1], [x0, y0], back);
          const [fx, fy] = extendPoint([x2, y2], [x3, y3], forward);
  
          return (
            <polyline
              key={`layer1-${i}`}
              points={`${bx},${by} ${x1},${y1} ${x2},${y2} ${fx},${fy}`}
              fill="none"
              stroke={layer1Color}
              strokeWidth={thickStroke1}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
  
         {/* 🔥 Thick overlay layer 2 (with starting point control) */}
         {outerCoords.map(([cx, cy], i) => {
           const isCorner = i % 2 === 1;
           if (!isCorner) return null;
   
           const [prevX, prevY] = outerCoords[(i - 1 + outerCoords.length) % outerCoords.length];
           const [nextX, nextY] = outerCoords[(i + 1) % outerCoords.length];
   
           const { back, forward, startFrom = "edgeStart" } = cornerExtends2[i] ?? { back: 4, forward: 4 };
   
           // Choose starting point based on startFrom - which point of the cut edge to start from
           let startX, startY;
           switch(startFrom) {
             case "edgeStart":
               // Start from the first point of the cut edge (prev point)
               startX = prevX;
               startY = prevY;
               break;
             case "edgeEnd":
               // Start from the second point of the cut edge (next point)
               startX = nextX;
               startY = nextY;
               break;
             default:
               startX = prevX;
               startY = prevY;
               break;
           }
   
           // Always follow polygon direction - extend along the polygon edges
           const [bx, by] = extendPoint([startX, startY], [cx, cy], back);
           const [fx, fy] = extendPoint([startX, startY], [cx, cy], forward);
   
           return (
             <polyline
               key={`layer2-${i}`}
               points={`${bx},${by} ${startX},${startY} ${fx},${fy}`}
               fill="none"
               stroke={layer2Color}
               strokeWidth={thickStroke2}
               vectorEffect="non-scaling-stroke"
               strokeLinecap="round"
               strokeLinejoin="round"
             />
           );
         })}
      </svg>
    );
  }
  
  