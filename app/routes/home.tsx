import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Starfield from "../components/Starfield/Starfield"
import Welcome from "../screens/Welcome"
import Introduction from "../screens/Introduction"
import CareerTimeline from "../screens/CareerTimeline"
import Skills from "../screens/Skills"
import Footer from "../screens/Footer"

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
            exit={{ y: "-100vh" }}
            transition={{
              duration: 1.2,
              ease: [0.21, 0.58, 0.54, 0.98],
            }}
            className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full"
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
        <main className="relative z-10 flex flex-col items-center w-full">
          <section id="intro" className="md:min-h-[650px] sm:min-h-[650px]
                                         w-full xl:max-w-6xl lg:max-w-[975px] md:max-w-[730px] sm:max-w-xl max-w-[370px] 
                                         mx-auto">
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
          <section id="timeline" className="w-full mt-16 md:mt-10 sm:mt-16">
            <CareerTimeline
              sections={[
                // --- 1 ---
                {
                  year: "Nov 2021 – Feb 2022",
                  title: "Freshmen Projects",
                  descriptionStanzas: [
                    "Forced to become the “developer” of our first group project because no one else wanted to do it. I had zero idea what I was doing — just me, YouTube tutorials, and a lot of trial and error. Somehow, things worked, and I actually found myself enjoying the process.",
                    "These early projects taught me how to explore, adapt, and experiment. I learned how to search for answers, combine snippets of code into something that felt mine, and discovered how satisfying it is to bring an idea to life, even if it looked terrible back then."
                  ],
                  takeaways: [
                    "Learned the basics of HTML and CSS by following YouTube tutorials and mixing snippets into my own code.",
                    "Discovered how much I enjoy building and designing, even without formal guidance.",
                    "Realized that trial and error is one of the best ways to truly learn how things work.",
                    "Gained confidence in exploring and experimenting instead of waiting to be taught."
                  ],

                  github: "https://github.com/sohj-abellera/freshmen-projects",
                  tech: ["HTML", "CSS"],
                  containerConfig: {
                    bgImage: "/career-timeline-stuff/bg-tech.jpg",
                    bgColor: "#1e1e1e",
                    slides: [
                      {
                        title: "Personal Info Website — My First HTML Project.",
                        video: "/career-timeline-stuff/first-projects/personal-info.mp4",
                        overlayImage: "/career-timeline-stuff/first-projects/personal-info.png",
                      },
                      {
                        title: "Animated Christmas Forms — Early UI Experiment.",
                        video: "/career-timeline-stuff/first-projects/christmas-forms.mp4",
                        overlayImage: "/career-timeline-stuff/first-projects/christmas-forms.PNG",
                      },
                      {
                        title: "Interests Page — Discovering CSS Animations",
                        video: "/career-timeline-stuff/first-projects/interests-frameset.mp4",
                        overlayImage: "/career-timeline-stuff/first-projects/interests-frameset.png",
                      },
                    ],
                  },
                },

                // --- 2 ---
                {
                  year: "Jun 2023 – Jul 2023",
                  title: "Market Square: Learning Design for Real",
                  descriptionStanzas: [
                    "I volunteered to lead our group again for our Human-Computer Interaction subject, where we learned about layouts, colors, and usability. We already had the idea for “Market Square,” but not much of a visual plan yet.",
                    "At first, my plan was to follow a YouTuber’s tutorial using Bootstrap — but it didn’t really click with me. I wanted something that felt more mine, so halfway through, I restarted and built everything from scratch. That’s when I started exploring design inspirations and ended up combining elements from Shopee and Carousell — giving it a fresh color theme that matched our “market” vibe."
                  ],
                  takeaways: [
                    "Started to understand HTML and CSS fundamentals beyond just copying tutorials.",
                    "Learned how to apply design principles like layout, spacing, and color balance.",
                    "Discovered that rebuilding from scratch helps me truly understand how things work.",
                    "Developed an eye for UI design and realized how much presentation affects usability."
                  ],

                  github: "https://github.com/sohj-abellera/market-square",
                  tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
                  containerConfig: {
                    bgColor: "#2C230B",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first project that actually looked how I pictured it.",
                        video: "/career-timeline-stuff/market-square.mp4",
                        overlayImage: "/career-timeline-stuff/market-square.PNG",
                      },
                    ],
                  },
                },

                // --- 3 ---
                {
                  year: "Nov 2023 – Dec 2023",
                  title: "GameSpace: Introduction to PHP",
                  descriptionStanzas: [
                    "For our Web Development III subject, our group project focused on learning the basics of PHP — connecting pages to a database, handling authentication, and building simple backend features.",
                    "While the goal was mainly to understand PHP and MySQL, I couldn’t help but give it a visual touch. I designed the interface to still feel cohesive and modern, giving it a “space market” theme that made it more fun to build and present.",
                    "I think this was also around the time ChatGPT started becoming popular, so I tried using it to help me code… which explains why most of the functions don’t really work :("
                  ],
                  takeaways: [
                    "Learned the basics of PHP and MySQL — connecting pages, handling forms, and setting up simple authentication.",
                    "Got my first glimpse of how frontend and backend communicate through databases.",
                    "Discovered how helpful (and sometimes confusing) AI tools like ChatGPT can be in learning to code.",
                    "Realized that functionality matters just as much as design — and that debugging is a skill on its own."
                  ],

                  github: "https://github.com/sohj-abellera/gamespace",
                  tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgColor: "#1a1c24",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first smol PHP project — where I barely used PHP",
                        video: "/career-timeline-stuff/game-space.mp4",
                        overlayImage: "/career-timeline-stuff/game-space.PNG",
                      },
                    ],
                  },
                },

                // --- 4 ---
                {
                  year: "May 2024 – Jun 2024",
                  title: "ClassFunds — Android App Development Project",
                  descriptionStanzas: [
                    "Built as a requirement for our Mobile Application Development subject, this was my first dive into Android Studio — and my first real app. I didn’t really understand Java at the time, but I relied on my basic programming instincts and approached every challenge one step at a time, with ChatGPT helping me figure out what to do next.",
                    "I spent more time on design than functionality, obsessing over how everything looked and felt, even if it meant cutting a few planned features. Still, I managed to make it work — complete with authentication, database logic, and money tracking. It was my introduction to Firebase and how real apps handle data securely.",
                    "Looking back, it wasn’t perfect — messy code, rushed structure, lots of guesswork — but it taught me how to think through real-world app problems, design with intent, and balance creativity with logic."
                  ],
                  takeaways: [
                    "Learned the basics of Android Studio, Java, and Firebase integration.",
                    "Discovered how mobile apps handle data, authentication, and user flow.",
                    "Realized that design can be just as demanding as coding.",
                    "Understood the value of planning before building — not every feature makes it to production.",
                    "Learned to balance creativity with practicality when developing real apps."
                  ],


                  github: "https://github.com/sohj-abellera/classfunds",
                  tech: ["Java", "Firebase", "Android Studio"],
                  containerConfig: {
                    bgColor: "#5A3B1C",
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

                // --- 5 ---
                {
                  year: "Oct 2024 – Jan 2025",
                  title: "Inventory Management System — System Architecture Thesis",
                  descriptionStanzas: [
                    "My first real large-scale project with an actual company as our beneficiary. They needed a better way to track their sales, inventory, and deliveries — everything was done manually on paper. Our proposed system aimed to centralize it all, giving each user role its own interface and functions to reduce errors and make data management faster.",
                    "We spent the first semester on planning and documentation, and the second on development using Agile. As one of the main developers, I quickly realized how hard it was to balance design and functionality. I kept redesigning the interfaces mid-development, unsure what should stay or go, which cost me time and focus.",
                    "The final system ended up about 70% complete — functional, but far from what I envisioned. Still, it taught me valuable lessons about project planning, version control, and how important it is to define design and scope before touching a single line of code."
                  ],
                  takeaways: [
                    "Gained deeper experience in backend development — handling databases, user roles, and logic beyond just the UI.",
                    "Experienced what it’s like to build a real system for an actual client with real requirements and expectations.",
                    "Learned how challenging it is to balance design, functionality, and deadlines in a team setting.",
                    "Realized the importance of sticking to a clear plan instead of redesigning mid-development.",
                    "Finally understood why defining scope early and using version control properly saves everyone’s sanity."
                  ],

                  github: "https://github.com/sohj-abellera/inventory-system",
                  tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgColor: "#0C1B22",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first real project — and the one I’d rebuild if I could.",
                        video: "/career-timeline-stuff/sysarch.mp4",
                        overlayImage: "/career-timeline-stuff/sysarch.PNG",
                      },
                    ],
                  },
                },

                // --- 6 ---
                {
                  year: "Sep 2024 – Dec 2024",
                  title: "Freshmen Screening System — Capstone Thesis",
                  descriptionStanzas: [
                    "I wasn’t really involved much during production or design — I mostly helped during the planning phase, defining the features and flow of the system. Still, I ended up contributing a lot in debugging — fixing missing database columns, patching small logic errors, and cleaning up front-end inconsistencies.",
                    "Even though I wasn’t the main developer this time, it taught me how important collaboration really is. We tried to split focus between two thesis projects at once, but I learned that sometimes, working together on one thing at a time is how you actually get the best results."
                  ],
                  takeaways: [
                    "Learned how to collaborate effectively and contribute even without leading the development.",
                    "Discovered the value of focusing on one project at a time instead of spreading efforts too thin.",
                    "Improved debugging skills — fixing database issues, logic errors, and front-end inconsistencies.",
                    "Realized that teamwork and communication matter just as much as technical skill.",
                  ],

                  tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgColor: "#0E1A13",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "Our capstone project — not the lead this time, just the debugger fixing what slipped through.",
                        video: "/career-timeline-stuff/sysarch.mp4",
                        overlayImage: "/career-timeline-stuff/capstone-thesis.png",
                        customId: "for-capstone-thesis",
                      },
                    ],
                  },
                },

                // --- 7 ---
                {
                  year: "March 2025 – May 2025",
                  title: "Internship — Real Work, Real Pace",
                  descriptionStanzas: [
                    "My internship at Transfer IT exposed me to real-world IT operations — from maintaining CCTV systems and assisting with PC setups to supporting daily technical tasks across multiple departments.",
                    "I learned how companies manage standard software deployments, handle IT tickets, and maintain system security at scale.",
                    "I also contributed to the Creative Department’s AI automation project, testing tools and presenting findings to management — which gave me a glimpse of how innovation happens inside a company.",
                    "Overall, it taught me how to communicate, adapt, and solve problems in a fast-paced work environment."
                  ],

                  takeaways: [
                    "Gained hands-on experience in hardware maintenance, software installation, and IT support operations.",
                    "Learned how to coordinate with different departments and handle real technical requests from end-users.",
                    "Improved troubleshooting and diagnostic skills through on-site and remote issue handling.",
                    "Explored how AI tools can be used to automate creative workflows and increase productivity.",
                    "Realized the importance of adaptability, communication, and teamwork in fast-paced environments.",
                  ],

                  containerConfig: {
                    bgColor: "black",
                    bgImage: "/career-timeline-stuff/bg-work.jpg",
                    slides: [
                      {
                        overlayImage: "/career-timeline-stuff/tit-logo.png",
                        customId: "internship-logo-bounce",
                      },
                    ],
                  },
                },

                // --- 8 ---
                {
                  year: "Sep 2025 – Present",
                  title: "Learning by Rebuilding",
                  descriptionStanzas: [
                    "After graduation, I decided to revisit what I’d built before — but this time, with real understanding.",
                    "I started properly learning through FreeCodeCamp while rebuilding my old Inventory System from scratch using only HTML, CSS, and JavaScript — no AI, no frameworks — just me applying what I’ve learned so far.",
                    "I haven’t gone far yet — still polishing the login page and making it responsive — but it’s been helping me understand structure, layout, and flow much better than before.",
                    "At the same time, I began building this portfolio with React, combining what I already know with what I’m still learning — using AI not as a crutch, but as a creative partner.",
                    "This phase is all about rediscovery — learning fundamentals again, exploring better structure, and designing with purpose.",
                  ],

                  takeaways: [
                    "Started rebuilding my old projects from scratch to strengthen my fundamentals.",
                    "Focused on writing cleaner HTML, CSS, and JavaScript — no shortcuts, no frameworks.",
                    "Learned the importance of responsive design and layout structure through trial and error.",
                    "Discovered how revisiting old work with new knowledge changes how I approach problems.",
                    "Realized that learning never really ends — it just evolves with every project.",
                  ],

                  subProjects: [
                      {
                        label: "",
                        tech: ["HTML", "CSS", "JavaScript"],
                        github: "https://github.com/yourrepo/system-rebuild"
                      },
                      {
                        label: "+",
                        tech: ["React", "Tailwind", "Framer Motion"],
                        github: "https://github.com/yourrepo/portfolio"
                      },
                    ],

                  containerConfig: {
                    bgImage: "/career-timeline-stuff/bg-tech.jpg",
                    bgColor: "black",
                    slides: [
                      {
                        title: "My new portfolio using react, tailwind, and little bit of help hihi",
                        video: "/career-timeline-stuff/first-projects/personal-info.mp4",
                        overlayImage: "/career-timeline-stuff/first-projects/personal-info.png",
                      },
                      {
                        title: "Rebuilding one of my thesis projects into how I'd imagined it",
                        video: "/career-timeline-stuff/first-projects/christmas-forms.mp4",
                        overlayImage: "/career-timeline-stuff/first-projects/christmas-forms.PNG",
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

          {/* Footer */}
          <footer className="w-full">
            <Footer />
          </footer>
        </main>
      )}
    </div>
  )
}
