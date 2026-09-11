"use client"

import { useRef } from "react"
import { useServices } from "./services-context"
import { useServiceListScroll } from "./use-service-list-scroll"
import { ServicesNavItem } from "./services-nav-item"

export function ServicesNav() {
  const { services, activeIndex, scrollToService } = useServices()
  const containerRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  useServiceListScroll(containerRef, listRef, activeIndex)
  return (
    <div
      ref={containerRef}
      className="relative min-h-0 flex-1 overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_20px,black_calc(100%-20px),transparent)]"
    >
      <ol ref={listRef} className="relative flex flex-col py-5">
        {services.map((service, index) => (
          <ServicesNavItem
            key={service.id}
            index={index}
            title={service.title}
            serviceId={service.id}
            active={activeIndex === index}
            onSelect={scrollToService}
          />
        ))}
      </ol>
    </div>
  )
}
