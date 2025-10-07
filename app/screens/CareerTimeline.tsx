type Event = {
  year?: string
  title: string
  description: string
  image: string
  github?: string
  tech?: string[]
}

export default function CareerTimeline({ events }: { events: Event[] }) {
  return (
    <div className="w-full bg-black/80 border-t border-b border-white/10 py-20 text-white">
      {/* Header */}
      <div className="w-full flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold mb-4">Career Timeline</h1>
        <p className="text-gray-300 text-[16px] leading-relaxed max-w-6xl mb-16">
          A look at my journey so far — from being unexpectedly assigned as the leader
          for a website project, to discovering my genuine interest in web development.
          What started as a simple task quickly turned into a passion. Each project
          since then has helped me grow as a developer, sharpening both my technical
          skills and my love for building interactive experiences.
        </p>
      </div>

      {/* Timeline container */}
      <div className="relative max-w-6xl mx-auto px-8">
        {/* Left vertical line */}
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/40 to-transparent" />

        {/* Timeline events */}
        <div className="flex flex-col space-y-20">
          {events.map((event, i) => (
            <div key={i} className="relative flex items-start pl-16">
              {/* Timeline dot */}
              <div className="absolute left-[7px] top-2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)]" />

              {/* Content card */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm shadow-md w-full hover:bg-white/10 transition-all duration-300">
                {/* Date */}
                {event.year && (
                  <p className="text-sm text-gray-400 mb-1">{event.year}</p>
                )}

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-4">
                  {event.title}
                </h3>

                {/* Image */}
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-md border border-white/10 mb-4"
                />

                {/* Description */}
                <p className="text-gray-300 text-[15px] leading-relaxed mb-4">
                  {event.description}
                </p>

                {/* Tags + GitHub */}
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  {/* GitHub Link */}
                  {event.github && (
                    <a
                      href={event.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      • View on GitHub
                    </a>
                  )}

                  {/* Tech stack tags */}
                  {event.tech?.map((t, j) => (
                    <span
                      key={j}
                      className="px-3 py-1 bg-white/10 rounded-full text-gray-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
