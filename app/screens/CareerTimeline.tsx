import { useState } from "react"
import { motion } from "framer-motion"

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

  const changeSlide = (newIndex: number) => {
    if (newIndex === active) return
    setActive(newIndex)
  }

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

        {/* Right side — push-style slider */}
        <div
          className="w-[480px] sticky top-24 h-[470px] rounded-xl shadow-lg overflow-hidden select-none"
          style={{
            backgroundColor: bgColor || "rgba(255,255,255,0.05)",
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60 pointer-events-none z-30" />

          {/* Slides */}
          <div className="relative w-full h-full overflow-hidden z-40">
            {slides.map((slide, i) => {
              const offset = (i - active) * 100 // offset in percentage
              const isActive = i === active

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  animate={{ x: `${offset}%` }}
                  transition={{
                    duration: 0.45,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{ zIndex: isActive ? 2 : 1 }}
                >
                  {slide.title && (
                    <div className="absolute top-7 left-9 right-6 z-10">
                      <h3 className="text-2xl font-extrabold text-white drop-shadow-md">
                        {slide.title}
                      </h3>
                    </div>
                  )}

                  {slide.video && (
                    <video
                      src={slide.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute top-[108px] left-7 w-[400px] object-cover rounded-[8px]"
                    />
                  )}

                  {slide.overlayImage && (
                    <img
                      src={slide.overlayImage}
                      alt="overlay"
                      className="absolute bottom-12 right-7 w-[290px] rounded-[4px] z-20 pointer-events-none"
                      style={{
                        boxShadow:
                          "0px 8px 16px rgba(0, 0, 0, 0.45), 0px -2px 6px rgba(0, 0, 0, 0.15)",
                      }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 z-40">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => changeSlide(i)}
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
