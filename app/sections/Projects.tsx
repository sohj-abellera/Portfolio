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
      className={`relative z-10 w-full h-auto mt-16
                 bg-blue-950/15 backdrop-blur-[30px] 
                 border-t border-b border-white/20
                 transition-all duration-500
                 ${isSticky ? "px-[80px]" : "px-[120px]"}`}
    >
      <h2 className="text-3xl font-bold text-center text-white mt-20 mb-30">
        Projects
      </h2>

      {/* Flex row: image on left, content on right */}
      <div className="flex items-start h-[300vh] gap-10 mt-10">
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

        {/* TEXT CONTENTS */}
        <div className="flex-1 text-white space-y-16">
          <h3 className="text-6xl font-extrabold mb-10">Let's dive in</h3>
          {/* Project 1 */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Project One</h3>
            <p className="text-sm italic text-gray-400 mb-4">
              A short description line that gives some context about this project.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Key feature number one</li>
              <li>Highlight of technology used</li>
              <li>Challenge solved by the project</li>
              <li>Impact or benefit it provides</li>
              <li>Future improvement or next step</li>
            </ul>
          </div>

          {/* Project 2 */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Project Two</h3>
            <p className="text-sm italic text-gray-400 mb-4">
              Another short description for project two.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Main functionality</li>
              <li>Libraries or frameworks used</li>
              <li>Unique technical challenge</li>
              <li>Performance improvements</li>
              <li>Planned updates</li>
            </ul>
          </div>

          {/* Project 3 */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Project Three</h3>
            <p className="text-sm italic text-gray-400 mb-4">
              Small italic subtext for project three.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Feature A</li>
              <li>Feature B</li>
              <li>Feature C</li>
              <li>Feature D</li>
              <li>Feature E</li>
            </ul>
          </div>

          {/* Project 4 */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Project Four</h3>
            <p className="text-sm italic text-gray-400 mb-4">
              Description for project four goes here.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Point one</li>
              <li>Point two</li>
              <li>Point three</li>
              <li>Point four</li>
              <li>Point five</li>
            </ul>
          </div>

          {/* Project 5 */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Project Five</h3>
            <p className="text-sm italic text-gray-400 mb-4">
              Another descriptive line for project five.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Highlight #1</li>
              <li>Highlight #2</li>
              <li>Highlight #3</li>
              <li>Highlight #4</li>
              <li>Highlight #5</li>
            </ul>
          </div>

          {/* Project 6 */}
          <div>
            <h3 className="text-2xl font-bold mb-2">Project Six</h3>
            <p className="text-sm italic text-gray-400 mb-4">
              Final example for project six.
            </p>
            <ul className="list-disc list-inside space-y-2 text-base">
              <li>Cool aspect</li>
              <li>Integration details</li>
              <li>Problem solved</li>
              <li>User feedback</li>
              <li>Next iteration</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
