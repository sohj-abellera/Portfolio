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
} from "@fortawesome/free-brands-svg-icons"

export const techIconMap: Record<string, JSX.Element> = {
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

export default techIconMap


