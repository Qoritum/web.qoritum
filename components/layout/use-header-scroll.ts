"use client"

import { useMotionValueEvent, useScroll } from "motion/react"
import { useRef, useState } from "react"

const TOP_ZONE = 96
const DIRECTION_THRESHOLD = 16

// Accumulate travel in one direction so small Lenis/touch movements do not
// repeatedly show and hide the header. Motion shares the existing scroll clock.
export function useHeaderScroll(pathname: string, menuOpen: boolean) {
  const { scrollY } = useScroll()
  const position = useRef({ y: 0, travel: 0, pathname })
  const [state, setState] = useState({
    pathname,
    hidden: false,
    scrolled: false,
  })

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = position.current
    const routeChanged = previous.pathname !== pathname
    const delta = y - previous.y
    const travel =
      routeChanged || Math.sign(delta) !== Math.sign(previous.travel)
        ? delta
        : previous.travel + delta
    position.current = { y, travel, pathname }

    setState((current) => {
      let hidden = current.pathname === pathname && current.hidden
      if (
        routeChanged ||
        menuOpen ||
        y <= TOP_ZONE ||
        travel < -DIRECTION_THRESHOLD
      )
        hidden = false
      else if (travel > DIRECTION_THRESHOLD) hidden = true
      const scrolled = y > TOP_ZONE
      if (
        current.pathname === pathname &&
        current.hidden === hidden &&
        current.scrolled === scrolled
      )
        return current
      return { pathname, hidden, scrolled }
    })
  })

  function reveal() {
    position.current = { y: scrollY.get(), travel: 0, pathname }
    setState((current) => ({ ...current, pathname, hidden: false }))
  }

  return {
    hidden: state.pathname === pathname && state.hidden && !menuOpen,
    scrolled: state.pathname === pathname && state.scrolled,
    reveal,
  }
}
