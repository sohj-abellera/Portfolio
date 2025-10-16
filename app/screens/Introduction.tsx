// app/screens/Introduction.tsx
"use client";

import { Mail, FileDown, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import SocialIcon from "~/components/SocialIcon";
import { useState } from "react";

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
  const [showModal, setShowModal] = useState(false);

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

        {/* Availability indicator (soft opacity pulse) */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setShowModal(true)}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="flex items-center justify-center h-3 w-3">
            <span className="inline-block h-[5px] w-[5px] rounded-full bg-green-400"></span>
          </span>
          <span className="font-montserrat text-[12px] tracking-[0.8px] text-green-400 font-medium">
            Available for hire
          </span>
        </motion.div>


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

          {/* Social Icons */}
          <motion.div
            custom={timings[5]}
            variants={blockVariant}
            className="flex flex-wrap gap-4"
          >
            <SocialIcon
              icon={
                <FontAwesomeIcon
                  icon={faGithub}
                  className="w-[30px] h-[30px] translate-y-[1.2px] -translate-x-[0.5px]"
                />
              }
              label="GitHub"
              href="https://github.com"
            />
            <SocialIcon
              icon={
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="w-[30px] h-[30px] translate-y-[1.2px] -translate-x-[0.6px]"
                />
              }
              label="LinkedIn"
              href="https://linkedin.com"
            />
            <SocialIcon
              icon={
                <Mail className="w-[30px] h-[30px] -translate-y-[0.5px] -translate-x-[0.6px]" />
              }
              label="Email"
              href="mailto:carlojoshua.abellera.ph@gmail.com"
            />
            <SocialIcon
              icon={
                <FileDown className="w-[30px] h-[30px] -translate-y-[0.5px] -translate-x-[0.6px]" />
              }
              label="Resume"
              href="/resume.pdf"
            />
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setShowModal(false)}
            />

            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-[#111] text-white p-10 rounded-[6px] shadow-2xl w-[700px] relative border border-white/10">
                {/* Close button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-10 right-10 text-gray-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-left">
                  <h2 className="font-montserrat text-2xl font-bold mb-4">
                    Hello there 👋
                  </h2>

                  <p className="font-lexend text-gray-300 tracking-[0.3px] font-[200] mb-8 leading-relaxed">
                    I’m currently open for opportunities as a Junior Web Developer, Front-End Developer, or other related roles. I’m passionate about creating clean, responsive, and user-friendly websites, and I’m eager to keep learning and growing in a collaborative team.
                    <br /><br />
                    I’m also open to other junior I.T. roles with training opportunities, as I’m always excited to expand my skills and contribute wherever I can.
                    <br /><br />
                    Hope we can work together in the future.
                    <br />
                    Thank you, and have a great day!
                  </p>

                  <div className="font-lexend text-gray-300 tracking-[0.3px] font-[200] text-right italic">
                    <span className=""> Sincerely,<br /></span>
                    <span className="font-montserrat text-white font-semibold">
                      Josh Abellera
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
