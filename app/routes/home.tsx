// app/routes/home.tsx
import type { Route } from "./+types/home";
import { motion } from "framer-motion";
import TabletScreen from "../components/tabletscreen";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Octagon Layout" },
    { name: "description", content: "Full-screen octagon with margin" },
  ];
}

export default function Home() {
  return (
     <div className="w-screen h-screen flex items-center justify-center bg-transparent relative">
      {/* Background Octagon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <TabletScreen />
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 text-white text-3xl font-bold"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
      >
        <p>Hello, I’m your main content 👋</p>
      </motion.div>
    </div>
  );
}
