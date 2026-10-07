"use client"

import {
  Children,
  cloneElement,
  isValidElement,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react"

// Keep real text and inline markup in the HTML: readable without JS, selectable,
// and announced once. Whitespace stays outside the masks so lines wrap naturally.
function words(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child)
        .split(/(\s+)/)
        .map((word, index) =>
          /^\s*$/.test(word) ? (
            word
          ) : (
            <span className="word-mask" key={index}>
              <span data-reveal-word>{word}</span>
            </span>
          )
        )
    }
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      typeof child.type === "string" &&
      child.props.children
    ) {
      return cloneElement(child, {}, words(child.props.children))
    }
    return child
  })
}

export function WordReveal({
  children,
  delay = 0,
}: {
  children: ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const items = Array.from(
      element.querySelectorAll<HTMLElement>("[data-reveal-word]")
    )
    let animations: Animation[] = []
    let revealed = false
    const show = () => {
      animations.forEach((animation) => animation.cancel())
      items.forEach((item) => {
        item.style.transform = "none"
      })
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || revealed) return
        revealed = true
        observer.disconnect()
        if (preference.matches) return show()
        // Cap the total stagger so long paragraphs never make the reader wait.
        const stagger = Math.min(42, 420 / Math.max(1, items.length - 1))
        animations = items.map((item, index) => {
          item.style.transform = "none"
          return item.animate(
            [{ transform: "translateY(115%)" }, { transform: "translateY(0)" }],
            {
              duration: 820,
              delay: delay + index * stagger,
              easing: "cubic-bezier(.22,1,.36,1)",
              fill: "backwards",
            }
          )
        })
      },
      { threshold: 0, rootMargin: "0px 0px -24px 0px" }
    )
    if (!preference.matches) {
      items.forEach((item) => {
        item.style.transform = "translateY(115%)"
      })
      observer.observe(element)
    }
    const onPreference = () => {
      if (preference.matches) {
        revealed = true
        observer.disconnect()
        show()
      }
    }
    preference.addEventListener("change", onPreference)
    return () => {
      observer.disconnect()
      preference.removeEventListener("change", onPreference)
      show()
    }
  }, [children, delay])

  return (
    <span ref={ref} className="word-reveal">
      {words(children)}
    </span>
  )
}
