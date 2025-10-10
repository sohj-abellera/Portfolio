import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Starfield from "../components/Starfield/Starfield"
import Welcome from "../screens/Welcome"
import Introduction from "../screens/Introduction"
import CareerTimeline from "../screens/CareerTimeline"
import Skills from "../screens/Skills"

export default function Home() {
  const [phase, setPhase] = useState<"intro" | "transition" | "main">("intro")

  return (
    <div
      className={`w-screen min-h-screen text-white flex items-center relative ${
        phase === "intro" ? "overflow-hidden" : "overflow-visible"
      }`}
    >
      {/* Stars */}
      <Starfield mode={phase === "transition" ? "vertical" : "normal"} />

      {/* Welcome screen */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.div
            key="welcome"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: 0.8,
              ease: [0.21, 0.58, 0.54, 0.98],
            }}
            className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10"
          >
            <Welcome
              text="Welcome to My Portfolio Website.😊"
              speed={40}
              onDone={() => {
                setPhase("transition")
                setTimeout(() => setPhase("main"), 800)
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      {(phase === "transition" || phase === "main") && (
        <main className="relative w-full flex flex-col z-10 items-center">
          <section id="intro" className="min-h-screen w-full max-w-6xl mx-auto">
            <Introduction
              timings={[
                { duration: 0.8, delay: 0.0, ease: [0.21, 0.58, 0.54, 0.98] },
                { duration: 0.8, delay: 0.0, ease: [0.21, 0.58, 0.78, 0.95] },
                { duration: 0.8, delay: 0.03, ease: [0.21, 0.58, 0.78, 0.95] },
                { duration: 0.8, delay: 0.07, ease: [0.21, 0.58, 0.78, 0.95] },
                { duration: 0.8, delay: 0.11, ease: [0.21, 0.58, 0.78, 0.95] },
                { duration: 0.8, delay: 0.15, ease: [0.21, 0.58, 0.78, 0.95] },
              ]}
            />
          </section>

          {/* Timeline section */}
          <section id="timeline" className="w-full mt-10">
            <CareerTimeline
              sections={[
                {
                  year: "Nov 2021 – Feb 2022",
                  title: "Freshmen Projects",
                  description: `Forced to become the “developer” of our first group project because no one else wanted to do it. I had zero idea what I was doing — just me, YouTube tutorials, and a lot of trial and error. Somehow, things worked, and I actually found myself enjoying the process.

                                These early projects taught me how to explore, adapt, and experiment. I learned how to search for answers, combine snippets of code into something that felt mine, and discovered how satisfying it is to bring an idea to life, even if it looked terrible back then.
                                `,
                  tech: ["HTML", "CSS"],
                  containerConfig: {
                    bgImage: "/career-timeline-stuff/bg-tech.jpg",
                    bgColor: "#0f242d",
                    slides: [
                      {
                        title: "My very first website — awkward but kinda special.",
                        video: "/career-timeline-stuff/first-projects/personal-info.mp4",
                        overlayImage:
                          "/career-timeline-stuff/first-projects/personal-info.png",
                      },
                      {
                        title: "Christmas-themed forms with some Christmas-related animations",
                        video: "/career-timeline-stuff/first-projects/christmas-forms.mp4",
                        overlayImage:
                          "/career-timeline-stuff/first-projects/christmas-forms.PNG",
                      },
                      {
                        title: "The one where I discovered anything can be animated in CSS",
                        video: "/career-timeline-stuff/first-projects/interests-frameset.mp4",
                        overlayImage:
                          "/career-timeline-stuff/first-projects/interests-frameset.png",
                      },
                    ],
                  },
                },

                {
                  year: "Jun 2023 – Jul 2023",
                  title: "Market Square: Learning Design for Real",
                  description: `I volunteered to lead our group again for our Human-Computer Interaction subject, where we learned about layouts, colors, and usability. We already had the idea for “Market Square,” but not much of a visual plan yet.

                                At first, my plan was to follow a YouTuber’s tutorial using Bootstrap — but it didn’t really click with me. I wanted something that felt more mine, so halfway through, I restarted and built everything from scratch. That’s when I started exploring design inspirations and ended up combining elements from Shopee and Carousell — giving it a fresh color theme that matched our “market” vibe.
                                `,
                  github: "https://github.com/yourusername/freshmen-projects",
                  tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
                  containerConfig: {
                    bgColor: "#FFC300",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first design that actually looked how I pictured it.",
                        video: "/career-timeline-stuff/market-square.mp4",
                        overlayImage:
                          "/career-timeline-stuff/market-square.PNG",
                      },
                    ],
                  },
                },
                
                {
                  year: "Nov 2023 – Dec 2023",
                  title: "GameSpace: Introduction to PHP",
                  description: `For our Web Development III subject, our group project focused on learning the basics of PHP — connecting pages to a database, handling authentication, and building simple backend features.

                                While the goal was mainly to understand PHP and MySQL, I couldn’t help but give it a visual touch. I designed the interface to still feel cohesive and modern, giving it a “space market” theme that made it more fun to build and present.
                                
                                I think this was also around the time ChatGPT started becoming popular, so I tried using it to help me code… which explains why most of the functions don’t really work :(
                                `,
                  github: "https://github.com/yourusername/freshmen-projects",
                  tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgColor: "#1a1c24",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first smol PHP project — where I barely used PHP",
                        video: "/career-timeline-stuff/game-space.mp4",
                        overlayImage:
                          "/career-timeline-stuff/game-space.PNG",
                      },
                    ],
                  },
                },

                {
                  year: "May 2024 – Jun 2024",
                  title: "ClassFunds — Android App Development Project",
                  description: `Built as a requirement for our Mobile Application Development subject, this was my first dive into Android Studio — and my first real app. I didn’t really understand Java at the time, but I relied on my basic programming instincts and approached every challenge one step at a time, with ChatGPT helping me figure out what to do next.

                  I spent more time on design than functionality, obsessing over how everything looked and felt, even if it meant cutting a few planned features. Still, I managed to make it work — complete with authentication, database logic, and money tracking. It was my introduction to Firebase and how real apps handle data securely.

                  Looking back, it wasn’t perfect — messy code, rushed structure, lots of guesswork — but it taught me how to think through real-world app problems, design with intent, and balance creativity with logic.
                                
                                `,
                  github: "https://github.com/yourusername/freshmen-projects",
                  tech: ["Java", "Firebase", "Android Studio"],
                  containerConfig: {
                    bgColor: "#1a1c24",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first and last Android app I hope. Java is really hard",
                        video: "/career-timeline-stuff/class-funds.mp4",
                        overlayImage: "/career-timeline-stuff/class-funds-4.PNG",
                        customId: "for-class-funds",
                      },
                    ],
                  },
                },

                {
                  year: "Oct 2024 – Jan 2025",
                  title: "Inventory Management System — System Architecture Thesis",
                  description: `My first real large-scale project with an actual company as our beneficiary. They needed a better way to track their sales, inventory, and deliveries — everything was done manually on paper. Our proposed system aimed to centralize it all, giving each user role its own interface and functions to reduce errors and make data management faster.

                                We spent the first semester on planning and documentation, and the second on development using Agile. As one of the main developers, I quickly realized how hard it was to balance design and functionality. I kept redesigning the interfaces mid-development, unsure what should stay or go, which cost me time and focus.
                                
                                The final system ended up about 70% complete — functional, but far from what I envisioned. Still, it taught me valuable lessons about project planning, version control, and how important it is to define design and scope before touching a single line of code.
                                `,
                  github: "https://github.com/yourusername/freshmen-projects",
                  tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgColor: "#1a1c24",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "If I could turn back time, I’d build this one properly",
                        video: "/career-timeline-stuff/sysarch.mp4",
                        overlayImage:
                          "/career-timeline-stuff/sysarch.PNG",
                      },
                    ],
                  },
                },

                {
                  year: "Sep 2024 – Dec 2024",
                  title: "Freshmen Screening System — Capstone Thesis",
                  description: `I wasn’t really involved much during production or design — I mostly helped during the planning phase, defining the features and flow of the system. Still, I ended up contributing a lot in debugging — fixing missing database columns, patching small logic errors, and cleaning up front-end inconsistencies.

                                Even though I wasn’t the main developer this time, it taught me how important collaboration really is. We tried to split focus between two thesis projects at once, but I learned that sometimes, working together on one thing at a time is how you actually get the best results.
                                `,
                  github: "https://github.com/yourusername/freshmen-projects",
                  tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgColor: "#1a1c24",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "Not really my code — but I helped patch things up I guess. text text text text text",
                        video: "/career-timeline-stuff/sysarch.mp4",
                        overlayImage: "/career-timeline-stuff/capstone-thesis.png",
                        customId: "for-capstone-thesis", 
                      },
                    ],
                  },
                },

                {
                  year: "March 2025 – May 2025",
                  title: "Internship — Real Work, Real Pace",
                  description: `My internship at Transfer IT gave me hands-on exposure to real-world IT operations — from assisting with PC setup and troubleshooting across multiple departments to supporting workflow automation initiatives.

                  I explored how companies handle system management, user support, and internal communication, while also getting a glimpse of how technology impacts day-to-day efficiency.

                  The experience strengthened my problem-solving skills and adaptability, shaping how I now approach software design with both users and maintainers in mind.
                  `,
                  tech: ["React", "JavaScript", "GitHub", "Figma"],
                  containerConfig: {
                    bgColor: "#111827",
                    bgImage: "/career-timeline-stuff/bg-work.jpg",
                    slides: [
                      {
                        title: "Internship Logo — DVD Bounce Edition",
                        overlayImage: "/career-timeline-stuff/company-logo.png",
                        customId: "internship-logo-bounce", // 👈 we’ll target this!
                      },
                    ],
                  },
                },

                {
                  year: "Sep 2025 – Present",
                  title: "Learning by Rebuilding",
                  description: `After graduation, I decided to revisit what I’d built before — but this time, with real understanding.

                                I started learning properly through FreeCodeCamp, rebuilding my old Inventory System from scratch using only HTML, CSS, and JavaScript — no AI, no frameworks — just me applying everything I’ve learned.

                                At the same time, I began building this portfolio with React. I wanted to see how far I could go combining what I already know with what I’m still learning, using tools like AI not as a crutch, but as a creative partner.

                                This phase is all about rediscovery — learning fundamentals again, exploring better structure, and designing with purpose.
                                `,
                  github: "https://github.com/yourusername/freshmen-projects",
                  tech: ["React", "Tailwind CSS", "Framer Motion", "Lucide React", "GitHub", "HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgImage: "/career-timeline-stuff/bg-tech.jpg",
                    bgColor: "#0f242d",
                    slides: [
                      {
                        title: "My new portfolio using react, tailwind, and little bit of help hihi",
                        video: "/career-timeline-stuff/first-projects/personal-info.mp4",
                        overlayImage:
                          "/career-timeline-stuff/first-projects/personal-info.png",
                      },
                      {
                        title: "Rebuilding one of my thesis projects into how I'd inmagined it",
                        video: "/career-timeline-stuff/first-projects/christmas-forms.mp4",
                        overlayImage:
                          "/career-timeline-stuff/first-projects/christmas-forms.PNG",
                      },
                      {
                        title: "Learning for real now, no AI, well a little bit",
                        video: "/career-timeline-stuff/first-projects/interests-frameset.mp4",
                        overlayImage:
                          "/career-timeline-stuff/first-projects/interests-frameset.png",
                      },
                    ],
                  },
                },

              ]}
            />
          </section>

          {/* Skills section */}
          <section id="skills" className="w-full mt-10">
            <Skills />
          </section>
        </main>
      )}
    </div>
  )
}
