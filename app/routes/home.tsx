import type { Route } from "./+types/home";
import OnloadScreen from "~/components/OnloadScreen";
import Starfield from "~/components/Starfield";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onload Screen" },
    { name: "description", content: "Full-screen sci-fi onload screen" },
  ];
}

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">
      {/* Onload screen always shown */}
      <OnloadScreen text="Welcome to my Portfolio Website.😇" />

      {/* Starfield background */}
      <Starfield />
    </div>
  );
}
