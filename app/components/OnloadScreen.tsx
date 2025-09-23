// app/components/OnloadScreen.tsx
import { motion } from "framer-motion";

export default function OnloadScreen() {
  return (
    <div className="w-screen h-screen bg-[#0b0f19] relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f1624_1px,transparent_1px),linear-gradient(to_bottom,#0f1624_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Top frame */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-blue-900/80 to-transparent clip-top"
      />

      {/* Bottom frame */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-blue-900/80 to-transparent clip-bottom"
      />

      {/* Example center content */}
      <motion.div
        className="relative z-10 flex items-center justify-center h-full text-white text-3xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Welcome 👾
      </motion.div>
    </div>
  );
}
