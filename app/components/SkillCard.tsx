import { motion } from "framer-motion"
import type { SkillsSection } from "../types/skills"
import techIconMapSkills from "../constants/techIconMapSkills"

export default function SkillCard({ sec, index, widthClass }: { sec: SkillsSection; index: number; widthClass?: string }) {
  return (
    <motion.div
      className={`${widthClass ?? sec.width} bg-white/1 border border-white/10 rounded-[8px] p-6 backdrop-blur-sm`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-4">
        {sec.icon}
        <h2 className="font-lexend font-[400] text-[16px] tracking-[0.5px] leading-relaxed text-white">
          {sec.label}
        </h2>
      </div>

      <p className="font-lexend font-[300] text-sm text-gray-300 tracking-[0.5px] leading-relaxed mb-5">
        {sec.desc}
      </p>

      <ul className="flex flex-wrap gap-2">
        {sec.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-[2px] bg-white/2 border border-white/6 
                       text-gray-300 px-5 py-1 text-sm font-medium font-montserrat"
          >
            {techIconMapSkills[item]}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}


