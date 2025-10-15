import { useState, useRef, useEffect, type JSX } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BookOpen, Star } from "lucide-react";
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

type SubProject = {
  label?: string // optional (like "2nd Project")
  github?: string
  tech?: string[]
}

type Section = {
  year?: string
  title: string
  description?: string
  descriptionStanzas?: string[]
  takeaways?: string[]
  github?: string
  tech?: string[]
  subProjects?: SubProject[] // new
  containerConfig: ContainerConfig
}

const techIconMap: Record<string, JSX.Element> = {
  HTML: <FontAwesomeIcon icon={faHtml5} className="text-orange-500" />,
  CSS: <FontAwesomeIcon icon={faCss3Alt} className="text-blue-500" />,
  JavaScript: <FontAwesomeIcon icon={faJs} className="text-yellow-400" />,
  React: <FontAwesomeIcon icon={faReact} className="text-cyan-400" />,
  GitHub: <FontAwesomeIcon icon={faGithub} className="text-gray-300" />,
  Bootstrap: <FontAwesomeIcon icon={faBootstrap} className="text-purple-400" />,
  NodeJS: <FontAwesomeIcon icon={faNodeJs} className="text-green-500" />,
  PHP: <FontAwesomeIcon icon={faPhp} className="text-indigo-400" />,
  Java: <FontAwesomeIcon icon={faJava} className="text-red-500" />,
  Android: <FontAwesomeIcon icon={faAndroid} className="text-green-400" />,

  // 🧩 new additions:
  "Android Studio": (
    <FontAwesomeIcon icon={faAndroid} className="text-[#3DDC84]" />
  ),
  Firebase: (
    <img
      src="https://www.svgrepo.com/show/353735/firebase.svg"
      alt="Firebase"
      className="w-4 h-4"
    />
  ),
  MySQL: (
    <img
      src="https://www.svgrepo.com/show/303251/mysql-logo.svg"
      alt="MySQL"
      className="w-4 h-4"
    />
  ),
  Tailwind: (
    <img
      src="https://www.svgrepo.com/show/354431/tailwindcss-icon.svg"
      alt="Tailwind CSS"
      className="w-4 h-4"
    />
  ),
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
        if (activeSection !== index) {
          setActiveSection(index)
          setActiveSlide(0) // 🟢 reset slide index
          x.set(0) // instantly reset position, no slide animation // 🟢 reset position
        }
      }
    })
  }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])

  // --- prevent lingering image/frame between section switches ---
  useEffect(() => {
    // hide content for a single frame before showing new section
    const raf = requestAnimationFrame(() => {
      x.set(0)
      setActiveSlide(0)
    })
    return () => cancelAnimationFrame(raf)
  }, [activeSection])


  return (
    <div className=" w-full bg-black/80 border-t border-b border-white/10 py-20 text-white">
      {/* Header */}
      <div className="w-full flex flex-col items-center text-center mb-30">
        <h1 className="font-montserrat text-3xl font-bold mb-4">Career Timeline</h1>
        <p className="font-lexend text-gray-300 font-[300] text-[16px] leading-relaxed max-w-6xl">
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
            <h2 className="font-lexend text-6xl font-extrabold text-white mb-6">
              Let’s dive in.
            </h2>
          </div>

          {sections.map((section, i) => (
            <div
              key={i}
              ref={(el) => {
                sectionRefs.current[i] = el
              }}
              className={`scroll-trigger transition-opacity duration-300 ${
                i === activeSection ? "opacity-100" : "opacity-40"
              }`}
            >
              <p className="font-montserrat text-sm text-gray-400">{section.year}</p>
              <h3 className="font-montserrat text-[28px] font-bold mb-4">{section.title}</h3>

              <DescriptionPanel
                descriptionStanzas={section.descriptionStanzas || []}
                takeaways={section.takeaways}
              />

              {/* Tech + GitHub */}
              {section.subProjects ? (
                section.subProjects.map((proj, idx) => (
                  <div key={idx} className="flex flex-col w-full mb-5">
                    {/* optional separator if not first */}
                    {idx > 0 && (
                      <div className="flex items-center justify-center w-full mb-5">
                        <div className="h-px bg-white/10 flex-grow" />
                        <span className="px-4 text-gray-400 text-xs font-montserrat tracking-wider uppercase">
                          {proj.label || `Project ${idx + 1}`}
                        </span>
                        <div className="h-px bg-white/10 flex-grow" />
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4">
                      {proj.github && (
                        <>
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-[6px] bg-white/2 border border-white/6 text-gray-300 px-5 py-1 text-sm font-medium font-montserrat"
                          >
                            <FontAwesomeIcon
                              icon={faGithub}
                              className="text-gray-100 group-hover:text-white"
                            />
                          Source Code
                          </a>

                          {proj.tech && proj.tech.length > 0 && (
                            <span className="text-gray-400 text-lg select-none">•</span>
                          )}
                        </>
                      )}

                      {proj.tech?.map((tech, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 rounded-[6px] bg-white/2 border border-white/6 text-gray-300 px-5 py-1 text-sm font-medium font-montserrat"
                        >
                          {techIconMap[tech] || null}
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  {section.github && (
                    <>
                      <a
                        href={section.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-[6px] bg-white/2 border border-white/6 text-gray-300 px-5 py-1 text-sm font-medium font-montserrat"
                      >
                        <FontAwesomeIcon
                          icon={faGithub}
                          className="text-gray-100 group-hover:text-white"
                        />
                        Source Code
                      </a>

                      {section.tech && section.tech.length > 0 && (
                        <span className="text-gray-400 text-lg select-none">•</span>
                      )}
                    </>
                  )}

                  {section.tech?.map((tech, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 rounded-[6px] bg-white/2 border border-white/6 text-gray-300 px-5 py-1 text-sm font-medium font-montserrat"
                    >
                      {techIconMap[tech] || null}
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right side — sticky media */}
        <div
          ref={containerRef}
          className="w-[480px] sticky top-24 h-[470px] rounded-xl shadow-lg overflow-hidden select-none tracking-[0.2px]"
          style={{
            backgroundColor: bgColor || "rgba(255,255,255,0.05)",
            backgroundImage: bgImage ? `url(${bgImage})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Base background */}
          <div
            className="absolute inset-0 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10"
            style={{
              backgroundColor: bgColor || "rgba(255,255,255,0.03)",
              backgroundImage: bgImage ? `url(${bgImage})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Subtle edge glow */}
          <div className="absolute inset-0 rounded-xl border border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.15)] pointer-events-none" />

          {/* Light reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-60 rounded-xl pointer-events-none" />

          {/* Faint glass tint */}
          <div className="absolute inset-0 bg-white/3 mix-blend-overlay pointer-events-none rounded-xl" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 pointer-events-none z-30" />

          {/* Slides Wrapper */}
          <motion.div
            className={`flex absolute top-0 left-0 h-full z-40 ${
              totalSlides > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-default"
            }`}
            drag={totalSlides > 1 ? "x" : false}
            dragConstraints={
              totalSlides > 1
                ? { left: -(totalWidth - slideWidth), right: 0 }
                : { left: 0, right: 0 }
            }
            style={{ x }}
            onDragEnd={totalSlides > 1 ? handleDragEnd : undefined}
            onDragStart={totalSlides > 1 ? () => setIsPaused(true) : undefined}
          >

            {slides.map((slide, i) => (
              <div key={i} className="w-[480px] h-full relative flex-shrink-0">
                {slide.title && (
                  <div className="absolute top-7 left-9 right-6 z-10">
                    <h3 className="text-2xl font-lexend font-extrabold text-white drop-shadow-md">
                      {slide.title}
                    </h3>
                  </div>
                )}

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
                        ? "top-[100px] right-8 w-[140px] z-30"
                        : slide.customId === "for-capstone-thesis"
                        ? "top-[120px] left-[50px] w-[360px] z-20 hidden"
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

                {/* --- Overlay Image / Special Bouncing Logo --- */}
                {slide.overlayImage && (
                  <>
                    {slide.customId === "internship-logo-bounce" ? (
                      <BouncingLogo logo={slide.overlayImage} />
                    ) : (
                      <motion.img
                        src={slide.overlayImage}
                        alt="overlay"
                        className={`absolute rounded-[4px] pointer-events-none ${
                          slide.customId === "for-class-funds"
                            ? "top-[120px] left-8 w-[370px] z-20"
                            : slide.customId === "for-capstone-thesis"
                            ? "bottom-28 left-1/2 -translate-x-1/2 w-[410px] z-30"
                            : "bottom-12 right-7 w-[290px] z-30"
                        }`}
                        style={{
                          boxShadow:
                            "0px 8px 16px rgba(0, 0, 0, 0.45), 0px -2px 6px rgba(0, 0, 0, 0.15)",
                        }}
                      />
                    )}
                  </>
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

/* --- Bouncing DVD-Logo Component --- */
function BouncingLogo({ logo }: { logo: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [vel, setVel] = useState<[number, number]>([
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

      let newX = x.get() + vel[0]
      let newY = y.get() + vel[1]

      if (newX <= 0 || newX + width >= rect.width)
        setVel(([vx, vy]) => [-vx, vy])
      if (newY <= 0 || newY + height >= rect.height)
        setVel(([vx, vy]) => [vx, -vy])

      x.set(newX)
      y.set(newY)

      frame = requestAnimationFrame(move)
    }

    frame = requestAnimationFrame(move)
    return () => cancelAnimationFrame(frame)
  }, [vel])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-50">
      <motion.img
        src={logo}
        alt="Bouncing internship logo"
        className="absolute w-[140px] h-[80px] object-contain opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        style={{ x, y }}
      />
    </div>
  )
}

function DescriptionPanel({
  descriptionStanzas,
  takeaways,
}: {
  descriptionStanzas: string[]
  takeaways?: string[]
}) {
  const [showTakeaways, setShowTakeaways] = useState(false)

  const tabs = [
    { id: "story", icon: <BookOpen size={18} />, title: "Story" },
    { id: "takeaways", icon: <Star size={18} />, title: "Takeaways" },
  ]

  return (
    <div className="relative flex items-stretch -ml-10">
      {/* Vertical Chrome-like tabs */}
      {takeaways && (
        <div className="flex flex-col gap-2">
          {tabs.map((tab, i) => {
            const active =
              (tab.id === "takeaways" && showTakeaways) ||
              (tab.id === "story" && !showTakeaways)

            return (
              <button
                key={tab.id}
                onClick={() => setShowTakeaways(tab.id === "takeaways")}
                className={`relative flex items-center justify-center pr-[24px] pt-[7px] transition-all cursor-pointer
                  ${
                    active
                      ? "text-yellow-400 z-10"
                      : "bg-transparent text-white/70 hover:text-white opacity-80 hover:opacity-100"
                  }
                  rounded-l-[8px]
                `}
                title={tab.title}
              >
                {tab.icon}
              </button>
            )
          })}
        </div>
      )}

      {/* Content box fully merged with active tab */}
      <div
        className={`flex-1 rounded-r-[8px] backdrop-blur-sm space-y-4 font-lexend font-[200] tracking-[.5px] mb-5`}
      >
        {/* Story Mode */}
        {!showTakeaways &&
          descriptionStanzas.map((text, i) => (
            <p key={i} className="text-neutral-150 leading-relaxed">
              {text}
            </p>
          ))}

        {/* Takeaways Mode */}
        {showTakeaways && takeaways && (
          <div className="space-y-2">
            {takeaways.map((item, i) => (
              <div key={i} className="flex items-start gap-[7px]">
                {/* bullet */}
                <div className="w-[4px] h-[4px] mt-[11px] rounded-full bg-white shrink-0" />
                {/* text */}
                <div className="text-neutral-150 leading-relaxed">
                  {item}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}