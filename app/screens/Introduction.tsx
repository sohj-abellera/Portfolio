//app/screens/Introduction
import { Moon, Mail, FileDown } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion, type Variants } from "framer-motion";
import SocialIcon from "~/components/SocialIcon";

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
        <h1 className="font-anta text-lg relative top-[2px]">sohj.abe</h1>
        <Moon className="w-5 h-5" />
      </motion.div>

      {/* Main content */}
      <div className="flex flex-1 flex-col w-full h-full md:flex-row gap-14 pt-12">
        {/* Profile */}
        <motion.div
          custom={timings[1]}
          variants={blockVariant}
          className="relative flex-shrink-0 w-[360px] rounded-[7px] overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.15)]"
        >
          {/* Photo */}
          <img
            src="/profile-pics/barong-shot.jpg"
            alt="Carlo Joshua B. Abellera"
            className="w-full object-cover rounded-[7px]"
          />

          {/* subtle inner highlight around edges */}
          <div className="absolute inset-0 rounded-[7px] border border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]" />

          {/* soft light reflection overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-70 pointer-events-none" />

          {/* faint glass tint */}
          <div className="absolute inset-0 bg-white/3 mix-blend-overlay pointer-events-none rounded-[7px]" />
        </motion.div>


        {/* Right side */}
        <div className="flex flex-col">
          {/* Hi! */}
          <motion.p
            custom={timings[2]}
            variants={blockVariant}
            className="font-montserrat text-gray-300 font-bold text-[16px] mb-3"
          >
            Hi! I’m Carlo Joshua B. Abellera,
            and I enjoy
          </motion.p>

          {/* Heading */}
          <motion.h2
            custom={timings[3]}
            variants={blockVariant} 
            className="font-anta text-[63px] font-extrabold leading-tight mb-14"
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
            className="font-montserrat font-extrabold text-white text-[26px] mb-10 tracking-wide"
          >
            Full Stack Developer
          </motion.p>

          {/* Icons */}
          <motion.div
            custom={timings[5]}
            variants={blockVariant}
            className="flex flex-wrap gap-3"
          >
            <SocialIcon
              icon={<FontAwesomeIcon icon={faGithub} className="w-[20px] h-[20px] translate-y-[1.2px] -translate-x-[0.5px]" />}
              label="GitHub"
              href="https://github.com"
            />
            <SocialIcon
              icon={<FontAwesomeIcon icon={faLinkedin} className="w-[20px] h-[20px] translate-y-[1.2px] -translate-x-[0.6px]" />}
              label="LinkedIn"
              href="https://linkedin.com"
            />
            <SocialIcon
              icon={<Mail className="w-[20px] h-[20px] -translate-y-[0.5px] -translate-x-[0.6px]" />}
              label="Email"
              href="mailto:carlojoshua.abellera.ph@gmail.com"
            />
            <SocialIcon
              icon={<FileDown className="w-[20px] h-[20px] -translate-y-[0.5px] -translate-x-[0.6px]" />}
              label="Resume"
              href="/resume.pdf"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
