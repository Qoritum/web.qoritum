"use client"

import { useEffect, useRef, useState } from "react"
import {
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { usePageScroll } from "@/hooks/use-page-scroll"

// 1.65 vertical pixels per horizontal pixel: ample time to explore each image.
// The first/last 6% let the movement settle before the sticky panel releases.
const SCROLL_PACE = 1.65
const EDGE_PAUSE = 0.06

export function useResultsScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const scrollPage = usePageScroll()
  const distance = useMotionValue(0)
  const [scrollDistance, setScrollDistance] = useState(0)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })
  const progress = useTransform(
    scrollYProgress,
    [EDGE_PAUSE, 1 - EDGE_PAUSE],
    [0, 1]
  )
  const targetX = useTransform(() => -distance.get() * (1 - progress.get()))
  const x = useSpring(targetX, { stiffness: 100, damping: 30, mass: 0.6 })

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return
    const measure = () => {
      const next = Math.max(0, track.scrollWidth - viewport.clientWidth)
      distance.set(next)
      setScrollDistance(next * SCROLL_PACE)
      x.jump(targetX.get())
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(viewport)
    observer.observe(track)
    return () => observer.disconnect()
  }, [distance, targetX, x])

  function reveal(index: number) {
    const section = sectionRef.current
    const viewport = viewportRef.current
    const card = trackRef.current?.children[index] as HTMLElement | undefined
    if (!section || !viewport || !card || reducedMotion || !distance.get())
      return
    const offset = Math.max(
      0,
      Math.min(
        distance.get(),
        card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2
      )
    )
    const ratio =
      EDGE_PAUSE + (1 - offset / distance.get()) * (1 - 2 * EDGE_PAUSE)
    scrollPage(
      section.getBoundingClientRect().top +
        window.scrollY +
        (section.offsetHeight - document.documentElement.clientHeight) * ratio,
      true
    )
    x.jump(-offset)
  }

  return {
    sectionRef,
    viewportRef,
    trackRef,
    reducedMotion,
    scrollDistance,
    x,
    reveal,
  }
}
