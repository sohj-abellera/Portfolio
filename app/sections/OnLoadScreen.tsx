import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function OnloadScreen({
  text = "Welcome to my Portfolio Website.",
  visible = true, // 👈 new prop
}: {
  text?: string;
  visible?: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (!visible) return; // 👈 skip animations if hidden

    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(typingInterval);

        const blinkInterval = setInterval(() => {
          setCursorVisible((prev) => !prev);
        }, 400);

        setTimeout(() => {
          clearInterval(blinkInterval);
          setCursorVisible(false);
        }, 2600);
      }
    }, 60);

    return () => clearInterval(typingInterval);
  }, [text, visible]);

  if (!visible) return null; // 👈 completely hide it

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 text-white pointer-events-none">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-3xl font-bold text-center flex items-center"
      >
        {displayed}
        <span
          className={`inline-block w-[2px] h-[1.5em] ml-.5 transition-opacity duration-200 ${
            cursorVisible ? "bg-white" : "bg-transparent"
          }`}
        ></span>
      </motion.h1>
    </div>
  );
}
