//app/screens/Introduction
import { Moon, Github, Linkedin, Mail, FileDown } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const blockVariant: Variants = {
  hidden: { y: "100vh", opacity: 0 },
  visible: ({ duration = 0.8, delay = 0, ease = [0.42, 0, 0.58, 1] }) => ({
    y: 0,
    opacity: 1,
    transition: { duration, delay, ease },
  }),
};

type BlockTiming = {
  duration?: number;
  delay?: number;
  ease?: number[] | string;
};

export default function Introduction({ timings = [] as BlockTiming[] }) {
  return (
    <motion.div
      className="flex flex-col w-full h-full text-white"
      initial="hidden"
      animate="visible"
    >
      {/* Navbar */}
      <motion.div
        custom={timings[0]}
        variants={blockVariant}
        className="h-[50px] flex justify-between items-end"
      >
        <h1 className="font-bold text-lg relative top-[2px]">sohj.abe</h1>
        <Moon className="w-5 h-5" />
      </motion.div>

      {/* Main content */}
      <div className="flex flex-1 flex-col w-full h-full md:flex-row gap-14 pt-12">
        {/* Profile */}
        <motion.div
          custom={timings[1]}
          variants={blockVariant}
          className="flex-shrink-0"
        >
          <img
            src="/profile-pics/barong-shot.jpg"
            alt="Carlo Joshua B. Abellera"
            className="w-[380px] object-cover rounded-[6px] shadow-lg"
          />
        </motion.div>

        {/* Right side */}
        <div className="flex flex-col">
          {/* Hi! */}
          <motion.p
            custom={timings[2]}
            variants={blockVariant}
            className="text-gray-300 font-bold text-[18px] mb-3"
          >
            Hi! I’m Carlo Joshua B. Abellera,
            and I enjoy
          </motion.p>

          {/* Heading */}
          <motion.h2
            custom={timings[3]}
            variants={blockVariant}
            className="text-6xl font-extrabold leading-tight mb-14"
          >
            Building pixel-perfect <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Interactive
            </span>{" "}
            Websites
          </motion.h2>

          {/* Role */}
          <motion.p
            custom={timings[4]}
            variants={blockVariant}
            className="text-white text-[26px] font-bold mb-6"
          >
            Full Stack Developer
          </motion.p>

          {/* Icons */}
          <motion.div
            custom={timings[5]}
            variants={blockVariant}
            className="flex gap-4"
          >
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
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
