import { useEffect, useRef, useState } from "react";

export default function Projects() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 80);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      id="projects"
      className={`relative z-10 w-full h-[300vh] mt-16
                 bg-blue-950/15 backdrop-blur-[30px] 
                 border-t border-b border-white/20
                 transition-all duration-500
                 ${isSticky ? "px-[80px]" : "px-[120px]"}`}
    >
      <h2 className="text-3xl font-bold text-center text-white mt-20 mb-30">
        Projects
      </h2>

      <div
        ref={imageRef}
        className={`rounded-[10px] overflow-hidden 
                    border border-white/20 sticky top-20 ml-6
                    transition-all duration-500 ease-in-out
                    ${isSticky ? "w-[690px] h-[340px]" : "w-[528px] h-[272px]"}`}
      >
        <img
          src="/sample website.PNG"
          alt="Project preview"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
