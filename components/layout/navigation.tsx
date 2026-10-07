"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRef } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { H3 } from "@/components/typography/heading"
import { WordReveal } from "@/components/typography/word-reveal"
import { BrandLogo } from "./brand-logo"
import { HeaderBar } from "./header-bar"
import { navigation, site } from "@/lib/site"

const menuLinks = [{ label: "Inicio", href: "/" }, ...navigation]

export function Navigation({
  open,
  onOpenChange,
  onNavigate,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  onNavigate: () => void
}) {
  const pathname = usePathname()
  const navigating = useRef(false)
  function navigate() {
    navigating.current = true
    onOpenChange(false)
    onNavigate()
  }
  const active = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"))
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          aria-label="Abrir navegación"
          className="border-current/30 bg-background text-foreground! hover:bg-primary hover:text-primary-foreground"
        >
          <Menu className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        overlayClassName="site-navigation-overlay"
        className="site-navigation top-0 left-0 translate-x-0 translate-y-0"
        aria-describedby="navigation-description"
        onCloseAutoFocus={(event) => {
          if (!navigating.current) return
          // Let Next manage page navigation without returning focus to the header.
          event.preventDefault()
          navigating.current = false
        }}
      >
        <DialogTitle className="sr-only">Explora Qoritum</DialogTitle>
        <DialogDescription id="navigation-description" className="sr-only">
          Navega por Qoritum o conversa sobre tu próximo proyecto.
        </DialogDescription>
        <div
          data-mode="dark"
          className="group/dark flex h-full min-h-0 flex-col text-white"
        >
          <HeaderBar>
            <Link href="/" aria-label="Qoritum, inicio" onNavigate={navigate}>
              <BrandLogo tone="cream" className="max-[360px]:w-32" />
            </Link>
            <DialogClose asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label="Cerrar navegación"
                className="border-white/30 bg-transparent text-white hover:bg-primary hover:text-primary-foreground"
              >
                <X className="size-5" />
              </Button>
            </DialogClose>
          </HeaderBar>
          <div
            data-lenis-prevent
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-3 sm:px-8 lg:px-12"
          >
            <nav
              aria-label="Navegación principal"
              className="my-auto py-6 sm:py-8"
            >
              <ol>
                {menuLinks.map((link, index) => (
                  <li key={link.href}>
                    <Button
                      asChild
                      variant="ghost"
                      className="group h-auto min-h-20 w-full justify-start gap-3 overflow-hidden border-0 px-0 py-3 text-left font-normal tracking-normal whitespace-normal normal-case hover:bg-transparent hover:text-primary focus-visible:ring-primary aria-[current=page]:text-primary sm:gap-6 sm:py-4 lg:py-3"
                    >
                      <Link
                        href={link.href}
                        onNavigate={navigate}
                        aria-current={active(link.href) ? "page" : undefined}
                      >
                        <span
                          aria-hidden
                          className="w-4 shrink-0 font-mono text-xs text-white/35 sm:w-8 sm:text-sm"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="navigation-label block min-w-0 flex-1">
                          <H3
                            as="span"
                            className="mb-0 block text-4xl text-inherit transition-transform duration-500 group-hover:translate-x-2 group-data-[mode='dark']/dark:text-inherit motion-reduce:transform-none sm:text-6xl lg:text-[clamp(3.75rem,8dvh,5rem)] lg:leading-none"
                          >
                            <WordReveal delay={index * 45}>
                              {link.label}
                            </WordReveal>
                          </H3>
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="ml-auto size-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 motion-reduce:transform-none sm:size-8 lg:size-10"
                        />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="navigation-meta flex shrink-0 flex-col items-start justify-between gap-5 py-7 font-mono text-sm sm:flex-row sm:items-center sm:py-8">
              <a
                href={`mailto:${site.email}`}
                data-track="contact_click"
                data-channel="email"
                className="break-all text-white/65 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              >
                {site.email}
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                data-track="contact_click"
                data-channel="whatsapp"
                className="inline-flex items-center gap-3 text-white/65 transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              >
                {site.phoneDisplay}
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
