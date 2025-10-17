import { useState, useRef, useEffect, type JSX } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BookOpen, Star } from "lucide-react";
import {
  faGithub,
} from "@fortawesome/free-brands-svg-icons"

import type { Section } from "../types/timeline"
import techIconMap from "../constants/techIconMap"
import DescriptionPanel from "../components/DescriptionPanel"
import SlideShow from "../components/SlideShow"

export default function CareerTimeline({ sections }: { sections: Section[] }) {
  const [activeSection, setActiveSection] = useState(0)
  const { containerConfig } = sections[activeSection]
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])

  // --- track scroll position ---
  useEffect(() => {
  const handleScroll = () => {
    const midpoint = window.innerHeight / 2

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return
      const rect = ref.getBoundingClientRect()
      const top = rect.top
      const bottom = rect.bottom

      if (top <= midpoint && bottom >= midpoint) {
        if (activeSection !== index) {
          setActiveSection(index)
        }
      }
    })
  }

    window.addEventListener("scroll", handleScroll)
    // run once on mount to set initial active section
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [activeSection])


  return (
    <div className="w-full py-20 text-white border-t border-b bg-black/80 border-white/10">
      {/* Header */}
      <div className="flex flex-col items-center w-full text-center mb-30">
        <h1 className="mb-4 font-bold xl:text-3xl md:text-[27px] sm:text-[27px] text-[25px] font-montserrat">Career Timeline</h1>
        <p className="font-lexend text-gray-300 font-[300] xl:text-[16px] md:text-[15px] sm:text-[16px] text-[15px] leading-relaxed 
                      xl:max-w-6xl lg:max-w-[975px] md:max-w-[730px] sm:max-w-xl max-w-[370px]">
          A look at my journey so far — from being unexpectedly assigned as the
          leader for a website project, to discovering my genuine interest in web
          development. What started as a simple task quickly turned into a passion.
          Each project since then has helped me grow as a developer, sharpening
          both my technical skills and my love for building interactive experiences.
        </p>
      </div>

      {/* Layout */}
      <div className="flex flex-col xl:gap-30 lg:gap-20 md:gap-8  mx-auto md:flex-row
                      xl:max-w-6xl lg:max-w-[975px] md:max-w-[730px] sm:max-w-xl max-w-[370px] md:pl-7">
        {/* Left side */}
        <div className="flex flex-col flex-1 space-y-20 pb-60">
          <div className="hidden lg:mb-21 md:mb-12 md:block">
            <h2 className="font-extrabold text-white font-lexend xl:text-6xl lg:text-5xl md:text-4xl">
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
              {/* Small screens: per-section media above the text */}
              <div className="mb-6 md:hidden">
                <SlideShow containerConfig={section.containerConfig} activeSection={activeSection} />
              </div>

              <p className="text-gray-400 xl:text-sm md:text-[13px] sm:text-sm text-[13px] font-montserrat">{section.year}</p>
              <h3 className="font-montserrat xl:text-[28px] lg:text-[26px] md:text-[22px] sm:text-[28px] text-[22px] font-bold mb-4">{section.title}</h3>

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
                        <div className="flex-grow h-px bg-white/10" />
                        <span className="px-4 text-xs tracking-wider text-gray-400 uppercase font-montserrat">
                          {proj.label || `Project ${idx + 1}`}
                        </span>
                        <div className="flex-grow h-px bg-white/10" />
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-2">
                      {proj.github && (
                        <>
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 rounded-[6px] bg-white/2 border border-white/6 text-gray-300 px-5 py-1 xl:text-sm md:text-[12px] sm:text-sm text-[12px] font-medium font-montserrat"
                          >
                            <FontAwesomeIcon
                              icon={faGithub}
                              className="text-gray-100 group-hover:text-white"
                            />
                          Source Code
                          </a>

                          {proj.tech && proj.tech.length > 0 && (
                            <span className="px-1 text-lg text-gray-400 select-none">•</span>
                          )}
                        </>
                      )}

                      {proj.tech?.map((tech, j) => (
                        <div
                          key={j}
                          className="flex items-center gap-2 rounded-[6px] bg-white/2 border border-white/6 text-gray-300 px-5 py-1 xl:text-sm md:text-[12px] sm:text-sm text-[12px] font-medium font-montserrat"
                        >
                          {techIconMap[tech] || null}
                          <span>{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {section.github && (
                    <>
                      <a
                        href={section.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-[6px] bg-white/2 border border-white/6 text-gray-300 px-5 py-1 xl:text-sm md:text-[12px] sm:text-sm text-[12px] font-medium font-montserrat"
                      >
                        <FontAwesomeIcon
                          icon={faGithub}
                          className="text-gray-100 group-hover:text-white"
                        />
                        Source Code
                      </a>

                      {section.tech && section.tech.length > 0 && (
                        <span className="px-1 text-lg text-gray-400 select-none">•</span>
                      )}
                    </>
                  )}

                  {section.tech?.map((tech, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 rounded-[6px] bg-white/2 border border-white/6 text-gray-300 px-5 py-1 xl:text-sm md:text-[12px] sm:text-sm text-[12px] font-medium font-montserrat"
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

        {/* Right side — sticky media (md and up) */}
        <div className="hidden md:block">
          <SlideShow containerConfig={sections[activeSection].containerConfig} activeSection={activeSection} />
        </div>
      </div>
    </div>
  )
}

/* extracted components */