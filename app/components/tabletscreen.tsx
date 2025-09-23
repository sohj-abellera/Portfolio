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
    `${left + cut},${top}`,                  // 0 top-left cut end
    `${100 - right - cut},${top}`,           // 1 top-right cut start (p1)
    `${100 - right},${top + cut}`,           // 2 top-right cut end (p2)
    `${100 - right},${100 - bottom - cut}`,  // 3 bottom-right cut start (p1)
    `${100 - right - cut},${100 - bottom}`,  // 4 bottom-right cut end (p2)
    `${left + cut},${100 - bottom}`,         // 5 bottom-left cut start (p1)
    `${left},${100 - bottom - cut}`,         // 6 bottom-left cut end (p2)
    `${left},${top + cut}`,                  // 7 top-left cut start (p1)
  ].join(" ");
}

function getPointsArray(points: string): [number, number][] {
  return points.split(" ").map((p) => {
    const [x, y] = p.split(",").map(Number);
    return [x, y];
  });
}

// Walk along polygon edges in forward (1) or backward (-1) direction
function walkAlongPolygon(
  coords: [number, number][],
  startIndex: number,
  distance: number,
  direction: 1 | -1
): [number, number] {
  let i = startIndex;
  let remaining = distance;

  while (remaining > 0) {
    const j = (i + direction + coords.length) % coords.length;
    const [x1, y1] = coords[i];
    const [x2, y2] = coords[j];

    const dx = x2 - x1;
    const dy = y2 - y1;
    const edgeLength = Math.sqrt(dx * dx + dy * dy);

    if (remaining <= edgeLength) {
      const t = remaining / edgeLength;
      return [x1 + dx * t, y1 + dy * t];
    }

    remaining -= edgeLength;
    i = j;
  }

  return coords[i];
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

interface InnerPolygonConfig {
  margins: Margins;
  cut: number;
}

interface TabletScreenProps {
  baseColor?: string;
  layer1Color?: string;
  layer2Color?: string;

  /**
   * Each inner polygon can now define its own margins and cut.
   */
  innerPolygons?: InnerPolygonConfig[];

  /**
   * Optional margins for the outer polygon (overrides constants inside file).
   */
  outerMargins?: Margins;
  outerCut?: number;
}

export default function TabletScreen({
  baseColor = "white",
  layer1Color = "white",
  layer2Color = "red",
  innerPolygons = [
    { margins: { top: 6, right: 6, bottom: 6, left: 6 }, cut: 6 },
    { margins: { top: 12, right: 12, bottom: 12, left: 12 }, cut: 6 },
  ],
  outerMargins,
  outerCut = 8,
}: TabletScreenProps) {
  // Default outer margins (can be overridden via props)
  const defaultOuterMargins: Margins = { top: 7, right: 9, bottom: 7, left: 7 };
  const om = outerMargins ?? defaultOuterMargins;

  // Main outer polygon
  const outerPoints = makeOctagon(outerCut, om);
  const outerCoords = getPointsArray(outerPoints);

  // Stroke thickness
  const thinStroke = 0.4;
  const thickStroke1 = 3;
  const thickStroke2 = 6;

  // Layer 1: edge anchored
  const edgeExtends1: Record<number, { back: number; forward: number }> = {
    1: { back: 9, forward: 7 },
    3: { back: 7, forward: 9 },
    5: { back: 9, forward: 7 },
    7: { back: 7, forward: 9 },
  };

  // Layer 2: four corners → each has p1/p2 anchors
  const cornerAnchors = {
    topRight: { p1: 1, p2: 1 },
    bottomRight: { p1: 4, p2: 4 },
    bottomLeft: { p1: 5, p2: 5 },
    topLeft: { p1: 0, p2: 0 },
  };

  const cornerExtends2 = {
    topRight: {
      p1: { back: 5, forward: 0 },
      p2: { back: 0, forward: 9.4 },
    },
    bottomRight: {
      p1: { back: 9.4, forward: 0 },
      p2: { back: 0, forward: 5 },
    },
    bottomLeft: {
      p1: { back: 5, forward: 0 },
      p2: { back: 0, forward: 9.4 },
    },
    topLeft: {
      p1: { back: 9.4, forward: 0 },
      p2: { back: 0, forward: 5 },
    },
  };

  // Build inner polygons using margins + cut
  const innerPolygonsPoints = innerPolygons.map(({ margins, cut }) =>
    makeOctagon(cut, {
      top: (om.top ?? 0) + (margins.top ?? 0),
      right: (om.right ?? 0) + (margins.right ?? 0),
      bottom: (om.bottom ?? 0) + (margins.bottom ?? 0),
      left: (om.left ?? 0) + (margins.left ?? 0),
    })
  );

  return (
    <svg
      className="w-[calc(100%-40px)] h-[calc(100%-20px)] mt-[10px] ml-[20px]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Base thin outline (outer) */}
      <polygon
        points={outerPoints}
        fill="none"
        stroke={baseColor}
        strokeWidth={thinStroke}
        vectorEffect="non-scaling-stroke"
      />

      {/* Inner polygons (now with per-side margins + cut) */}
      {innerPolygonsPoints.map((pts, idx) => (
        <polygon
          key={`inner-${idx}`}
          points={pts}
          fill="none"
          stroke={idx === 0 ? layer1Color : layer2Color}
          strokeWidth={thinStroke}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Layer 1 — edge anchored */}
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

      {/* Layer 2 — corner anchored (p1, p2 per corner) */}
      {Object.entries(cornerAnchors).flatMap(([cornerName, { p1, p2 }]) =>
        (["p1", "p2"] as const).map((pKey) => {
          const startIndex = (cornerAnchors as any)[cornerName][pKey];
          const { back, forward } = (cornerExtends2 as any)[cornerName][pKey];
          const start = outerCoords[startIndex];

          const backPoint = walkAlongPolygon(outerCoords, startIndex, back, -1);
          const forwardPoint = walkAlongPolygon(outerCoords, startIndex, forward, 1);

          return (
            <polyline
              key={`${cornerName}-${pKey}`}
              points={`${backPoint[0]},${backPoint[1]} ${start[0]},${start[1]} ${forwardPoint[0]},${forwardPoint[1]}`}
              fill="none"
              stroke={layer2Color}
              strokeWidth={thickStroke2}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })
      )}
    </svg>
  );
}
