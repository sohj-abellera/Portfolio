"use client"

import { motion, useMotionValue, animate } from "framer-motion"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

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
  const total = worlds.length
  const halfSpan = (slideWidth * (total - 1)) / 2 // W * (N-1) / 2

  // Orbit rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAngleOffset((prev) => prev + 0.002)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  // helper to clamp and wrap index
  const wrapIndex = (i: number) => {
    // wrap to [0, total-1]
    return ((Math.round(i) % total) + total) % total
  }

  // Change world - compute correct x target so slide i is centered
  const changeWorld = (index: number) => {
    index = wrapIndex(index)
    setActive(index)
    const target = slideWidth * ((total - 1) / 2 - index) // W * ((N-1)/2 - i)
    animate(x, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
    })
  }

  // initialize position so active=0 is centered on mount
  useEffect(() => {
    const initialTarget = slideWidth * ((total - 1) / 2 - active)
    x.set(initialTarget)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c1220]/70 to-black" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute left-32 top-8 z-20 text-start"
      >
        <h1 className="text-5xl font-bold text-white tracking-wide mb-2">
          Skills
        </h1>
        <p className="text-gray-400 text-sm">
          The tools and technologies that revolve around my work
        </p>
      </motion.div>

      {/* Slider: TRACK is centered via left-1/2 -translate-x-1/2 */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center z-10">
        <motion.div
          className="flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -halfSpan, right: halfSpan }}
          dragElastic={0.2}
          onDragEnd={(_, info) => {
            // compute nearest index from current x
            const rawIndex = ( (total - 1) / 2 ) - x.get() / slideWidth
            // incorporate flick velocity: if fast flick, push to next/prev
            const velocityBias = Math.abs(info.velocity.x) > 200 ? (info.velocity.x < 0 ? 0.6 : -0.6) : 0
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
                    className="absolute text-4xl font-bold text-white text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {world.title}
                  </motion.h2>

                  {world.skills.map((skill, idx) => {
                    const radius = 200 + (idx % 3) * 50
                    const angle = (idx / world.skills.length) * Math.PI * 2 + angleOffset
                    const sx = Math.cos(angle) * radius
                    const sy = Math.sin(angle) * radius

                    return (
                      <motion.div
                        key={idx}
                        className="absolute text-white text-sm font-medium"
                        style={{
                          transform: `translate(calc(${sx}px - 50%), calc(${sy}px - 50%))`,
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

      {/* Arrows (centered to match the track) */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex justify-between items-center w-[80vw] max-w-[1200px] px-6 z-30">
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
