import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsCalendarDate } from "react-icons/bs";
import { HiDocumentText } from "react-icons/hi";
import { FaRegMoon } from "react-icons/fa"; // Hollow moon icon

export default function Introduction() {
  return (
    <section
      id="introduction"
      className="h-screen w-full px-[120px] text-white relative z-10 flex flex-col"
    >
      {/* Top Bar */}
      <div className="h-[90px] flex items-center justify-between">
        <div className="text-[20px] font-audiowide font-bold tracking-[.05em]">sohj.abe</div>
        <button className="text-2xl hover:text-purple-400 transition-colors">
          <FaRegMoon />
        </button>
      </div>

        {/* Main Content */}
        <div className="flex flex-1 items-start mt-1.5">
        {/* Left: Profile Image */}
        <div className="w-[370px] flex-shrink-0 mr-15">
            <img
            src="/profile2.jpg"
            alt="Carlo Abellera"
            className="w-full h-[460px] object-cover rounded-[5px] shadow-lg"
            />
        </div>

        {/* Right: Text & Socials */}
        <div className="flex flex-col justify-start flex-1">
          <p className="text-gray-300 text-1xl mb-2">
            Hi! I&apos;m Carlo Joshua Abellera, and I enjoy
          </p>
          <h1 className="text-6xl font-dmsans font-black leading-tight">
            Building pixel-perfect{" "}
            <span className="text-purple-400">Interactive</span> websites{" "}
          </h1>
          <p className="mt-4 text-2xl text-gray-300 font-medium">
            Full-Stack Developer
          </p>

          {/* Social Icons */}
          <div className="flex space-x-5 mt-6 text-2xl">
            <a
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-purple-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              className="hover:text-purple-400"
            >
              <FaGithub />
            </a>
            <a href="mailto:your@email.com" className="hover:text-purple-400">
              <MdEmail />
            </a>
            <a href="#" className="hover:text-purple-400">
              <BsCalendarDate />
            </a>
            <a href="/resume.pdf" className="hover:text-purple-400">
              <HiDocumentText />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
