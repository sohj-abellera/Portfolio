import type { Route } from "./+types/home";
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onload Screen" },
    { name: "description", content: "Full-screen sci-fi onload screen" },
  ];
}

export default function Home() {

  return (
    <div className="w-screen min-h-screen">
    </div>
  );
}
