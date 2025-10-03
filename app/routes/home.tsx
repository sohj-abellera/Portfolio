import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Starfield from "../components/Starfield/Starfield";
import Welcome from "../screens/Welcome";
import Homepage from "../screens/Homepage";

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "transition" | "main">("intro");

  return (
    <div className="w-screen min-h-screen text-white flex items-center justify-center relative overflow-hidden">
      {/* Stars: diagonal (intro/main), vertical (transition) */}
      <Starfield 
        mode={
          phase === "transition" ? "vertical" : "normal"
        }
      />

      {/* Intro / Welcome screen */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="welcome"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }} // slides up
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10"
          >
            <Welcome
              text="Welcome to My Portfolio Website. 😊"
              speed={50}
              onDone={() => {
                // trigger transition (stars go up + homepage enters simultaneously)
                setPhase("transition");
                setTimeout(() => setPhase("main"), 1000); // return to normal stars after 1s
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Homepage appears during transition */}
      <AnimatePresence>
        {(phase === "transition" || phase === "main") && (
          <motion.div
            key="homepage"
            initial={{ y: "100%" }} // start below
            animate={{ y: "0%" }}   // slide in
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
