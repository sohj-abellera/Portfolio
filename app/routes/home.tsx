import type { Route } from "./+types/home";
import Starfield from "../components/Starfield/Starfield";
import Screen_1 from "../screens/Screen_1";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio" },
    { name: "description", content: "Full-screen sci-fi onload screen" },
  ];
}

export default function Home() {
  return (
    <div className="w-screen min-h-screen text-white flex items-center justify-center relative">
      {/* Background starfield */}
      <Starfield />

      {/* Typing animation text */}
      <div className="absolute z-10">
        <Screen_1 text="Welcome to My Portfolio Website.😊" speed={75} />
      </div>
    </div>
  );
}
