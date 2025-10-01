import type { Route } from "./+types/home";
import OnloadScreen from "~/sections/OnLoadScreen";
import Starfield from "~/components/Starfield";
import Introduction from "~/sections/Introduction"; 
import Projects from "~/sections/Projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onload Screen" },
    { name: "description", content: "Full-screen sci-fi onload screen" },
  ];
}

export default function Home() {
  const showOnload = false; 

  return (
    <div className="w-screen min-h-screen bg-black relative">
      {showOnload && (
        <OnloadScreen text="Welcome to my Portfolio Website.😇" />
      )}

      {/* Starfield background */}
      <Starfield />

      {/* Main Sections */}
      <div className="relative z-10">
        <Introduction />
        <Projects />
      </div>
    </div>
  );
}
