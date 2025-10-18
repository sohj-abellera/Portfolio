import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue } from "framer-motion"

export default function BouncingLogo({ logo }: { logo: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [velocity, setVelocity] = useState<[number, number]>([
    Math.random() * 1.5 + 0.8,
    Math.random() * 1.5 + 0.8,
  ])

  useEffect(() => {
    let frame: number

    const move = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const width = 140
      const height = 80

      let newX = x.get() + velocity[0]
      let newY = y.get() + velocity[1]

      if (newX <= 0 || newX + width >= rect.width)
        setVelocity(([vx, vy]) => [-vx, vy])
      if (newY <= 0 || newY + height >= rect.height)
        setVelocity(([vx, vy]) => [vx, -vy])

      x.set(newX)
      y.set(newY)

      frame = requestAnimationFrame(move)
    }

    frame = requestAnimationFrame(move)
    return () => cancelAnimationFrame(frame)
  }, [velocity])

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 overflow-hidden">
      <motion.img
        src={logo}
        alt="Bouncing internship logo"
        className="absolute w-[110px] sm:w-[150px] md:w-[130px] lg:w-[150px] object-contain opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        style={{ x, y }}
      />
    </div>
  )
}


