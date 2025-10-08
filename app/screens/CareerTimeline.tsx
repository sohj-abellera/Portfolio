import { useState, useRef, useEffect } from "react"
import { motion, useMotionValue, animate } from "framer-motion"

type Event = {
  year?: string
  title: string
  description: string
  github?: string
  tech?: string[]
}

type Slide = {
  title?: string
  video?: string
  overlayImage?: string
}

type ContainerConfig = {
  bgImage?: string
  bgColor?: string
  slides?: Slide[]
}

export default function CareerTimeline({
  events,
  containerConfig = {},
}: {
  events: Event[]
  containerConfig?: ContainerConfig
}) {
  const { bgImage, bgColor, slides = [] } = containerConfig
  const [active, setActive] = useState(0)
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  const slideWidth = 480
  const totalSlides = slides.length
  const totalWidth = slideWidth * totalSlides

  const resumeTimer = useRef<NodeJS.Timeout | null>(null)

  // --- helper ---
  const changeSlide = (index: number, userAction = false) => {
    if (index < 0) index = totalSlides - 1
    if (index >= totalSlides) index = 0
    setActive(index)
    animate(x, -index * slideWidth, {
      type: "spring",
      stiffness: 250,
      damping: 30,
    })


    if (userAction) {
      setIsPaused(true)
      clearTimeout(resumeTimer.current!)
      resumeTimer.current = setTimeout(() => setIsPaused(false), 6000)
    }
  }

  // --- handle drag ---
  const handleDragEnd = (_: any, info: any) => {
    const currentX = x.get()
    const velocity = info.velocity.x
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const direction = velocity > 0 ? -1 : 1
    let index = Math.round(-currentX / slideWidth)

    const velocityThreshold = isTouch ? 350 : 500
    const distanceThreshold = slideWidth * (isTouch ? 0.2 : 0.3)
    const draggedDistance = -currentX - active * slideWidth

    if (Math.abs(velocity) > velocityThreshold) {
      index += direction
    } else if (Math.abs(draggedDistance) > distanceThreshold) {
      index += Math.sign(draggedDistance)
    }

    changeSlide(index, true)
  }

  // --- autoplay with pause/resume ---
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return
    const interval = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % totalSlides
        animate(x, -next * slideWidth, {
          type: "spring",
          stiffness: 250,
          damping: 30,
        })
        return next
      })
    }, 6000)

    return () => clearInterval(interval)
  }, [slides.length, isPaused])

  return (
    <div className="w-full bg-black/80 border-t border-b border-white/10 py-20 text-white">
      {/* Header */}
      <div className="w-full flex flex-col items-center text-center mb-30">
        <h1 className="text-3xl font-bold mb-4">Career Timeline</h1>
        <p className="text-gray-300 text-[16px] leading-relaxed max-w-6xl">
          A look at my journey so far — from being unexpectedly assigned as the
          leader for a website project, to discovering my genuine interest in web
          development. What started as a simple task quickly turned into a passion.
          Each project since then has helped me grow as a developer, sharpening
          both my technical skills and my love for building interactive experiences.
        </p>
      </div>

      {/* Main layout */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-6 gap-10">
        {/* Left side — details */}
        <div className="flex-1 flex flex-col space-y-32">
          <div className="mb-10">
            <h2 className="text-6xl font-extrabold text-white mb-6">
              Let’s dive in.
            </h2>
          </div>

          {events.map((event, i) => (
            <div key={i}>
              <p className="text-sm text-gray-400 mb-1">{event.year}</p>
              <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-5">
                {event.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 text-sm">
                {event.github && (
                  <a
                    href={event.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    • View on GitHub
                  </a>
                )}

                {event.tech?.map((t, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 bg-white/10 rounded-full text-gray-300 border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right side — draggable slider */}
        <div
          ref={containerRef}
          className="w-[480px] sticky top-24 h-[470px] rounded-xl shadow-lg overflow-hidden select-none relative"
          style={{
            backgroundColor: bgColor || "rgba(255,255,255,0.05)",
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 pointer-events-none z-30" />

          {/* Slides Wrapper */}
          <motion.div
            className="flex absolute top-0 left-0 h-full cursor-grab active:cursor-grabbing z-40"
            drag="x"
            dragConstraints={{ left: -(totalWidth - slideWidth), right: 0 }}
            style={{ x }}
            onDragEnd={handleDragEnd}
            onDragStart={() => setIsPaused(true)}
          >
            {slides.map((slide, i) => (
              <div key={i} className="w-[480px] h-full relative flex-shrink-0">
                {slide.title && (
                  <div className="absolute top-7 left-9 right-6 z-10">
                    <h3 className="text-2xl font-extrabold text-white drop-shadow-md">
                      {slide.title}
                    </h3>
                  </div>
                )}

                {slide.video && (
                  <motion.video
                    src={slide.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-[108px] left-7 w-[400px] object-cover rounded-[8px] z-20"
                    whileHover={{
                      scale: 1.03,
                      boxShadow:
                        "0px 8px 18px rgba(0, 0, 0, 0.45), 0px 4px 10px rgba(0, 0, 0, 0.25)",
                      zIndex: 40,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  />
                )}

                {slide.overlayImage && (
                  <motion.img
                    src={slide.overlayImage}
                    alt="overlay"
                    className="absolute bottom-12 right-7 w-[290px] rounded-[4px] pointer-events-none z-30"
                    style={{
                      boxShadow:
                        "0px 8px 16px rgba(0, 0, 0, 0.45), 0px -2px 6px rgba(0, 0, 0, 0.15)",
                    }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-50 cursor-default">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => changeSlide(i, true)}
                  className={`h-[10px] rounded-full transition-all duration-300 cursor-pointer ${
                    i === active
                      ? "w-[25px] bg-white/90"
                      : "w-[10px] bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
