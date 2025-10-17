"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, type JSX as ReactJSX } from "react"
import SkillCard from "../components/SkillCard"
import skillsSections from "../constants/skillsSections"
import useBreakpoint from "../hooks/useBreakpoint"
import type { SkillsSection } from "../types/skills"
import { skillsLayoutByBp, widthOverridesByBp, containerWrapperClass, columnWidthOverridesByBp } from "../constants/skillsLayoutResponsive"


// (Using extracted SkillCard component)

export default function Skills() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const bp = useBreakpoint()

  // subtle parallax transforms
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, -100])
  const yCards = useTransform(scrollYProgress, [0, 1], [0, -50])

  const SkillCardWithWidth = SkillCard as unknown as (props: { sec: SkillsSection; index: number; widthClass?: string }) => ReactJSX.Element

  const renderFlatRow = (indices: number[]) => (
    <motion.div
      style={{ y: yCards }}
      className="flex flex-wrap justify-center w-full gap-6 lg:gap-5 md:gap-5"
    >
      {indices.map((i) => (
        <SkillCardWithWidth
          key={skillsSections[i].label}
          sec={skillsSections[i]}
          index={i}
          widthClass={widthOverridesByBp[bp]?.[i]}
        />
      ))}
    </motion.div>
  )
  const renderColumnsRow = (columns: number[][]) => (
  <motion.div style={{ y: yCards }} className="flex w-full gap-6 lg:gap-5 md:gap-5">
    {columns.map((col, colIdx) => (
      <div
        key={colIdx}
        className={`flex flex-col gap-6 lg:gap-5 md:gap-5 ${columnWidthOverridesByBp[bp]?.[colIdx] ?? "flex-1"}`}
      >
        {col.map((i) => (
          <SkillCardWithWidth
            key={skillsSections[i].label}
            sec={skillsSections[i]}
            index={i}
            widthClass={widthOverridesByBp[bp]?.[i] ?? "w-full"}
          />
        ))}
      </div>
    ))}
  </motion.div>
)


  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_10%,rgba(12,18,32,0.6)_70%,rgba(12,18,32,0.65)_85%,rgba(0,0,0,0.8)_100%)]" />

      <motion.div
        style={{ y: yHeader }}
        className="relative z-10 flex flex-col items-center w-full"
      >
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="font-montserrat xl:text-3xl md:text-[27px] sm:text-[27px] text-[25px] font-bold text-white mb-4">
            Skills & Tools
          </h1>
          <p className="font-lexend text-gray-300 font-[300] xl:text-[16px] md:text-[15px] sm:text-[16px] text-[15px] leading-relaxed w-full xl:max-w-6xl lg:max-w-[975px] md:max-w-[730px] sm:max-w-xl max-w-[370px] mx-auto">
            The technologies and workflows I’ve built my foundation on — and the ones I’m still exploring.
          </p>
        </div>

        {/* Layout — controlled per breakpoint */}
        <div className={`flex flex-col items-center w-full ${containerWrapperClass} gap-8 lg:gap-5 md:gap-5`}>
          {skillsLayoutByBp[bp].map((group, idx) => (
            <div key={idx} className="w-full">
              {Array.isArray(group[0])
                ? renderColumnsRow(group as number[][])
                : renderFlatRow(group as number[])}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
