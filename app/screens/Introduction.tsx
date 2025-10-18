// app/screens/Introduction.tsx
"use client";

import { Mail, FileDown, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence, type Variants } from "framer-motion";
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
        className="flex justify-between items-end h-[50px]"
      >
        <h1
          className="
            relative top-[2px]
            font-anta tracking-[.5px]
            text-[18px] sm:text-[22px] md:text-lg
          "
        >
          sohj.abe
        </h1>

        {/* Availability indicator */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setShowModal(true)}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="flex items-center justify-center w-3 h-3">
            <span className="inline-block w-[5px] h-[5px] rounded-full bg-green-400"></span>
          </span>
          <span
            className="
              font-montserrat font-medium tracking-[0.8px] text-green-400
              text-[13px] sm:text-[14px] md:text-[12px]
            "
          >
            Available for hire
          </span>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div
        className="flex flex-col items-center flex-1 w-full h-full gap-8 pt-5 text-center sm:gap-12 sm:pt-6 md:flex-row md:gap-12 md:pt-12 md:items-start md:text-left"
      >
        {/* Profile */}
        <motion.div
          custom={timings[1]}
          variants={blockVariant}
          className="
            relative flex-shrink-0 w-full
            sm:max-w-full md:max-w-[350px] lg:max-w-[358px] xl:max-w-[360px]
            sm:h-[470px] md:h-[440px] lg:h-[448px] xl:h-[450px]
            rounded-[7px] overflow-hidden
            shadow-[0_0_30px_rgba(255,255,255,0.15)]
          "
        >
          <img
            src="profile-pics/barong-shot.jpg"
            alt="Carlo Joshua B. Abellera"
            className="w-full h-full object-cover object-top rounded-[7px]"
          />

          {/* overlay layers */}
          <div className="absolute inset-0 rounded-[7px] border border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.2)]" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-white/5 opacity-70" />
          <div className="absolute inset-0 bg-white/3 mix-blend-overlay pointer-events-none rounded-[7px]" />
        </motion.div>

        {/* Right side */}
        <div className="flex flex-col items-center md:items-start">
          {/* Hi! */}
          <motion.p
            custom={timings[2]}
            variants={blockVariant}
            className="
              font-montserrat font-bold text-gray-300
              text-[13px] sm:text-[13px] md:text-[13px] lg:text-[15px] xl:text-[16px]
              mb-2 sm:mb-2 md:mb-3
              sm:mt-0 md:mt-1
            "
          >
            Hi! I’m Carlo Joshua B. Abellera, and I enjoy
          </motion.p>

          {/* Heading */}
          <motion.h2
            custom={timings[3]}
            variants={blockVariant}
            className="
              font-anta font-extrabold text-white
              text-[35px] sm:text-[29px] md:text-[55px] lg:text-[64px] xl:text-[65px]
              xl:leading-tight lg:leading-tight md:leading-[1.1]
              mb-8 sm:mb-10 md:mb-6 lg:mb-7 xl:mb-16
            "
          >
            Building pixel-perfect{" "}
            <br className="hidden xl:block" />
            <span className="text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text">
              Interactive
            </span>{" "}
            Websites
          </motion.h2>

          {/* Role */}
          <motion.p
            custom={timings[4]}
            variants={blockVariant}
            className="
              font-montserrat font-extrabold text-white tracking-wide
              text-[23px] sm:text-[23px] md:text-[23px] lg:text-[24px] xl:text-[24px]
              mb-10 sm:mb-10 md:mb-5 lg:mb-7 xl:mb-10
            "
          >
            Web Developer
          </motion.p>

          {/* Social Icons */}
          <motion.div
            custom={timings[5]}
            variants={blockVariant}
            className="flex items-center justify-center gap-7 md:justify-start"
          >
            {/* GitHub – stays white */}
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-white"
            >
              <FontAwesomeIcon icon={faGithub} className="w-[23px] h-[23px]" />
            </motion.a>

            {/* LinkedIn – LinkedIn blue */}
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, color: '#0A66C2' }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-white"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-[23px] h-[23px]" />
            </motion.a>

            {/* Email – soft red / coral */}
            <motion.a
              href="mailto:carlojoshua.abellera.ph@gmail.com"
              whileHover={{ scale: 1.15, color: '#ff6b6b' }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-white"
            >
              <Mail className="w-[23px] h-[23px] -translate-y-[1.2px]" />
            </motion.a>

            {/* Resume – soft green */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.15, color: '#4ade80' }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-white"
            >
              <FileDown className="w-[23px] h-[23px] -translate-y-[2px] -translate-x-[0.8px]" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 120 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div
                className="
                  relative p-10 border border-white/10 rounded-[6px]
                  w-[450px] sm:w-[520px] md:w-[700px]
                  bg-[#111] text-white shadow-2xl
                "
              >
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute text-gray-400 transition cursor-pointer top-11 right-11 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-left">
                  <h2 className="mb-4 font-montserrat font-bold text-[1.3rem] sm:text-2xl">
                    Hello there 👋
                  </h2>

                  <p className="mb-8 font-lexend font-[200] leading-relaxed tracking-[0.3px] text-gray-300 text-[14px] sm:text-[16px]">
                    I’m currently open for opportunities as a Junior Web Developer, Front-End Developer, or other related roles. I’m passionate about creating clean, responsive, and user-friendly websites, and I’m eager to keep learning and growing in a collaborative team.
                    <br />
                    <br />
                    I’m also open to other junior I.T. roles with training opportunities, as I’m always excited to expand my skills and contribute wherever I can.
                    <br />
                    <br />
                    Hope we can work together in the future.
                    <br />
                    Thank you, and have a great day!
                  </p>

                  <div className="text-right italic font-lexend font-[200] tracking-[0.3px] text-gray-300 text-[14px] sm:text-[16px]">
                    <span>
                      Sincerely,
                      <br />
                    </span>
                    <span className="font-semibold text-white font-montserrat">
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
