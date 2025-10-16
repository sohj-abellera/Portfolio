"use client"

import { Mail, FileDown } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="relative w-full h-[80vh] text-center text-sm text-white/70 mt-0 flex flex-col justify-end overflow-hidden">
      {/* 🌀 Gradient to blend smoothly from Skills */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8)_0%,rgba(0,0,0,1)_100%)]" />

      <div className="relative z-10 w-full px-4 pb-12">
        {/* Social icons */}
        <div className="flex justify-center gap-5 mb-3 pt-10">
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/carlojoshua-abellera"
            target="_blank"
            rel="noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="w-[28px] h-[28px] translate-y-[1.2px] -translate-x-[0.6px]"
            />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/sohj-abellera"
            target="_blank"
            rel="noreferrer"
            className="text-white/70 hover:text-white transition-colors"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="w-[28px] h-[28px] translate-y-[1.2px] -translate-x-[0.5px]"
            />
          </a>

          {/* Email */}
          <a
            href="mailto:carlojoshua.abellera.ph@gmail.com"
            className="text-white/70 hover:text-white transition-colors"
          >
            <Mail className="w-[28px] h-[28px] -translate-y-[0.5px] -translate-x-[0.6px]" />
          </a>

          {/* Resume */}
          <a href="/resume.pdf" download className="text-white/70 hover:text-white transition-colors">
            <FileDown className="w-[28px] h-[28px] -translate-y-[0.5px] -translate-x-[0.6px]" />
          </a>
        </div>

        <div className="text-center">
          <p className="font-lexend tracking-[0.3px] text-[16px] font-[200] mb-1">
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
