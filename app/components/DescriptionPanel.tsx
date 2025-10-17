import { useState } from "react"
import { BookOpen, Star } from "lucide-react"

export default function DescriptionPanel({
  descriptionStanzas,
  takeaways,
}: {
  descriptionStanzas: string[]
  takeaways?: string[]
}) {
  const [showTakeaways, setShowTakeaways] = useState(false)

  const tabs = [
    { id: "story", icon: <BookOpen size={18} />, title: "Story" },
    { id: "takeaways", icon: <Star size={18} />, title: "Takeaways" },
  ]

  return (
    <div className="relative flex items-stretch -ml-8">
      {takeaways && (
        <div className="flex flex-col gap-2">
          {tabs.map((tab) => {
            const active =
              (tab.id === "takeaways" && showTakeaways) ||
              (tab.id === "story" && !showTakeaways)

            return (
              <button
                key={tab.id}
                onClick={() => setShowTakeaways(tab.id === "takeaways")}
                className={`relative flex items-center justify-center pr-[15px] pt-[7px] transition-all cursor-pointer
                  ${
                    active
                      ? "text-yellow-400 z-10"
                      : "bg-transparent text-white/70 hover:text-white opacity-80 hover:opacity-100"
                  }
                  rounded-l-[8px]
                `}
                title={tab.title}
              >
                {tab.icon}
              </button>
            )
          })}
        </div>
      )}

      <div
        className={`flex-1 rounded-r-[8px] backdrop-blur-sm space-y-4 font-lexend font-[200] tracking-[.5px] mb-5`}
      >
        {!showTakeaways &&
          descriptionStanzas.map((text, i) => (
            <p key={i} className="leading-relaxed text-neutral-150 xl:text-[16px] md:text-[15px] sm:text-[16px] text-[15px]">
              {text}
            </p>
          ))}

        {showTakeaways && takeaways && (
          <div className="space-y-2">
            {takeaways.map((item, i) => (
              <div key={i} className="flex items-start gap-[7px]">
                <div className="w-[4px] h-[4px] mt-[11px] rounded-full bg-white shrink-0" />
                <div className="leading-relaxed text-neutral-150 xl:text-[16px] md:text-[15px] sm:text-[16px] text-[15px]">
                  {item}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


