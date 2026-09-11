"use client"

import { useCallback } from "react"
import { useLenis } from "lenis/react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function usePageScroll() {
  const lenis = useLenis()
  const reducedMotion = useReducedMotion()
  return useCallback(
    (top: number, immediate = false) => {
      if (lenis && !reducedMotion) lenis.scrollTo(top, { immediate })
      else
        window.scrollTo({
          top,
          behavior: immediate || reducedMotion ? "instant" : "smooth",
        })
    },
    [lenis, reducedMotion]
  )
}
