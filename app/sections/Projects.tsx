export default function Projects() {
  return (
    <section
      id="projects"
      className="h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center snap-start px-[120px]"
    >
      <h2 className="text-4xl font-bold mb-10">Projects</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
        {/* Example Project Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold mb-2">Project 1</h3>
          <p className="text-gray-400">Short description of the project.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform">
          <h3 className="text-2xl font-semibold mb-2">Project 2</h3>
          <p className="text-gray-400">Short description of the project.</p>
        </div>
      </div>
    </section>
  );
}
