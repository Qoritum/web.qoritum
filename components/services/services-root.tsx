"use client"

import { useMotionValueEvent, useScroll, useTransform } from "motion/react"
import { useCallback, useMemo, useRef, useState, type ReactNode } from "react"
import { ServicesProvider } from "./services-context"
import type { ServiceItem } from "./services.data"
import { usePageScroll } from "@/hooks/use-page-scroll"

// Scroll distance per service, in small viewport heights.
const SCROLL_STEP = 0.75

export function ServicesRoot({
  services,
  children,
}: {
  services: ServiceItem[]
  children: ReactNode
}) {
  const targetRef = useRef<HTMLElement>(null)
  const scrollPage = usePageScroll()
  const [activeIndex, setActiveIndex] = useState(0)
  const lastIndex = Math.max(0, services.length - 1)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  })
  const progress = useTransform(scrollYProgress, [0, 1], [0, lastIndex])

  useMotionValueEvent(progress, "change", (value) => {
    const next = Math.max(0, Math.min(lastIndex, Math.round(value)))
    setActiveIndex((previous) => (previous === next ? previous : next))
  })

  const scrollToService = useCallback(
    (index: number) => {
      const section = targetRef.current
      if (!section) return
      const ratio = lastIndex
        ? Math.max(0, Math.min(lastIndex, index)) / lastIndex
        : 0
      // Match useScroll's end-end offset, also after a device rotation.
      const distance = Math.max(
        0,
        section.offsetHeight - document.documentElement.clientHeight
      )
      scrollPage(
        section.getBoundingClientRect().top + window.scrollY + distance * ratio
      )
    },
    [lastIndex, scrollPage]
  )

  const value = useMemo(
    () => ({ services, activeIndex, scrollToService }),
    [services, activeIndex, scrollToService]
  )

  if (!services.length) return null

  return (
    <ServicesProvider value={value}>
      <section
        id="servicios"
        ref={targetRef}
        aria-label="Nuestros servicios"
        data-mode="dark"
        className="group/dark relative bg-background-2 text-background-2-foreground"
        style={{ height: `${100 + lastIndex * SCROLL_STEP * 100}svh` }}
      >
        <div className="sticky top-0 h-svh overflow-hidden">
          <div className="relative flex h-full min-h-0 flex-col">
            {children}
          </div>
        </div>
      </section>
    </ServicesProvider>
  )
}
