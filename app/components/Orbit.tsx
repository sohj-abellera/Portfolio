"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type OrbitProps = {
  skills: string[]
}

export default function Orbit({ skills }: OrbitProps) {
  const [angleOffset, setAngleOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setAngleOffset((prev) => prev + 0.002)
    }, 16)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-[480px] h-[480px] flex items-center justify-center">
      {skills.map((skill, i) => {
        const radius = 200 + (i % 3) * 50
        const angle = (i / skills.length) * Math.PI * 2 + angleOffset
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        return (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 text-white text-sm font-medium"
            style={{
              transform: `translate(${x - 50}px, ${y - 50}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
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

      {/* Core center (optional visual reference) */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] rounded-full bg-white/10 border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.2)]" />
    </div>
  )
}
