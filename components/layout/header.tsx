"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandLogo } from "./brand-logo"
import { HeaderBar } from "./header-bar"
import { Navigation } from "./navigation"
import { useHeaderScroll } from "./use-header-scroll"

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { hidden, scrolled, reveal } = useHeaderScroll(pathname, open)
  return (
    <header
      data-site-header
      data-hidden={hidden}
      data-scrolled={scrolled}
      inert={hidden}
      onFocusCapture={reveal}
      className="fixed inset-x-0 top-0 z-60"
    >
      <HeaderBar>
        <Link
          href="/"
          aria-label="Qoritum, inicio"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <BrandLogo className="brand-on-light max-[360px]:w-32" />
          <BrandLogo tone="cream" className="brand-on-dark max-[360px]:w-32" />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button asChild className="px-3 sm:px-6">
            <Link
              href="/contactanos"
              aria-label="Conversemos sobre tu proyecto"
            >
              <span className="sm:hidden">Empezar</span>
              <span className="hidden sm:inline">Conversemos</span>
              <ArrowUpRight className="hidden sm:block" />
            </Link>
          </Button>
          <Navigation open={open} onOpenChange={setOpen} onNavigate={reveal} />
        </div>
      </HeaderBar>
    </header>
  )
}
