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
                  title: "Freshmen Projects – Where It All Began",
                  descriptionStanzas: [
                    "When our class was first tasked to create a website, I unexpectedly became the “developer” of our group — despite having no prior experience. With only YouTube tutorials and curiosity as my guide, I learned how to structure HTML, style layouts with CSS, and make elements work together through trial and error.",
                    "These early experiments taught me how to think like a builder — to explore, adapt, and turn scattered snippets of code into something functional. It wasn’t perfect, but it sparked my genuine interest in web development and gave me the confidence to keep learning."
                  ],
                  takeaways: [
                    "Gained hands-on experience writing basic HTML and CSS layouts.",
                    "Developed problem-solving habits through self-learning and experimentation.",
                    "Learned to search, test, and adapt online code resources effectively.",
                    "Discovered an early passion for building and designing user interfaces."
                  ],
                  tech: ["HTML", "CSS"],
                  containerConfig: {
                    bgImage: "career-timeline-stuff/bg-tech.jpg",
                    bgColor: "#1e1e1e",
                    slides: [
                      {
                        title: "Personal Info Website — My First Basic HTML Project.",
                        video: "career-timeline-stuff/first-projects/personal-info.mp4",
                        overlayImage: "career-timeline-stuff/first-projects/personal-info.png",
                      },
                      {
                        title: "Animated Christmas Forms — Early UI Experiment.",
                        video: "career-timeline-stuff/first-projects/christmas-forms.mp4",
                        overlayImage: "career-timeline-stuff/first-projects/christmas-forms.PNG",
                      },
                      {
                        title: "Interests Page — Discovering CSS Animations",
                        video: "career-timeline-stuff/first-projects/interests-frameset.mp4",
                        overlayImage: "career-timeline-stuff/first-projects/interests-frameset.png",
                      },
                    ],
                  },
                },

                // --- 2 ---
                {
                  year: "Jun 2023 – Jul 2023",
                  title: "Market Square – Learning UI Design from Scratch",
                  descriptionStanzas: [
                    "For our Human-Computer Interaction subject, I led our group in building Market Square — a marketplace-themed website focused on usability and layout design. We started with a basic Bootstrap template, but halfway through I decided to rebuild everything from scratch to better understand spacing, color balance, and visual hierarchy.",
                    "Inspired by Shopee and Carousell, I designed a fresh, market-style interface that matched our concept while keeping it simple and responsive. This project marked the first time I applied design principles intentionally instead of relying purely on tutorials, and it helped me appreciate how much visual clarity improves user experience."
                  ],
                  takeaways: [
                    "Practiced turning layout concepts from HCI theory into real website structure.",
                    "Learned responsive web design fundamentals through experimentation with Bootstrap and pure CSS.",
                    "Discovered how consistent color and spacing create intuitive user interfaces.",
                    "Strengthened my ability to rebuild from scratch and design with intent rather than imitation."
                  ],

                  github: "https://github.com/sohj-abellera/market-square",
                  tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
                  containerConfig: {
                    bgColor: "#2C230B",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first project that looked the way I imagined it would",
                        video: "career-timeline-stuff/market-square.mp4",
                        overlayImage: "career-timeline-stuff/market-square.PNG",
                      },
                    ],
                  },
                },

                // --- 3 ---
                {
                  year: "Nov 2023 – Dec 2023",
                  title: "GameSpace – My First Step into Backend Development",
                  descriptionStanzas: [
                    "For our Web Development III course, our group built GameSpace, a small e-commerce prototype that introduced me to PHP and MySQL. My main task was to handle the design and basic backend setup — implementing user authentication and simple session handling.",
                    "While most of my time went into styling the space-themed interface, I learned how databases connect to web pages and how form handling actually works behind the scenes. It was also one of my first times using AI tools to help debug code, which taught me how to read, test, and fix functions on my own.",
                    "Even though the system was simple, GameSpace helped me bridge the gap between design and functionality — understanding that good-looking pages still need solid logic underneath."
                  ],
                  takeaways: [
                    "Gained foundational experience in connecting PHP and MySQL for authentication and data handling.",
                    "Practiced structuring dynamic pages and working with form submissions.",
                    "Strengthened debugging skills through guided problem-solving using AI assistance.",
                    "Realized the importance of balancing design focus with backend functionality in full-stack development."
                  ],

                  github: "https://github.com/sohj-abellera/game-space",
                  tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgColor: "#1a1c24",
                    bgImage: "career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first smol PHP project — where I barely used PHP.",
                        video: "career-timeline-stuff/game-space.mp4",
                        overlayImage: "career-timeline-stuff/game-space.PNG",
                      },
                    ],
                  },
                },

                // --- 4 ---
                {
                  year: "May 2024 – Jun 2024",
                  title: "ClassFunds – My First Mobile App Project",
                  descriptionStanzas: [
                    "ClassFunds was my first dive into mobile app development using Android Studio.",
                    "The concept came from a common classroom problem — tracking contributions and shared funds for activities. I designed a digital wallet app inspired by GCash that allowed users to record donations, expenses, and savings progress.",
                    "Most of my time went into creating clean layouts and a cohesive color theme using Canva for the interface assets. Even though I relied on guided learning and AI assistance for Java and Firebase integration, I gained a solid understanding of how authentication, data storage, and user flow work in mobile apps.",
                    "This project helped me appreciate the balance between design and functionality — and gave me the confidence to explore more advanced app logic afterward."
                  ],
                  takeaways: [
                    "Learned the basics of Android Studio, Java, and Firebase integration for authentication and data handling.",
                    "Strengthened UI/UX design skills by creating layouts, icons, and branding assets.",
                    "Discovered how real-world apps manage dynamic data and synchronization.",
                    "Learned to iterate quickly by combining AI-assisted coding with hands-on debugging.",
                    "Developed a deeper understanding of how design decisions affect usability in mobile environments."
                  ],


                  github: "https://github.com/sohj-abellera/class-funds",
                  tech: ["Java", "Firebase", "Android Studio"],
                  containerConfig: {
                    bgColor: "#5A3B1C",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first and last Android app — Java is really hard.",
                        video: "career-timeline-stuff/class-funds.mp4",
                        overlayImage: "career-timeline-stuff/class-funds-4.PNG",
                        customId: "for-class-funds",
                      },
                    ],
                  },
                },

                // --- 5 ---
                {
                  year: "Oct 2024 – Jan 2025",
                  title: "Inventory Management System – System Architecture Thesis Project",
                  descriptionStanzas: [
                    "This project served as our thesis for the System Architecture course and was developed for Best Aluminum Sales Corps., a real business branch that needed help minimizing inventory discrepancies. Their existing process relied on manual paper records, so our goal was to design a centralized web system to track sales, inventory, and deliveries across departments.",
                    "As project lead, I handled the overall system planning, user interface design, and database structure. I developed the core backend logic in PHP and MySQL, ensuring each role — from admin to delivery manager — had proper access and tracking features.",
                    "While we faced challenges balancing design and deadlines, the experience taught me how to plan scope, structure data flow, and coordinate development efforts in a team setting. More importantly, it gave me a real understanding of how digital systems solve real business pain points."
                  ],
                  takeaways: [
                    "Led the planning and development of a multi-role inventory and sales tracking system for a real company.",
                    "Designed and implemented database schemas and role-based access logic using PHP and MySQL.",
                    "Strengthened understanding of backend workflows, data validation, and user access control.",
                    "Improved teamwork, task coordination, and scope management in an Agile-style setup.",
                    "Learned to balance usability, design, and backend efficiency under tight academic timelines."
                  ],

                  github: "https://github.com/sohj-abellera/sysarch",
                  tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgColor: "#0C1B22",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "My first real project — I think I could've done better",
                        video: "career-timeline-stuff/sysarch.mp4",
                        overlayImage: "career-timeline-stuff/sysarch.PNG",
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
                    "During planning, I helped define the system layout, user roles, and overall feature flow. Although I wasn’t the main developer this time, I played a key part in debugging — fixing PHP and MySQL logic errors, correcting database inconsistencies, and resolving front-end display issues.",
                    "Working in a supporting role taught me the value of collaboration and focus. Managing two projects at once was difficult, but it helped me understand how every contribution, no matter how small, impacts a system’s stability and success."
                  ],
                  takeaways: [
                    "Contributed to planning and defining key system features and user roles.",
                    "Debugged PHP and MySQL components, resolving logic, database, and interface errors.",
                    "Strengthened problem-solving and testing skills through hands-on issue tracking.",
                    "Learned how to collaborate effectively in a multi-developer setup.",
                    "Gained experience balancing priorities and maintaining code quality under pressure.",
                  ],

                  tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
                  containerConfig: {
                    bgColor: "#0E1A13",
                    bgImage: "/career-timeline-stuff/bg-ui.jpg",
                    slides: [
                      {
                        title: "Our capstone project — not the lead this time, just the debugger fixing errors.",
                        video: "career-timeline-stuff/sysarch.mp4",
                        overlayImage: "career-timeline-stuff/capstone.PNG",
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
                    "During my internship at Transfer IT, I supported daily technical operations across multiple departments — from reformatting computers and installing OS/software to troubleshooting network and hardware issues.",
                    "I worked closely with the IT Department and the Office of the President to manage asset tracking, update system records, and provide remote technical support for branch offices. Later, I was transferred to the Creative Department to assist in testing an AI-powered workflow automation tool aimed at streamlining design tasks.",
                    "This experience gave me real-world exposure to IT processes, system management, and workplace communication — helping me build the discipline and adaptability needed for professional development roles."
                  ],

                  takeaways: [
                    "Assisted with hardware maintenance, OS setup, and software deployment across multiple branches.",
                    "Provided front-line technical support, troubleshooting hardware and software issues under supervision.",
                    "Collaborated with executives and IT staff for asset tracking and portal data updates.",
                    "Tested AI-driven workflow tools, preparing reports and slide presentations for executive review.",
                    "Strengthened adaptability, communication, and documentation skills in a professional setting.",
                  ],

                  containerConfig: {
                    bgColor: "black",
                    bgImage: "career-timeline-stuff/bg-work.jpg",
                    slides: [
                      {
                        overlayImage: "career-timeline-stuff/tit-logo.png",
                        customId: "internship-logo-bounce",
                      },
                    ],
                  },
                },

                // --- 8 ---
                {
                  year: "Sep 2025 – Present",
                  title: "Learning by Rebuilding – Strengthening My Foundation",
                  descriptionStanzas: [
                    "After graduation, I wanted to understand why my projects worked — not just how I got them to run. So I began revisiting my older systems, this time rebuilding everything from the ground up using pure HTML, CSS, and JavaScript. No AI shortcuts. No frameworks. Just fundamentals.",
                    "Starting with my old Inventory Management System, I focused on building cleaner code, better structure, and more responsive layouts. It felt like rediscovering web development through a new lens — applying everything I’ve learned and unlearning my old habits.",
                    "At the same time, I began creating this very portfolio using React and Tailwind CSS, integrating animation and component logic while experimenting with design and storytelling. I used AI as a creative assistant — not as a crutch — helping me refine structure and improve my understanding of front-end architecture.",
                    "This phase became more than just “relearning.” It’s been about maturity — writing code with intention, designing with empathy, and building a personal workflow that feels truly my own.",
                  ],

                  takeaways: [
                    "Strengthened my core understanding of HTML, CSS, and JavaScript through rebuilding past projects.",
                    "Learned to approach front-end development with structured logic and scalable design principles.",
                    "Developed a deeper appreciation for responsive design, accessibility, and user-centered layouts.",
                    "Improved my ability to plan, design, and execute projects independently — from concept to deployment.",
                    "Practiced balancing creativity and technical discipline by using AI tools for insight, not dependency.",
                  ],

                  subProjects: [
                      {
                        label: "",
                        tech: ["HTML", "CSS", "JavaScript"],
                        github: "https://github.com/sohj-abellera/basc-portal"
                      },
                      {
                        label: "+",
                        tech: ["React", "Tailwind"],
                        github: "https://github.com/sohj-abellera/porfolio"
                      },
                    ],

                  containerConfig: {
                    bgImage: "/career-timeline-stuff/bg-tech.jpg",
                    bgColor: "#12151c",
                    slides: [
                      {
                        title: "Rebuilding one of my thesis projects — applying best coding practices.",
                        video: "career-timeline-stuff/sysarch.mp4",
                        overlayImage: "career-timeline-stuff/basc.PNG",
                        customId: "for-capstone-thesis",
                      },
                      {
                        title: "My new portfolio, built while experimenting with React and Tailwind.",
                        video: "career-timeline-stuff/sysarch.mp4",
                        overlayImage: "career-timeline-stuff/portfolio.PNG",
                        customId: "for-capstone-thesis",
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
