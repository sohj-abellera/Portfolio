import { useEffect, useRef, useState } from "react";

type Project = {
  title: string;
  desc: string;
  bullets: string[];
  imgs: string[];
};

export default function Projects({ projects }: { projects: Project[] }) {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [blink, setBlink] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        const stickyNow = rect.top <= 80;

        if (stickyNow !== isSticky) {
          setBlink(true);
          setTimeout(() => setBlink(false), 200);
        }

        setIsSticky(stickyNow);
      }

      let current = 0;
      projectRefs.current.forEach((ref, idx) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = idx;
          }
        }
      });
      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  const currentProject = projects[activeIndex];

  // --- DRAG SWIPE ---
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    setIsDragging(true);
  };

  // 🔥 Global listeners for drag outside container
  useEffect(() => {
  const handleGlobalMouseMove = (e: MouseEvent) => {
    if (!isDragging || startX.current === null) return;

    const diff = e.clientX - startX.current;

    // container width (safe fallback 1px to avoid div/0)
    const containerWidth =
      imageRef.current?.offsetWidth ?? 1;
    const maxDrag = containerWidth * 0.2; // 20%

    // if at first image and dragging right -> clamp
    if (activeImageIndex === 0 && diff > 0) {
      setDragOffset(Math.min(diff, maxDrag));
    }
    // if at last image and dragging left -> clamp
    else if (
      activeImageIndex === currentProject.imgs.length - 1 &&
      diff < 0
    ) {
      setDragOffset(Math.max(diff, -maxDrag));
    }
    // normal behavior
    else {
      setDragOffset(diff);
    }
  };

  const handleGlobalMouseUp = () => {
    if (!isDragging) return;
    const threshold = 100;

    if (dragOffset < -threshold && activeImageIndex < currentProject.imgs.length - 1) {
      setActiveImageIndex((prev) => prev + 1);
    } else if (dragOffset > threshold && activeImageIndex > 0) {
      setActiveImageIndex((prev) => prev - 1);
    }

    setIsDragging(false);
    setDragOffset(0);
    startX.current = null;
  };

  window.addEventListener("mousemove", handleGlobalMouseMove);
  window.addEventListener("mouseup", handleGlobalMouseUp);

  return () => {
    window.removeEventListener("mousemove", handleGlobalMouseMove);
    window.removeEventListener("mouseup", handleGlobalMouseUp);
  };
  }, [isDragging, dragOffset, activeImageIndex, currentProject.imgs.length]);


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

      <div
        className="flex items-start gap-10 mt-10"
        style={{ height: `${projects.length * 120}vh` }}
      >
        {/* IMAGE CAROUSEL */}
        <div
          ref={imageRef}
          className={`rounded-[5px] overflow-hidden mr-[30px] sticky top-20
                      transition-all duration-500 ease-in-out
                      ${isDragging ? "cursor-grabbing" : "cursor-grab"}
                      ${isSticky ? "w-[700px] h-[340px]" : "w-[528px] h-[260px]"}`}
          onMouseDown={handleMouseDown}
        >
          {/* Image track */}
          <div
            className={`flex h-full w-full
              ${isDragging ? "" : "transition-transform duration-700 ease-out"}`}
            style={{
              transform: `translateX(calc(${-activeImageIndex * 100}% + ${dragOffset}px))`,
            }}
          >
            {currentProject.imgs.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={currentProject.title}
                className="w-full h-full object-cover flex-shrink-0 select-none"
                draggable={false}
              />
            ))}
          </div>


          {/* INDICATORS */}
          <div className="flex justify-center gap-4 mt-3">
            {currentProject.imgs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === activeImageIndex
                    ? "w-6 bg-white"
                    : "bg-gray-400/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div
          className={`flex-1 text-white space-y-20 transition-opacity duration-100 ${
            blink ? "opacity-0" : "opacity-100"
          }`}
        >
          <h3 className="text-6xl font-extrabold mb-14">Let's dive in</h3>

          {projects.map((p, idx) => (
            <div
              key={idx}
              ref={(el) => {
                projectRefs.current[idx] = el;
              }}
              className={activeIndex === idx ? "text-white" : "text-gray-400/70"}
            >
              <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
              <p className="text-sm italic mb-4">{p.desc}</p>

              {/* FLEX BULLETS */}
              <div className="space-y-2 text-base">
                {p.bullets.map((b, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-4 flex-shrink-0">
                      <span className="block w-2 h-2 mt-2 rounded-full bg-white" />
                    </div>
                    <div className="flex-1">{b}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
