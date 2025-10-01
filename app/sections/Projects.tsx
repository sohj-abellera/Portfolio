export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 w-full h-[300vh] mt-16
                 bg-blue-950/15 backdrop-blur-[30px] 
                 border-t border-b border-white/20"
    >
      <h2 className="text-5xl font-bold text-center text-white mt-20 mb-30">
        Projects
      </h2>
        <div className="w-185 h-90 rounded-2xl overflow-hidden border border-white/20 sticky top-24 ">
          <img
            src="/sample website.PNG"
            alt="Project preview"
            className="w-full h-full object-cover"
          />
        </div>

    </section>
  );
}
