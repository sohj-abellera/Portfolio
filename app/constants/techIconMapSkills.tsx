import type { JSX } from "react"
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
  faPython,
  faGitAlt,
} from "@fortawesome/free-brands-svg-icons"

const ICON_SIZE = "text-[13px]"

function TechImg({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`w-[13px] h-[13px] ${className}`} />
}

export const techIconMapSkills: Record<string, JSX.Element> = {
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
  C: <TechImg src="C.svg" alt="C" />,
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
  "Google Workspace": <TechImg src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Workspace" />,
}

export default techIconMapSkills


