"use client"

import { useEffect, useRef } from "react"
import { animate, useInView } from "motion/react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function AnimatedNumber({
  value,
  suffix = "",
  delay = 0,
}: {
  value: number
  suffix?: string
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, amount: 0.5 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = ref.current
    if (!element || !visible || reducedMotion) return
    const animation = animate(0, value, {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (current) => {
        element.textContent = String(Math.round(current))
      },
    })
    return () => {
      animation.stop()
      element.textContent = String(value)
    }
  }, [value, delay, visible, reducedMotion])

  return (
    <span className="inline-grid tabular-nums">
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1">
        <span ref={ref}>{value}</span>
        {suffix}
      </span>
    </span>
  )
}
