import { useEffect, useRef, useState } from "react";

type ScreenProps = {
  text: string;
  speed?: number; // ms per character
};

export default function Screen_1({ text, speed = 100 }: ScreenProps) {
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
        setIsDone(true); // typing finished
        timeoutRef.current = null;
        return;
      }

      setDisplayed((prev) => prev + text.charAt(i));
      indexRef.current += 1;

      timeoutRef.current = window.setTimeout(tick, speed);
    };

    timeoutRef.current = window.setTimeout(tick, speed);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, speed]);

  return (
    <div className="text-3xl font-mono whitespace-pre-wrap text-center">
      {displayed}
      <span className={`caret ${isDone ? "blink" : ""}`} />
    </div>
  );
}
