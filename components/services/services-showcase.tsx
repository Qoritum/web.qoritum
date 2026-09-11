"use client"

import { AnimatePresence, motion } from "motion/react"
import { useReducedMotion } from "@/hooks/use-reduced-motion"
import Image from "next/image"
import { useServices } from "./services-context"
import { P } from "@/components/typography/description"

export function ServicesShowcase() {
  const { services, activeIndex } = useServices()
  const reducedMotion = useReducedMotion()
  const service = services[activeIndex]
  if (!service) return null

  return (
    <div className="pointer-events-none absolute inset-0 lg:left-1/2">
      {/* Warm the neighboring images before their transitions start. */}
      <div hidden aria-hidden="true">
        {[services[activeIndex - 1], services[activeIndex + 1]]
          .filter(Boolean)
          .map((neighbor) => (
            <Image
              key={neighbor.id}
              src={neighbor.image}
              alt=""
              width={1}
              height={1}
              unoptimized
              loading="eager"
            />
          ))}
      </div>
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={service.id}
            className="absolute inset-0"
            initial={{
              clipPath: reducedMotion ? "inset(0)" : "inset(100% 0 0 0)",
            }}
            animate={{ clipPath: "inset(0)" }}
            exit={{
              clipPath: reducedMotion ? "inset(0)" : "inset(0 0 100% 0)",
            }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={service.image}
              alt=""
              fill
              unoptimized
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-t from-background-2 via-background-2/75 to-background-2/65 lg:from-background-2/90 lg:via-background-2/45 lg:to-background-2/30" />
      </div>
      <div
        id="service-showcase"
        className="pointer-events-auto absolute inset-x-0 bottom-0 z-50 h-[34svh] overflow-y-auto px-3 py-5 sm:px-12 lg:inset-0 lg:flex lg:h-auto lg:items-center lg:p-10 xl:p-20"
      >
        <div key={service.id} className="my-auto max-w-lg">
          <P className="mb-3 font-mono tracking-widest text-primary group-data-[mode='dark']/dark:text-primary">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(services.length).padStart(2, "0")}
          </P>
          <P reveal className="font-heading">
            {service.tagline}
          </P>
          <ul className="mt-3 space-y-2 lg:mt-6 lg:space-y-4">
            {service.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="text-primary" aria-hidden="true">
                  ↗
                </span>
                <P reveal>{point}</P>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
