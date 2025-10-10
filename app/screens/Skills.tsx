// app/screens/Skills.tsx
"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const skills = [
  "React",
  "Tailwind",
  "Framer Motion",
  "JavaScript",
  "PHP",
  "MySQL",
  "Firebase",
  "Figma",
  "GitHub",
  "HTML",
  "CSS",
]

export default function Skills() {
  const [angleOffset, setAngleOffset] = useState(0)

  // Rotate slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setAngleOffset((prev) => prev + 0.002)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Faint background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0c1220]/70 to-black" />

      {/* Core */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.21, 0.58, 0.54, 0.98] }}
        className="relative z-10 text-center"
      >
        <h1 className="text-5xl font-bold text-white tracking-wide mb-2">
          My Dev Orbit
        </h1>
        <p className="text-gray-400 text-sm">
          The tools and technologies that revolve around me
        </p>
      </motion.div>

      {/* Orbiting skills */}
      {skills.map((skill, i) => {
        const radius = 180 + (i % 3) * 50 // distance from center
        const angle = (i / skills.length) * Math.PI * 2 + angleOffset
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.div
            key={i}
            className="absolute text-white text-sm font-medium"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            <motion.div
              whileHover={{
                scale: 1.3,
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
    </section>
  )
}
