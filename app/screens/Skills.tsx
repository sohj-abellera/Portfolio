"use client"

import { motion, useMotionValue, animate } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Orbit data
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
  const [angleOffset, setAngleOffset] = useState(0)
  const [active, setActive] = useState(0)
  const x = useMotionValue(0)
  const slideWidth = 800

  // Orbit rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAngleOffset((prev) => prev + 0.002)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  // Change world
  const changeWorld = (index: number) => {
    if (index < 0) index = worlds.length - 1
    if (index >= worlds.length) index = 0
    setActive(index)
    animate(x, -index * slideWidth, {
      type: "spring",
      stiffness: 200,
      damping: 30,
    })
  }

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Keep your natural background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c1220]/70 to-black" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute left-33 top-8 z-20 text-start"
      >
        <h1 className="text-5xl font-bold text-white tracking-wide mb-2">
          Skills
        </h1>
        <p className="text-gray-400 text-sm">
          The tools and technologies that revolve around my work
        </p>
      </motion.div>

      {/* Slider */}
      <div className="relative w-[100vw] max-w-[1400px] h-[100vh] overflow-hidden flex items-center justify-center z-10">
        <motion.div
          className="flex absolute top-0 left-0 h-full"
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: -(slideWidth * (worlds.length - 1)),
            right: 0,
          }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            const direction = info.velocity.x < 0 ? 1 : -1
            const newIndex = Math.round(-x.get() / slideWidth) + direction
            changeWorld(newIndex)
          }}
        >
          {worlds.map((world, i) => {
            const isActive = i === active
            const distance = Math.abs(active - i)
            const scale = isActive ? 1 : 0.7
            const opacity = isActive ? 1 : 0.3
            const blur = isActive ? "blur(0px)" : "blur(2px)"

            return (
              <motion.div
                key={i}
                className="w-[800px] flex flex-col items-center justify-center flex-shrink-0"
                animate={{ scale, opacity, filter: blur }}
                transition={{ duration: 0.6, ease: [0.21, 0.58, 0.54, 0.98] }}
              >
                {/* Center title as the “core” */}
                <motion.h2
                  className="text-4xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {world.title}
                </motion.h2>

                {/* Orbiting skills */}
                <div className="relative flex items-center justify-center w-[460px] h-[460px]">
                  {world.skills.map((skill, idx) => {
                    const radius = 200 + (idx % 3) * 50
                    const angle =
                      (idx / world.skills.length) * Math.PI * 2 + angleOffset
                    const x = Math.cos(angle) * radius
                    const y = Math.sin(angle) * radius

                    return (
                      <motion.div
                        key={idx}
                        className="absolute text-white text-sm font-medium"
                        style={{
                            transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                        }}

                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.25,
                            textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
                          }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 cursor-default"
                        >
                          {skill}
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Arrows */}
      <div className="absolute inset-y-0 flex justify-between items-center w-[80vw] max-w-[1200px] px-6 z-30">
        <button
          onClick={() => changeWorld(active - 1)}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition cursor-pointer"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => changeWorld(active + 1)}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition cursor-pointer"
        >
          <ChevronRight size={28} />
        </button>
      </div>
    </section>
  )
}
