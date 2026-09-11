"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { useResultsScroll } from "./use-results-scroll"
import { ResultImage } from "./result-image"
import type { ResultItem } from "./results.data"

export function ResultsRoot({
  results,
  children,
}: {
  results: ResultItem[]
  children: ReactNode
}) {
  const {
    sectionRef,
    viewportRef,
    trackRef,
    reducedMotion,
    scrollDistance,
    x,
    reveal,
  } = useResultsScroll()
  return (
    <section
      ref={sectionRef}
      id="results"
      aria-labelledby="results-heading"
      className="relative w-full bg-background"
      style={{
        height: reducedMotion ? "auto" : `calc(100svh + ${scrollDistance}px)`,
      }}
    >
      <div
        className={
          reducedMotion
            ? "py-12 sm:py-16"
            : "sticky top-0 flex h-svh flex-col gap-8 py-8 sm:gap-10 sm:py-12 [@media(max-height:500px)]:gap-4 [@media(max-height:500px)]:py-4"
        }
      >
        {children}
        {/* No max-width container here: the scene extends to both viewport edges. */}
        <div
          ref={viewportRef}
          className={
            reducedMotion
              ? "w-full overflow-x-auto"
              : "min-h-0 w-full flex-1 overflow-clip"
          }
        >
          <motion.div
            ref={trackRef}
            style={{ x: reducedMotion ? 0 : x }}
            className={`relative flex w-max gap-6 px-[8vw] sm:gap-10 lg:gap-16 ${reducedMotion ? "h-[60svh]" : "h-full"}`}
          >
            {results.map((result, index) => (
              <ResultImage
                key={result.id}
                result={result}
                onFocus={() => reveal(index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
