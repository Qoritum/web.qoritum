"use client"

import { cn } from "@/lib/utils"
import { H3 } from "@/components/typography/heading"
import { Button } from "@/components/ui/button"

interface ServicesNavItemProps {
  index: number
  title: string
  serviceId: string
  active: boolean
  onSelect: (index: number) => void
}

export function ServicesNavItem({
  index,
  title,
  serviceId,
  active,
  onSelect,
}: ServicesNavItemProps) {
  return (
    <li>
      <Button
        type="button"
        variant="ghost"
        aria-current={active ? "true" : undefined}
        aria-controls="service-showcase"
        data-track="select_service"
        data-service={serviceId}
        onClick={() => onSelect(index)}
        onFocus={(event) => {
          if (event.currentTarget.matches(":focus-visible")) onSelect(index)
        }}
        className={cn(
          "group h-auto w-full justify-start gap-4 px-0 py-3 pr-3 text-left font-normal tracking-normal whitespace-normal normal-case hover:bg-transparent hover:text-white sm:gap-6 lg:gap-8 lg:py-4",
          active ? "text-white" : "text-white/45"
        )}
      >
        <span
          className={cn(
            "shrink-0 font-mono text-xs opacity-50 sm:text-base md:text-lg",
            active && "text-primary"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <H3
          reveal
          as="span"
          className="mb-0 text-inherit group-data-[mode='dark']/dark:text-inherit"
        >
          {title}
        </H3>
        <span
          className={cn(
            "ml-auto h-8 w-2 shrink-0 origin-top bg-primary transition-transform duration-500 motion-reduce:transition-none",
            active
              ? "scale-y-100 opacity-100"
              : "scale-y-0 opacity-40 group-hover:scale-y-50"
          )}
        />
      </Button>
    </li>
  )
}
