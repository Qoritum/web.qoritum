"use client"

import { createContext, useContext } from "react"
import type { ServiceItem } from "@/lib/services"

export interface ServicesContextValue {
  services: ServiceItem[]
  activeIndex: number
  scrollToService: (index: number) => void
}

const ServicesContext = createContext<ServicesContextValue | null>(null)

export const ServicesProvider = ServicesContext.Provider

export function useServices() {
  const context = useContext(ServicesContext)
  if (!context) {
    throw new Error("useServices must be used within ServicesRoot")
  }
  return context
}
