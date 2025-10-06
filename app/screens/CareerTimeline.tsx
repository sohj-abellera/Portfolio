// CareerTimeline.tsx
type Event = {
  title: string;
  description: string;
  image: string;
  year?: string;
};

export default function CareerTimeline({ events }: { events: Event[] }) {
  return (
    <div className="relative w-full min-h-screen bg-black/80 border-t border-b border-white/10 flex flex-col items-center pt-20 px-55 text-center">
      <h1 className="text-3xl font-bold text-white mb-4">Career Timeline</h1>
      <p className="text-gray-300 text-[16px] leading-relaxed max-w-4xl">
        A look at my journey so far — from my early days learning to code, 
        to the academic and personal projects that helped me grow as a developer.  
        Each step here reflects what I’ve learned, built, and where I’m heading next.
      </p>

      {/* Timeline container */}
      <div className="relative w-full pt-5">
        {/* Center line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-white/30 to-white/20" />

        {/* Timeline items */}
        <div className="flex flex-col space-y-24 px-12">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={i} className="top-35 relative flex items-start justify-between w-full">
                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.6)] border border-white/30" />

                {isLeft ? (
                  <>
                    {/* Left text */}
                    <div className="flex-1 flex justify-end pr-10">
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-sm text-left shadow-lg hover:scale-[1.03] transition-transform duration-300">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {event.year ? `${event.year} — ${event.title}` : event.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* Right image */}
                    <div className="flex-1 flex justify-start pl-10">
                      <div className="relative w-full rounded-xl overflow-hidden border border-dashed border-white/20 shadow-md hover:border-white/40 hover:scale-[1.03] transition-all duration-300">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left image */}
                    <div className="flex-1 flex justify-end pr-10">
                      <div className="relative w-full rounded-xl overflow-hidden border border-dashed border-white/20 shadow-md hover:border-white/40 hover:scale-[1.03] transition-all duration-300">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition"
                        />
                      </div>
                    </div>

                    {/* Right text */}
                    <div className="flex-1 flex justify-start pl-10">
                      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-sm text-left shadow-lg hover:scale-[1.03] transition-transform duration-300">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {event.year ? `${event.year} — ${event.title}` : event.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
