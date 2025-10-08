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
                  description: `Forced to become the “developer” of our first group project because no one else wanted to do it. I had zero idea what I was doing — just me, YouTube tutorials, and a lot of trial and error. Somehow, things worked, and I actually found myself enjoying the process.

                                These early projects taught me how to explore, adapt, and experiment. I learned how to search for answers, combine snippets of code into something that felt mine, and discovered how satisfying it is to bring an idea to life, even if it looked terrible back then.`,
                }

              ]}
              containerConfig={{
                  bgImage: "/career-timeline-stuff/bg-tech.jpg",
                  bgColor: "#0f242d",
                  slides: [
                    {
                      title: "My very first website — awkward but kinda special.",
                      video: "/career-timeline-stuff/first-projects/personal-info.mp4",
                      overlayImage: "/career-timeline-stuff/first-projects/personal-info.png",
                    },
                    {
                      title: "Christmas-themed forms with some Christmans related animations ",
                      video: "/career-timeline-stuff/first-projects/christmas-forms.mp4",
                      overlayImage: "/career-timeline-stuff/first-projects/christmas-forms.PNG",
                    },
                    {
                      title: "The one where I discovered anything can be animated in css",
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
