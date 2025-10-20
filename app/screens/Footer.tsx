"use client"

import { Mail, FileDown } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="relative w-full h-[20vh] text-center text-sm text-white/70 mt-0 flex flex-col justify-center items-center overflow-hidden">
      {/* 🌀 Gradient to blend smoothly from Skills */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8)_0%,rgba(0,0,0,1)_100%)]" />

      <div className="relative z-10 w-full px-4 pb-6 md:pb-12 xl:max-w-6xl lg:max-w-[975px] md:max-w-[730px] sm:max-w-xl max-w-[370px] mx-auto">
        {/* Social icons */}
        <div className="flex justify-center gap-5 pt-10 mb-3">
          <a href="https://github.com/sohj-abellera" target="_blank" rel="noreferrer" className="transition-colors text-white/70 hover:text-white">
            <FontAwesomeIcon icon={faGithub} className="md:w-[28px] md:h-[28px] w-[24px] h-[24px]" />
          </a>

          <a href="https://www.linkedin.com/in/carlojoshua-abellera/" target="_blank" rel="noreferrer" className="transition-colors text-white/70 hover:text-white">
            <FontAwesomeIcon icon={faLinkedin} className="md:w-[28px] md:h-[28px] w-[24px] h-[24px]" />
          </a>

          <a href="mailto:carlojoshua.abellera.ph@gmail.com" className="transition-colors text-white/70 hover:text-white">
            <Mail className="md:w-[28px] md:h-[28px] w-[24px] h-[24px]" />
          </a>

          <a href="/resume.pdf" download className="transition-colors text-white/70 hover:text-white">
            <FileDown className="md:w-[28px] md:h-[28px] w-[24px] h-[24px]" />
          </a>
        </div>

        <div className="text-center">
          <p className="font-lexend tracking-[0.3px] md:text-[16px] text-[10px] font-[200] mb-1">
            Designed in my mind, built by instinct — by{" "}
            <a href="#" className="text-white font-[300] hover:underline">
              sohj.abe
            </a>
          </p>
          <p className="text-[6px] text-white/50 font-lexend tracking-[0.2px] font-[100]">
            (I had <span className="text-white/70">ChatGPT</span> help me though...)
          </p>
        </div>
      </div>
    </footer>
  )
}
