import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Starfield from "../components/Starfield/Starfield";
import Welcome from "../screens/Welcome";
import Introduction from "../screens/Introduction";
import CareerTimeline from "../screens/CareerTimeline";

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "transition" | "main">("intro");

  const timelineEvents = [
  {
    year: "2019",
    title: "Discovered Coding",
    description:
      "Started exploring HTML, CSS, and basic JavaScript. Built small static pages just for fun.",
    image: "/images/timeline/2019.jpg",
  },
  {
    year: "2021",
    title: "University Projects",
    description:
      "Developed academic projects — calculators, login systems, and my first responsive layouts.",
    image: "/images/timeline/2021.jpg",
  },
  {
    year: "2023",
    title: "Capstone Project",
    description:
      "Led a team to create a full-stack web application using React and Node.js.",
    image: "/images/timeline/2023.jpg",
  },
  {
    year: "2024",
    title: "Personal Portfolio",
    description:
      "Designed and built this portfolio site — a reflection of my style, growth, and focus on clean UI/UX.",
    image: "/images/timeline/2024.jpg",
  },
];

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

      {/* Introduction — mounted after intro */}
      {(phase === "transition" || phase === "main") && (
        <main className="relative w-full flex flex-col z-10">
          <section id="intro" className="min-h-screen w-full px-26">
            <Introduction
              timings={[
                { duration: .8, delay: 0.0, ease: [0.21, 0.58, 0.54, 0.98] }, // Navbar
                { duration: .8, delay: 0.0, ease: [0.21, 0.58, 0.78, 0.95] }, // Profile
                { duration: .8, delay: 0.03, ease: [0.21, 0.58, 0.78, 0.95] }, // Hi!
                { duration: .8, delay: 0.07, ease: [0.21, 0.58, 0.78, 0.95] }, // Heading
                { duration: .8, delay: 0.11, ease: [0.21, 0.58, 0.78, 0.95] }, // Role
                { duration: .8, delay: 0.15, ease: [0.21, 0.58, 0.78, 0.95] }, // Icons
              ]}
            />
          </section>
          {/* Timeline section */}
          <section id="timeline" className="min-h-screen w-full">
            <CareerTimeline events={timelineEvents} />
          </section>
        </main>
      )}
    </div>
  );
}
