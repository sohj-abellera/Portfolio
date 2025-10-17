import { Laptop, Wrench, Rocket, Layout, Server } from "lucide-react"
import type { SkillsSection } from "../types/skills"

export const skillsSections: SkillsSection[] = [
  {
    label: "Web Development",
    width: "w-[58.3%]",
    icon: <Layout size={30} className="text-cyan-400" />,
    items: ["HTML", "CSS", "JavaScript", "PHP"],
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
    items: ["C", "C++", "Python", "Java", "Android Studio"],
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
    items: ["React", "Tailwind"],
    desc: "Stuff I’m currently exploring and trying to get better at.",
  },
]

export default skillsSections


