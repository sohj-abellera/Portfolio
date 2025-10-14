import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";

type SocialIconProps = {
  icon: ReactNode;
  label: string;
  href: string;
};

export default function SocialIcon({ icon, label, href }: SocialIconProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex items-center overflow-hidden h-[44px] rounded-[10px] text-white"
      animate={{
        width: hovered ? "120px" : "44px",
      }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* 🌈 Gradient border draw */}
      <motion.div
        className="absolute inset-0 rounded-[10px] p-[1.5px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "left center",
        }}
      >
        <div className="w-full h-full bg-black rounded-[8px]" />
      </motion.div>

      {/* Content */}
      <div className="relative flex items-center px-3 z-10">
        {/* Icon */}
        <motion.div
          initial={false}
          animate={{ x: hovered ? 0 : 0 }}
          transition={{ duration: 0.45 }}
          className="text-white"
        >
          {icon}
        </motion.div>

        {/* Label wrapper for reveal effect */}
        <div className="ml-2 overflow-hidden">
          <motion.span
            className="font-montserrat text-sm text-white whitespace-nowrap block origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              opacity: hovered ? 1 : 0,
            }}
          >
            {label}
          </motion.span>
        </div>
      </div>
    </motion.a>
  );
}
