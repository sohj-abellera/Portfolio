"use client"

import { motion, useMotionValue, animate } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Orbit from "../components/Orbit"

const worlds = [
  {
    title: "Front-End",
    skills: ["React", "Tailwind", "JavaScript", "Framer Motion", "HTML", "CSS"],
  },
  {
    title: "Back-End",
    skills: ["PHP", "MySQL", "Firebase", "Node.js"],
  },
  {
    title: "Programming",
    skills: ["Java", "C", "C++", "Python", "Android Studio"],
  },
  {
    title: "Tools & Workflow",
    skills: ["Git", "GitHub", "VS Code", "Figma", "Google Workspace"],
  },
]

export default function Skills() {
  const [active, setActive] = useState(0)
  const x = useMotionValue(0)
  const slideWidth = 800
  const total = worlds.length
  const halfSpan = (slideWidth * (total - 1)) / 2

  // ✅ track text box dimensions
  const [centerSize, setCenterSize] = useState({ width: 0, height: 0 })
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      const { width, height } = titleRef.current.getBoundingClientRect()
      setCenterSize({ width, height })
    }
  }, [active])

  const wrapIndex = (i: number) => ((Math.round(i) % total) + total) % total

  const changeWorld = (index: number) => {
    index = wrapIndex(index)
    setActive(index)
    const target = slideWidth * ((total - 1) / 2 - index)
    animate(x, target, { type: "spring", stiffness: 200, damping: 30 })
  }

  useEffect(() => {
    const initialTarget = slideWidth * ((total - 1) / 2 - active)
    x.set(initialTarget)
  }, [])

  return (
    <section className="relative w-full h-[150vh] flex flex-col justify-end overflow-hidden">
  {/* gradient background */}
  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_10%,rgba(12,18,32,0.6)_70%,rgba(12,18,32,0.65)_85%,rgba(0,0,0,0.8)_100%)]" />

  {/* Header (optional – can keep at top area) */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="absolute top-60 left-1/2 -translate-x-1/2 z-20 text-center"
  >
    <h1 className="text-3xl font-bold text-white tracking-wide mb-2">Skills</h1>
    <p className="text-gray-300 text-[16px]">
      The tools and technologies that revolve around my work
    </p>
  </motion.div>

  {/* ✅ Main content area – confined to bottom 100vh */}
  <div className="relative w-full h-[94vh] flex items-center justify-center z-10">
    <motion.div
      className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center"
      style={{ x }}
      drag="x"
      dragConstraints={{ left: -halfSpan, right: halfSpan }}
      dragElastic={0.2}
      onDragEnd={(_, info) => {
        const rawIndex = ((total - 1) / 2) - x.get() / slideWidth
        const velocityBias =
          Math.abs(info.velocity.x) > 200
            ? info.velocity.x < 0
              ? 0.6
              : -0.6
            : 0
        let newIndex = Math.round(rawIndex + velocityBias)
        newIndex = wrapIndex(newIndex)
        changeWorld(newIndex)
      }}
    >
      {worlds.map((world, i) => {
        const isActive = i === active
        const scale = isActive ? 1 : 0.75
        const opacity = isActive ? 1 : 0.3
        const blur = isActive ? "blur(0px)" : "blur(2px)"

        return (
          <motion.div
            key={i}
            className="w-[800px] h-[600px] flex items-center justify-center flex-shrink-0 relative"
            animate={{ scale, opacity, filter: blur }}
            transition={{ duration: 0.6, ease: [0.21, 0.58, 0.54, 0.98] }}
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[460px] h-[460px]">
              <motion.h2
                ref={isActive ? titleRef : null}
                className="absolute text-4xl font-bold text-white text-center whitespace-nowrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {world.title}
              </motion.h2>

              <Orbit
                skills={world.skills}
                centerWidth={centerSize.width}
                centerHeight={centerSize.height}
              />
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  </div>

<div className="absolute bottom-[42vh] left-1/2 -translate-x-1/2 flex justify-between items-center w-[85vw] max-w-[1200px] px-6 z-30">
    <button
      onClick={() => changeWorld(active - 1)}
      className="p-2 transition-transform duration-300 hover:-translate-x-1"
    >
      <ChevronLeft
        size={45}
        className="text-white/90 hover:text-white transition-colors duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] cursor-pointer"
      />
    </button>
    <button
      onClick={() => changeWorld(active + 1)}
      className="p-2 transition-transform duration-300 hover:translate-x-1"
    >
      <ChevronRight
        size={45}
        className="text-white/90 hover:text-white transition-colors duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)] cursor-pointer"
      />
    </button>
  </div>
</section>

  )
}
