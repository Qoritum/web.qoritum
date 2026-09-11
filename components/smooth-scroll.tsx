"use client"

import { ReactLenis, useLenis, type LenisRef } from "lenis/react"
import { cancelFrame, frame } from "motion/react"
import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

const options = {
  autoRaf: false,
  lerp: 0.085,
  smoothWheel: true,
  syncTouch: false,
  anchors: true,
  allowNestedScroll: true,
}

export function SmoothScroll() {
  const ref = useRef<LenisRef>(null)
  const reducedMotion = useReducedMotion()
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return
    // Stop existing momentum as well as new wheel events when Radix locks body.
    const syncLock = () => {
      if (document.body.hasAttribute("data-scroll-locked")) lenis.stop()
      else lenis.start()
    }
    syncLock()
    const observer = new MutationObserver(syncLock)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    })
    return () => observer.disconnect()
  }, [lenis])

  useEffect(() => {
    if (reducedMotion) return
    const update = ({ timestamp }: { timestamp: number }) =>
      ref.current?.lenis?.raf(timestamp)
    frame.update(update, true)
    return () => cancelFrame(update)
  }, [reducedMotion])

  return reducedMotion ? null : <ReactLenis root ref={ref} options={options} />
}
