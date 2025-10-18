import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, animate } from "framer-motion"
import type { ContainerConfig } from "../types/timeline"
import BouncingLogo from "./BouncingLogo"

export default function SlideShow({
  containerConfig,
  activeSection,
}: {
  containerConfig: ContainerConfig
  activeSection: number
}) {
  const { bgImage, bgColor, slides = [] } = containerConfig

  const x = useMotionValue(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [slideWidth, setSlideWidth] = useState(480)
  const [isMobile, setIsMobile] = useState(false)
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [disableTransition, setDisableTransition] = useState(true)
  const totalSlides = slides.length
  const totalWidth = slideWidth * totalSlides
  const resumeTimer = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Disable transitions briefly on first mount
  useEffect(() => {
    const t = setTimeout(() => setDisableTransition(false), 800)
    return () => clearTimeout(t)
  }, [])

  // Detect mobile screen (below md: 768px)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Click outside to deactivate video
  useEffect(() => {
    const handleClickOutside = () => setActiveVideo(null)
    window.addEventListener("click", handleClickOutside)
    return () => window.removeEventListener("click", handleClickOutside)
  }, [])

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
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      resumeTimer.current = setTimeout(() => setIsPaused(false), 6000)
    }
  }

  const handleDragEnd = (_: any, info: any) => {
    const currentX = x.get()
    const velocity = info.velocity.x
    const direction = velocity > 0 ? -1 : 1
    let index = Math.round(-currentX / slideWidth)
    const distanceThreshold = slideWidth * 0.3
    const draggedDistance = -currentX - activeSlide * slideWidth

    if (Math.abs(velocity) > 500) index += direction
    else if (Math.abs(draggedDistance) > distanceThreshold)
      index += Math.sign(draggedDistance)

    changeSlide(index, true)
  }

  useEffect(() => {
    if (slides.length <= 1) return
    let interval: NodeJS.Timeout | null = null

    if (!isPaused) {
      interval = setInterval(() => {
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
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [slides.length, isPaused, slideWidth, totalSlides, x])

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      x.set(0)
      setActiveSlide(0)
    })
    return () => cancelAnimationFrame(raf)
  }, [activeSection])

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setSlideWidth(rect.width)
      }
    }
    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [])

  return (
    <div
      ref={containerRef}
      className="xl:w-[480px] lg:w-[420px] md:w-[350px] sm:w-full w-full
                 xl:h-[470px] lg:h-[410px] md:h-[370px] sm:h-[505px] h-[360px]
                 sticky lg:top-24 md:top-36 rounded-xl shadow-lg overflow-hidden select-none tracking-[0.2px]"
      style={{
        backgroundColor: bgColor || "rgba(255,255,255,0.05)",
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Overlays */}
      <div
        className="absolute inset-0 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/10"
        style={{
          backgroundColor: bgColor || "rgba(255,255,255,0.03)",
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 rounded-xl border border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.15)] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-60 rounded-xl" />
      <div className="absolute inset-0 pointer-events-none bg-white/3 mix-blend-overlay rounded-xl" />
      <div className="absolute inset-0 z-30 pointer-events-none" />

      {/* Slides */}
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
          <div
            key={i}
            className="relative flex-shrink-0 h-full"
            style={{ width: `${slideWidth}px` }}
          >
            {slide.title && (
              <div className="absolute z-10 top-7 left-9 right-6">
                <h3 className="font-extrabold text-white xl:text-2xl lg:text-[21px] md:text-[19px] sm:text-2xl text-[18px] font-lexend drop-shadow-md">
                  {slide.title}
                </h3>
              </div>
            )}

            {/* Video */}
            {slide.video && (
              <motion.video
                src={slide.video}
                preload="auto"
                autoPlay
                loop
                muted
                playsInline
                className={`absolute object-cover rounded-[4px] transition-all duration-300 ${
                  disableTransition ? "![transition-none]" : ""
                } ${
                  slide.customId === "for-class-funds"
                    ? "top-[110px] sm:top-[100px] md:top-[85px] xl:top-[100px] right-8 w-[95px] sm:w-[180px] md:w-[110px] lg:w-[130px] xl:w-[150px]"
                    : slide.customId === "for-capstone-thesis"
                    ? "top-[120px] left-[50px] w-[360px] hidden"
                    : "xl:top-[108px] lg:top-[100px] md:top-[90px] sm:top-[108px] top-[120px] left-7 xl:w-[400px] lg:w-[340px] md:w-[280px] sm:w-[430px] w-[240px]"
                }`}
                style={{
                  boxShadow:
                    activeVideo === slide.video
                      ? "0px 8px 18px rgba(0, 0, 0, 0.45), 0px 4px 10px rgba(0, 0, 0, 0.25)"
                      : "0px 8px 16px rgba(0, 0, 0, 0.45), 0px -2px 6px rgba(0, 0, 0, 0.15)",
                  zIndex:
                    slide.customId === "for-class-funds"
                      ? 50
                      : activeVideo === slide.video
                      ? 45
                      : 20,
                  transform:
                    activeVideo === slide.video ? "scale(1.03)" : "scale(1)",
                  transition: "all 0.25s ease",
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveVideo(
                    activeVideo === slide.video ? null : slide.video ?? null
                  )
                }}
                whileHover={
                  !isMobile && activeVideo !== slide.video
                    ? {
                        scale: 1.03,
                        boxShadow:
                          "0px 8px 18px rgba(0, 0, 0, 0.45), 0px 4px 10px rgba(0, 0, 0, 0.25)",
                        zIndex:
                          slide.customId === "for-class-funds" ? 50 : 45,
                      }
                    : undefined
                }
              />
            )}

            {/* Overlay Images */}
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
                        ? "top-[123px] sm:top-[120px] md:top-[95px] lg:top-[103px] xl:top-[120px] left-8 w-[200px] sm:w-[440px] md:w-[230px] lg:w-[350px]"
                        : slide.customId === "for-capstone-thesis"
                        ? "bottom-16 sm:bottom-27 md:bottom-23 lg:bottom-21 xl:bottom-24 left-1/2 -translate-x-1/2 w-[255px] sm:w-[450px] md:w-[280px] lg:w-[350px] xl:w-[415px]"
                        : "bottom-12 right-7 xl:w-[290px] lg:w-[250px] md:w-[210px] sm:w-[310px] w-[170px]"
                    }`}
                    style={{
                      zIndex:
                        slide.customId === "for-class-funds" ? 10 : 30,
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

      {/* Pagination */}
      {slides.length > 1 && (
        <div className="absolute left-0 right-0 z-50 flex justify-center gap-3 cursor-default bottom-4">
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
  )
}
