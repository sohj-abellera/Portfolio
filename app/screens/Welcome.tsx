//app/screens/Welcome.tsx
import { useEffect, useRef, useState } from "react";

type ScreenProps = {
  text: string;
  speed?: number;
  onDone?: () => void; // NEW
};

export default function Screen_1({ text, speed = 100, onDone }: ScreenProps) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayed("");
    setIsDone(false);
    indexRef.current = 0;

    const tick = () => {
      const i = indexRef.current;
      if (i >= text.length) {
        setIsDone(true);
        timeoutRef.current = null;

        // fire callback after 500ms
        if (onDone) setTimeout(onDone, 500);
        return;
      }

      setDisplayed((prev) => prev + text.charAt(i));
      indexRef.current += 1;

      timeoutRef.current = window.setTimeout(tick, speed);
    };

    timeoutRef.current = window.setTimeout(tick, speed);

    return () => {
      if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, onDone]);

  return (
    <div className="font-mono text-[18px] text-center whitespace-pre-wrap sm:text-2xl md:text-3xl">
      {displayed}
      <span className={`caret ${isDone ? "blink" : ""}`} />
    </div>
  );
}
