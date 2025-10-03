//app/screens/Homepage.tsx
import { Moon, Github, Linkedin, Mail, FileDown } from "lucide-react";
export default function Homepage() {
  return (
    <div className="flex flex-col w-full h-full text-white">
      {/* Navbar */}
      <div className="h-[50px] flex justify-between items-end">
        <h1 className="font-bold text-lg relative top-[2px]">sohj.abe</h1>
        <Moon className="w-5 h-5" />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col w-full h-full md:flex-row gap-14 pt-12">
        {/* Left: Image container */}
        <div className="flex-shrink-0">
          <img
            src="/profile-pics/barong-shot.jpg" // <-- replace with your portrait file
            alt="Carlo Joshua B. Abellera"
            className="w-[380px]  object-cover rounded-[6px] shadow-lg"
          />
        </div>

        {/* Right: Text container */}
        <div className="flex flex-col">
          {/* Line 1 */}
          <p className="text-gray-300 font-bold text-[18px] mb-3">
            Hi! I’m Carlo Joshua B. Abellera,
            and I enjoy
          </p>

          {/* Line 2 */}
          <h2 className="text-6xl font-extrabold leading-tight mb-14">
            Building pixel-perfect <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Interactive
            </span>{" "}
            Websites
          </h2>

          {/* Line 3 */}
          <p className="text-white text-[26px] font-bold mb-6">Full Stack Developer</p>

          {/* Line 4: Icons */}
          <div className="flex gap-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="w-8 h-8 hover:text-blue-400 transition-colors" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="w-8 h-8 hover:text-gray-400 transition-colors" />
            </a>
            <a href="mailto:your@email.com">
              <Mail className="w-8 h-8 hover:text-red-400 transition-colors" />
            </a>
            <a href="/resume.pdf" download>
              <FileDown className="w-8 h-8 hover:text-green-400 transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
