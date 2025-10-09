import { useState, useRef, useEffect, type JSX } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faHtml5,
  faCss3Alt,
  faJs,
  faReact,
  faGithub,
  faBootstrap,
  faNodeJs,
  faPhp,
  faJava,
  faAndroid,
} from "@fortawesome/free-brands-svg-icons"


type Slide = {
  title?: string
  video?: string
  overlayImage?: string
  customId?: string
}

type ContainerConfig = {
  bgImage?: string
  bgColor?: string
  slides?: Slide[]
}

type Section = {
  year?: string
  title: string
  description: string
  github?: string
  tech?: string[]
  containerConfig: ContainerConfig
}

const techIconMap: Record<string, JSX.Element> = {
  HTML: <FontAwesomeIcon icon={faHtml5} className="text-orange-500" />,
  CSS: <FontAwesomeIcon icon={faCss3Alt} className="text-blue-500" />,
  JavaScript: <FontAwesomeIcon icon={faJs} className="text-yellow-400" />,
  React: <FontAwesomeIcon icon={faReact} className="text-cyan-400" />,
  GitHub: <FontAwesomeIcon icon={faGithub} className="text-gray-300" />,
  Bootstrap: <FontAwesomeIcon icon={faBootstrap} className="text-purple-400" />,
  Node: <FontAwesomeIcon icon={faNodeJs} className="text-green-400" />,
}

export default function CareerTimeline({ sections }: { sections: Section[] }) {
  const [activeSection, setActiveSection] = useState(0)
  const { bgImage, bgColor, slides = [] } = sections[activeSection].containerConfig

  const x = useMotionValue(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const slideWidth = 480
  const totalSlides = slides.length
  const totalWidth = slideWidth * totalSlides
  const resumeTimer = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // --- slide change ---
  const changeSlide = (index: number, userAction = false) => {
    if (index < 0) index = totalSlides - 1
    if (index >= totalSlides) index = 0
    setActiveSlide(index)
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

  // --- drag handling ---
  const handleDragEnd = (_: any, info: any) => {
    const currentX = x.get()
    const velocity = info.velocity.x
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0
    const direction = velocity > 0 ? -1 : 1
    let index = Math.round(-currentX / slideWidth)
    const distanceThreshold = slideWidth * 0.3
    const draggedDistance = -currentX - activeSlide * slideWidth

    if (Math.abs(velocity) > 500) index += direction
    else if (Math.abs(draggedDistance) > distanceThreshold)
      index += Math.sign(draggedDistance)

    changeSlide(index, true)
  }

  // --- autoplay ---
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return
    const interval = setInterval(() => {
      setActiveSlide((prev) => {
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
  }, [slides.length, isPaused, activeSection])

  // --- track scroll position ---
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const midpoint = containerRect.top + containerRect.height / 2

      sectionRefs.current.forEach((ref, index) => {
        if (!ref) return
        const rect = ref.getBoundingClientRect()
        const top = rect.top
        const bottom = rect.bottom

        if (top <= midpoint && bottom >= midpoint) {
          if (activeSection !== index) setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

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

      {/* Layout */}
      <div className="flex flex-col md:flex-row max-w-6xl mx-auto px-6 gap-20">
        {/* Left side */}
        <div className="flex-1 flex flex-col space-y-20 pb-60">
          <div className="mb-15">
            <h2 className="text-6xl font-extrabold text-white mb-6">
              Let’s dive in.
            </h2>
          </div>

          {sections.map((section, i) => (
            <div
              key={i}
              ref={(el) => {
                sectionRefs.current[i] = el
              }}

              className="scroll-trigger"
            >
              <p className="text-sm text-gray-400 mb-1">{section.year}</p>
              <h3 className="text-2xl font-bold mb-3">{section.title}</h3>
              <p className="text-gray-300 leading-relaxed mb-5 whitespace-pre-line">
                {section.description}
              </p>

              {/* Tech + GitHub container */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {section.github && (
                  <a
                    href={section.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/5 border border-white/10 text-gray-200 px-4 py-1.5 text-sm font-medium hover:bg-white/10 transition"
                  >
                    <FontAwesomeIcon
                      icon={faGithub}
                      className="mr-2 text-gray-300 group-hover:text-white"
                    />
                    Source Code
                  </a>
                )}

                {section.tech?.map((tech, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.1 }}
                    className="rounded-full bg-white/5 border border-white/10 text-gray-200 px-4 py-1.5 text-sm font-medium hover:bg-white/10 transition flex items-center gap-2"
                  >
                    {techIconMap[tech] || null}
                    <span>{tech}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right side — sticky media */}
        <div
          ref={containerRef}
          className="w-[480px] sticky top-24 h-[470px] rounded-xl shadow-lg overflow-hidden select-none"
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
          <div className="absolute inset-0 pointer-events-none z-30"/>

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

                {/* --- Video --- */}
                {/* --- Video --- */}
                {slide.video && (
                  <motion.video
                    src={slide.video}
                    preload="auto"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`absolute object-cover rounded-[8px] ${
                      slide.customId === "for-class-funds"
                        ? "top-[90px] right-8 w-[140px] z-30"
                        : slide.customId === "for-capstone-thesis"
                        ? "top-[120px] left-[50px] w-[360px] z-20 hidden" // 👈 your new clause
                        : "top-[108px] left-7 w-[400px] z-20"
                    }`}
                    style={{
                      boxShadow:
                        "0px 8px 16px rgba(0, 0, 0, 0.45), 0px -2px 6px rgba(0, 0, 0, 0.15)",
                    }}
                    whileHover={{
                      scale: 1.03,
                      boxShadow:
                        "0px 8px 18px rgba(0, 0, 0, 0.45), 0px 4px 10px rgba(0, 0, 0, 0.25)",
                      zIndex: 40,
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  />
                )}


                {/* --- Overlay Image --- */}
                {slide.overlayImage && (
                  <motion.img
                    src={slide.overlayImage}
                    alt="overlay"
                    className={`absolute rounded-[4px] pointer-events-none ${
                      slide.customId === "for-class-funds"
                        ? "top-[110px] left-8 w-[370px] z-20"
                        : slide.customId === "for-capstone-thesis"
                        ? "bottom-24 left-1/2 -translate-x-1/2 w-[410px] z-30"
                        : "bottom-12 right-7 w-[290px] z-30"
                    }`}
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
                    i === activeSlide
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
