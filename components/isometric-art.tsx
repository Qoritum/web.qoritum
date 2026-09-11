"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

type Variant = "stack" | "bridge" | "field"

// Original vector geometry. Edit these coordinates to compose new structures.
const structures: Record<Variant, number[][]> = {
  stack: [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 1],
    [0, 0, 2],
  ],
  bridge: [
    [-2, 0, 0],
    [-2, 0, 1],
    [-1, 0, 1],
    [0, 0, 1],
    [1, 0, 1],
    [2, 0, 1],
    [2, 0, 0],
  ],
  field: [
    [-1, -1, 0],
    [0, -1, 0],
    [1, -1, 0],
    [-1, 0, 0],
    [0, 0, 1],
    [1, 0, 0],
    [-1, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
}

export function IsometricArt({
  variant = "stack",
  className,
}: {
  variant?: Variant
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], [14, -14])
  const lift = useTransform(scrollYProgress, [0, 1], [8, -10])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "isometric-art pointer-events-none text-primary select-none",
        className
      )}
    >
      <motion.svg
        viewBox="0 0 360 280"
        fill="none"
        className="size-full overflow-visible"
        style={{ y: reducedMotion ? 0 : y }}
      >
        <g stroke="currentColor" strokeWidth="0.6" opacity="0.22">
          {[-3, -2, -1, 0, 1, 2, 3].map((n) => (
            <g key={n}>
              <path
                d={`M ${180 + n * 23 - 69} ${192 + n * 13 + 39} l 138 -78`}
              />
              <path
                d={`M ${180 + n * 23 - 69} ${192 - n * 13 - 39} l 138 78`}
              />
            </g>
          ))}
        </g>
        <motion.g
          style={{ y: reducedMotion ? 0 : lift }}
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinejoin="round"
        >
          {structures[variant].map(([x, z, height], index) => (
            <g
              key={index}
              transform={`translate(${180 + (x - z) * 29}, ${155 + (x + z) * 16 - height * 33})`}
            >
              <path
                d="M 0 -32 L 28 -16 L 0 0 L -28 -16 Z"
                fill="currentColor"
                fillOpacity={height > 0 ? ".24" : ".1"}
              />
              <path
                d="M -28 -16 L 0 0 L 0 32 L -28 16 Z"
                fill="currentColor"
                fillOpacity=".05"
              />
              <path
                d="M 0 0 L 28 -16 L 28 16 L 0 32 Z"
                fill="currentColor"
                fillOpacity=".14"
              />
            </g>
          ))}
        </motion.g>
        <path
          d="M 44 204 v 12 h 12 M 304 64 h 12 v 12"
          stroke="currentColor"
          opacity=".45"
        />
        <circle cx="316" cy="216" r="2" fill="currentColor" />
      </motion.svg>
    </div>
  )
}
