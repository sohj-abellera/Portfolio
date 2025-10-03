import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Starfield from "../components/Starfield/Starfield";
import Welcome from "../screens/Welcome";
import Homepage from "../screens/Homepage";

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "main">("intro");

  return (
    <div className="w-screen min-h-screen text-white flex items-center justify-center relative overflow-hidden">
      {/* Background starfield stays static */}
      <Starfield />

      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="welcome"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }} // whole screen slides up
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10"
          >
            <Welcome
              text="Welcome to My Portfolio Website. 😊"
              speed={75}
              // after typing + 500ms delay → trigger transition
              onDone={() => setTimeout(() => setPhase("main"), 500)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "main" && (
          <motion.div
            key="homepage"
            initial={{ y: "100%" }} // start below
            animate={{ y: "0%" }} // slide into place
            exit={{ y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10"
          >
            <Homepage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
