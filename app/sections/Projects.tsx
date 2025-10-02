import { useEffect, useRef, useState } from "react";

export default function Projects() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 80);
      }

      // Check which project is closest to top
      let current = 0;
      projectRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= 100) {
            current = idx;
          }
        }
      });
      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: "Project One",
      desc: "A short description line for project one.",
    },
    {
      title: "Project Two",
      desc: "Another short description for project two.",
    },
    {
      title: "Project Three",
      desc: "Something about project three.",
    },
  ];

  return (
    <section
      id="projects"
      className={`relative z-10 w-full h-auto mt-16
                 bg-blue-950/15 backdrop-blur-[30px] 
                 border-t border-b border-white/20
                 transition-all duration-500
                 ${isSticky ? "px-[80px]" : "px-[120px]"}`}
    >
      <h2 className="text-3xl font-bold text-center text-white mt-20 mb-30">
        Projects
      </h2>

      <div className="flex items-start gap-10 mt-10 h-[400vh]">
        {/* IMAGE */}
        <div
          ref={imageRef}
          className={`rounded-[10px] overflow-hidden mr-[30px]
                      border border-white/20 sticky top-20
                      transition-all duration-500 ease-in-out
                      ${isSticky ? "w-[690px] h-[340px]" : "w-[528px] h-[260px]"}`}
        >
          <img
            src="/sample website.PNG"
            alt="Project preview"
            className="w-full h-full object-cover"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="flex-1 text-white relative">
          {projects.map((p, idx) => (
            <div
              key={idx}
              ref={(el) => (projectRefs.current[idx] = el)}
              className={`transition-all duration-500
                ${activeIndex === idx
                  ? "sticky top-20 mb-40 text-white"
                  : "text-gray-400/70"} `}
            >
              <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
              <p className="text-sm italic mb-4">{p.desc}</p>
              <ul className="list-disc list-inside space-y-2 text-base">
                <li>Key feature</li>
                <li>Highlight</li>
                <li>Challenge solved</li>
                <li>Impact</li>
                <li>Future improvement</li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
