"use client"

import { animate } from "motion/react"
import { useEffect, useRef, type RefObject } from "react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"

export function useServiceListScroll(
  containerRef: RefObject<HTMLDivElement | null>,
  listRef: RefObject<HTMLOListElement | null>,
  activeIndex: number
) {
  const reducedMotion = useReducedMotion()
  const activeRef = useRef(activeIndex)

  useEffect(() => {
    activeRef.current = activeIndex
    const container = containerRef.current
    const list = listRef.current
    if (!container || !list) return
    const target = centeredOffset(container, list, activeIndex)
    if (reducedMotion) {
      container.scrollTop = target
      return
    }
    const animation = animate(container.scrollTop, target, {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => {
        container.scrollTop = value
      },
    })
    return () => animation.stop()
  }, [activeIndex, reducedMotion, containerRef, listRef])

  useEffect(() => {
    const container = containerRef.current
    const list = listRef.current
    if (!container || !list) return
    let previousSize = `${container.clientHeight}:${list.scrollHeight}`
    const observer = new ResizeObserver(() => {
      const nextSize = `${container.clientHeight}:${list.scrollHeight}`
      // ResizeObserver emits immediately after observe(). Ignore that notification
      // so it cannot cancel the ongoing reveal animation on every selection.
      if (nextSize === previousSize) return
      previousSize = nextSize
      container.scrollTop = centeredOffset(container, list, activeRef.current)
    })
    observer.observe(container)
    observer.observe(list)
    return () => observer.disconnect()
  }, [containerRef, listRef])
}

function centeredOffset(
  container: HTMLElement,
  list: HTMLElement,
  index: number
) {
  const item = list.children[index] as HTMLElement | undefined
  if (!item) return 0
  const center =
    item.offsetTop + item.offsetHeight / 2 - container.clientHeight / 2
  return Math.max(
    0,
    Math.min(center, container.scrollHeight - container.clientHeight)
  )
}
