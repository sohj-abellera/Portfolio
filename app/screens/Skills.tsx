"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Laptop, Wrench, Rocket, Layout, Server } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { JSX } from "react"
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
  faPython,
  faGitAlt,
} from "@fortawesome/free-brands-svg-icons"

// 🔹 Common types
type Section = {
  label: string
  width: string
  icon: JSX.Element
  items: string[]
  desc: string
}

const ICON_SIZE = "text-[13px]"

// ✅ Tiny reusable component for tech images
function TechImg({
  src,
  alt,
  className = "",
}: {
  src: string
  alt: string
  className?: string
}) {
  return <img src={src} alt={alt} className={`w-[13px] h-[13px] ${className}`} />
}

// 🧩 Centralized icon data
const techIconMap: Record<string, JSX.Element> = {
  HTML: <FontAwesomeIcon icon={faHtml5} className={`text-orange-500 ${ICON_SIZE}`} />,
  CSS: <FontAwesomeIcon icon={faCss3Alt} className={`text-blue-500 ${ICON_SIZE}`} />,
  JavaScript: <FontAwesomeIcon icon={faJs} className={`text-yellow-400 ${ICON_SIZE}`} />,
  React: <FontAwesomeIcon icon={faReact} className={`text-cyan-400 ${ICON_SIZE}`} />,
  GitHub: <FontAwesomeIcon icon={faGithub} className={`text-gray-300 ${ICON_SIZE}`} />,
  Git: <FontAwesomeIcon icon={faGitAlt} className={`text-orange-500 ${ICON_SIZE}`} />,
  Bootstrap: <FontAwesomeIcon icon={faBootstrap} className={`text-purple-400 ${ICON_SIZE}`} />,
  NodeJS: <FontAwesomeIcon icon={faNodeJs} className={`text-green-500 ${ICON_SIZE}`} />,
  PHP: <FontAwesomeIcon icon={faPhp} className={`text-indigo-400 ${ICON_SIZE}`} />,
  Java: <FontAwesomeIcon icon={faJava} className={`text-red-500 ${ICON_SIZE}`} />,
  Python: <FontAwesomeIcon icon={faPython} className={`text-yellow-400 ${ICON_SIZE}`} />,
  Android: <FontAwesomeIcon icon={faAndroid} className={`text-green-400 ${ICON_SIZE}`} />,
  "Android Studio": <FontAwesomeIcon icon={faAndroid} className={`text-[#3DDC84] ${ICON_SIZE}`} />,

  Firebase: <TechImg src="https://www.svgrepo.com/show/353735/firebase.svg" alt="Firebase" />,
  MySQL: <TechImg src="https://www.svgrepo.com/show/303251/mysql-logo.svg" alt="MySQL" />,
  Tailwind: <TechImg src="https://www.svgrepo.com/show/354431/tailwindcss-icon.svg" alt="Tailwind CSS" />,
  TypeScript: <TechImg src="https://www.svgrepo.com/show/354478/typescript-icon.svg" alt="TypeScript" />,
  "Next.js": <TechImg src="https://www.svgrepo.com/show/354113/nextjs-icon.svg" alt="Next.js" className="invert" />,
  C: <TechImg src="/C.svg" alt="C" />,
  "C++": (
    <TechImg
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
      alt="C++"
    />
  ),
  "VS Code": (
    <TechImg
      src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"
      alt="VS Code"
    />
  ),
  "Google Workspace": (
    <TechImg src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Workspace" />
  ),
}

// 📚 Data-driven section config
const sections: Section[] = [
  {
    label: "Web Development",
    width: "w-[58.3%]",
    icon: <Layout size={30} className="text-cyan-400" />,
    items: ["HTML", "CSS", "JavaScript", "PHP", "Bootstrap"],
    desc: "I love designing interfaces and bringing them to life with backend integration.",
  },
  {
    label: "Databases",
    width: "w-[39.1%]",
    icon: <Server size={30} className="text-green-400" />,
    items: ["MySQL", "Firebase"],
    desc: "I enjoy problem-solving — at least most of the time.",
  },
  {
    label: "Programming & Mobile Development",
    width: "w-[34.3%]",
    icon: <Laptop size={30} className="text-sky-400" />,
    items: ["Java", "Android Studio", "C", "C++", "Python"],
    desc: "Techs I’ve worked with before… it’s been a while though.",
  },
  {
    label: "Tools & Version Control",
    width: "w-[34.1%]",
    icon: <Wrench size={30} className="text-amber-400" />,
    items: ["Git", "GitHub", "VS Code", "Google Workspace"],
    desc: "The tools I mainly use — and the ones I find most relevant.",
  },
  {
    label: "Currently Exploring",
    width: "w-[27%]",
    icon: <Rocket size={30} className="text-purple-400" />,
    items: [ "React", "Tailwind", "TypeScript", "Next.js"],
    desc: "Stuff I’m currently exploring and trying to get better at.",
  },
]

// 💎 SkillCard — clean & scalable
function SkillCard({ sec, index }: { sec: Section; index: number }) {
  return (
    <motion.div
      className={`${sec.width} bg-white/1 border border-white/10 rounded-[8px] p-6 backdrop-blur-sm`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }} // 👈 replays when re-entering view
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {sec.icon}
        <h2 className="font-lexend font-[400] text-[16px] tracking-[0.5px] leading-relaxed text-white">
          {sec.label}
        </h2>
      </div>

      {/* Description */}
      <p className="font-lexend font-[300] text-sm text-gray-300 tracking-[0.5px] leading-relaxed mb-5">
        {sec.desc}
      </p>

      {/* Skills */}
      <ul className="flex flex-wrap gap-2">
        {sec.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-[2px] bg-white/2 border border-white/6 
                       text-gray-300 px-5 py-1 text-sm font-medium font-montserrat"
          >
            {techIconMap[item]}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

// 🧠 Main export
export default function Skills() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  // subtle parallax transforms
  const yHeader = useTransform(scrollYProgress, [0, 1], [0, -100])
  const yCards = useTransform(scrollYProgress, [0, 1], [0, -50])

  const renderSectionGroup = (indices: number[]) => (
    <motion.div
      style={{ y: yCards }}
      className="flex justify-center flex-wrap gap-6 w-full"
    >
      {indices.map((i) => (
        <SkillCard key={sections[i].label} sec={sections[i]} index={i} />
      ))}
    </motion.div>
  )

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_10%,rgba(12,18,32,0.6)_70%,rgba(12,18,32,0.65)_85%,rgba(0,0,0,0.8)_100%)]" />

      <motion.div
        style={{ y: yHeader }}
        className="relative z-10 w-full flex flex-col items-center"
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-montserrat text-3xl font-bold text-white mb-4">
            Skills & Tools
          </h1>
          <p className="font-lexend text-gray-300 font-[300] text-[16px] leading-relaxed max-w-xl mx-auto">
            The technologies and workflows I’ve built my foundation on — and the ones I’m still exploring.
          </p>
        </div>

        {/* Layout — 2 top, 3 bottom (with parallax) */}
        <div className="flex flex-col items-center gap-8 w-full max-w-6xl">
          {renderSectionGroup([0, 1])}
          {renderSectionGroup([2, 3, 4])}
        </div>
      </motion.div>
    </section>
  )
}
