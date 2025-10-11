import { Github, Linkedin, Mail, FileDown } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full h-[70vh] text-center text-sm text-white/70 mt-0 flex flex-col justify-end overflow-hidden">
      {/* 🌀 Gradient to blend smoothly from Skills */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8)_0%,rgba(0,0,0,1)_100%)]" />

      <div className="relative z-10 w-full px-4 pb-8">
        {/* Social icons */}
        <div className="flex justify-center gap-5 mb-3 pt-10">
          <a
            href="https://linkedin.com/in/carlojoshua-abellera"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="w-6 h-6 hover:text-blue-400 transition-colors" />
          </a>
          <a href="https://github.com/sohj-abellera" target="_blank" rel="noreferrer">
            <Github className="w-6 h-6 hover:text-gray-400 transition-colors" />
          </a>
          <a href="mailto:carlojoshua.abellera.ph@gmail.com">
            <Mail className="w-6 h-6 hover:text-red-400 transition-colors" />
          </a>
          <a href="/resume.pdf" download>
            <FileDown className="w-6 h-6 hover:text-green-400 transition-colors" />
          </a>
        </div>

        <p className="mb-2">
          Designed & Built by <span className="text-white font-medium">sohj.abe</span>
        </p>
      </div>
    </footer>
  );
}
