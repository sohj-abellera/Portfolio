import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Starfield from "../components/Starfield/Starfield"
import Welcome from "../screens/Welcome"
import Introduction from "../screens/Introduction"
import CareerTimeline from "../screens/CareerTimeline"

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "transition" | "main">("intro")

  return (
    <div
      className={`w-screen min-h-screen text-white flex items-center relative ${
        phase === "intro" ? "overflow-hidden" : "overflow-visible"
      }`}
    >
      {/* Stars */}
      <Starfield mode={phase === "transition" ? "vertical" : "normal"} />

      {/* Welcome screen */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="welcome"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.8,
              ease: [0.21, 0.58, 0.54, 0.98],
            }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10"
          >
            <Welcome
              text="Welcome to My Portfolio Website.😊"
              speed={40}
              onDone={() => {
                setPhase("transition")
                setTimeout(() => setPhase("main"), 800)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      {(phase === "transition" || phase === "main") && (
        <main className="relative w-full flex flex-col z-10 items-center">
          <section id="intro" className="min-h-screen w-full max-w-6xl mx-auto">
            <Introduction
              timings={[
                { duration: 0.8, delay: 0.0, ease: [0.21, 0.58, 0.54, 0.98] },
                { duration: 0.8, delay: 0.0, ease: [0.21, 0.58, 0.78, 0.95] },
                { duration: 0.8, delay: 0.03, ease: [0.21, 0.58, 0.78, 0.95] },
                { duration: 0.8, delay: 0.07, ease: [0.21, 0.58, 0.78, 0.95] },
                { duration: 0.8, delay: 0.11, ease: [0.21, 0.58, 0.78, 0.95] },
                { duration: 0.8, delay: 0.15, ease: [0.21, 0.58, 0.78, 0.95] },
              ]}
            />
          </section>

          {/* Timeline section */}
          <section id="timeline" className="w-full mt-10">
            <CareerTimeline
              events={[
                {
                  year: "Nov 2021 – Feb 2022",
                  title: "Freshmen Projects",
                  description:
                    "Forced to be the developer on our first project since nobody wanted to try. I had no experience yet, but I enjoyed experimenting and figuring things out along the way. Most of what I made came from watching YouTube tutorials and combining bits of code I liked into my own designs. From then on, I ended up being the developer for all our projects that year. >_<",
                  tech: ["HTML", "CSS"],
                },
              ]}
              containerConfig={{
                  bgImage: "/career-timeline-stuff/bg-tech.jpg",
                  bgColor: "#0f242d",
                  slides: [
                    {
                      title: "I guess technically this is my first ever website :(",
                      video: "/career-timeline-stuff/first-projects/personal-info.mp4",
                      overlayImage: "/career-timeline-stuff/first-projects/personal-info.png",
                    },
                    {
                      title: "Basically, it's a Christmas inspired forms, with animations this time.",
                      video: "/career-timeline-stuff/first-projects/christmas-forms.mp4",
                      overlayImage: "/career-timeline-stuff/first-projects/christmas-forms.PNG",
                    },
                    {
                      title: "I really liked the animations here. Not my code tho >_<",
                      video: "/career-timeline-stuff/first-projects/interests-frameset.mp4",
                      overlayImage: "/career-timeline-stuff/first-projects/interests-frameset.png",
                    },
                  ],
                }}
              />
          </section>
        </main>
      )}
    </div>
  )
}
