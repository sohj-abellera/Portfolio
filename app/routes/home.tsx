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
      <Starfield mode={phase === "transition" ? "vertical" : "normal"} />

      {/* Intro / Welcome screen */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="welcome"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }} // slides up
            transition={{
              duration: .8,
              ease: [0.21, 0.58, 0.54, 0.98],
            }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10"
          >
            <Welcome
              text="Welcome to My Portfolio Website.😊"
              speed={40}
              onDone={() => {
                setPhase("transition");
                setTimeout(() => setPhase("main"), 800);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Homepage — mounted after intro */}
      {(phase === "transition" || phase === "main") && (
        <div className="absolute w-full h-full flex z-10 px-26">
          <Homepage
            timings={[
              { duration: .8, delay: 0.0, ease: [0.21, 0.58, 0.54, 0.98] }, // Navbar
              { duration: .8, delay: 0.0, ease: [0.21, 0.58, 0.78, 0.95] }, // Profile
              { duration: .8, delay: 0.03, ease: [0.21, 0.58, 0.78, 0.95] }, // Hi!
              { duration: .8, delay: 0.07, ease: [0.21, 0.58, 0.78, 0.95] }, // Heading
              { duration: .8, delay: 0.11, ease: [0.21, 0.58, 0.78, 0.95] }, // Role
              { duration: .8, delay: 0.15, ease: [0.21, 0.58, 0.78, 0.95] }, // Icons
            ]}
          />
        </div>
      )}
    </div>
  );
}
