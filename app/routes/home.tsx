import type { Route } from "./+types/home";
import OnloadScreen from "~/sections/OnLoadScreen";
import Starfield from "~/components/Starfield";
import Introduction from "~/sections/Introduction"; 
import Projects from "~/sections/Projects";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Onload Screen" },
    { name: "description", content: "Full-screen sci-fi onload screen" },
  ];
}

export default function Home() {
  const showOnload = false;

  const projects = [
    {
      title: "EARIST CCS Department Freshman Screening Website",
      desc: "A web-based system built for the CCS Department to streamline the freshman screening process, automating applicant data entry and evaluation",
      bullets: ["Collaborated with teammates on layout design and feature planning to create a structured, user-friendly interface.", 
                "Assisted in debugging PHP code, identifying and fixing syntax and logic errors to improve stability.", 
                "Refactored inefficient code to reduce execution errors and enhance performance.",
                "Participated in system testing, documented issues, and proposed solutions to improve reliability."],
      imgs: ["/5.png", "/5.2.png", "/5.3.png"],
    },
    {
      title: "Best Aluminum Sales Corps. Integrated Systems",
      desc: "An integrated system designed to manage sales logging, inventory tracking, and role-based account access for a medium-scale aluminum business.",
      bullets: ["Planned system features with the team, defining user roles, interfaces, and functionality.", 
                "Designed and developed the front-end with HTML, CSS, and JavaScript for a user-friendly experience.",
                "Built backend features in PHP and MySQL for authentication, data retrieval, and database management.",
                "Implemented AJAX for real-time dashboard updates and dynamic content display.",
                "Deployed and tested the system locally with XAMPP, ensuring smooth server–database integration.",
                "Managed GitHub version control for collaborative development and efficient updates."],
      imgs: ["/4.PNG","/4.2.PNG", "/4.3.PNG", "/4.4.PNG"],
    },
    {
      title: "Class Funds",
      desc: "A mobile application for managing and tracking class funds, designed to simplify contributions, transactions, and balance visibility.",
      bullets: ["Designed and developed the Android app interface (XML & Java), incorporating custom UI elements created in Canva.", 
                "Structured and managed Firebase database while integrating Firebase Authentication for secure logins and efficient storage.",
                "Implemented core functionalities in Java, including user input handling, transactions, and real-time balance updates.",
                "Coordinated app design with teammates to meet professor guidelines and evaluation criteria."],
      imgs: ["/3.jpg", "/3.2.jpg", "/3.3.jpg", "/3.4.jpg", "/3.5.jpg", "/3.6.jpg", "/3.7.jpg",],
    },
    {
      title: "GameSpace",
      desc: "A space-themed e-commerce website designed to showcase and sell tech-related products with an interactive front-end.",
      bullets: ["Led brainstorming and feature planning with the team to align with project requirements.", 
                "Developed the front-end using HTML, CSS, and JavaScript with a focus on product display and interactivity.",
                "Implemented a basic PHP login system to handle user authentication."],
      imgs: ["/2.PNG", "/2.2.PNG", "/2.3.PNG"],
    },
    {
      title: "Market Square",
      desc: "A homepage prototype for a mock e-commerce company, inspired by platforms like Shopee and Carousell.",
      bullets: ["Collaborated on layout research to design an intuitive and visually appealing UI.", 
                "Built the homepage using HTML, CSS, and JavaScript, customizing Bootstrap components with CSS.",
                "Implemented interactive elements to enhance usability and overall user experience."],
      imgs: ["/1.PNG", "/1.2.PNG", "/1.3.PNG"],
    },
  ];

  return (
    <div className="w-screen min-h-screen">
      {showOnload && (
        <OnloadScreen text="Welcome to my Portfolio Website.😇" />
      )}

      <Starfield />

      <div className="relative z-10">
        <Introduction />
        <Projects projects={projects} />
      </div>
    </div>
  );
}
