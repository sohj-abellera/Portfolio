import { useEffect, useState } from "react"

type Breakpoint = "xl" | "lg" | "md" | "sm"

export default function useBreakpoint(): Breakpoint {
  const getBp = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 0
    if (w >= 1280) return "xl"
    if (w >= 1024) return "lg"
    if (w >= 768) return "md"
    return "sm"
  }

  const [bp, setBp] = useState<Breakpoint>(getBp())

  useEffect(() => {
    const onResize = () => setBp(getBp())
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  return bp
}


