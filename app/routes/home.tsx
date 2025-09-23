// app/routes/home.tsx
import type { Route } from "./+types/home";
import OnloadScreen from "../components/OnloadScreen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onload Screen" },
    { name: "description", content: "Full-screen sci-fi onload screen" },
  ];
}

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative">
      <OnloadScreen />
    </div>
  );
}
