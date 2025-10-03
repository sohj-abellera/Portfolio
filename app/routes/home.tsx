import type { Route } from "./+types/home";
import Starfield from "../components/Starfield/Starfield";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio" },
    { name: "description", content: "Full-screen sci-fi onload screen" },
  ];
}

export default function Home() {
  return (
    <div className="w-screen min-h-screen text-white flex items-center justify-center">
      {/* Background starfield */}
      <Starfield />
    </div>
  );
}
