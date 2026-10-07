import Link from "next/link"
import Image from "next/image"
import { Fragment, type ReactNode } from "react"
import { H1 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"

type Crumb = { label: string; href?: string }

export function PageIntro({
  eyebrow,
  title,
  description,
  image,
  variant = "photo",
  breadcrumbs,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  image: { src: string; alt: string; position?: string }
  variant?: "photo" | "split"
  breadcrumbs?: Crumb[]
  children?: ReactNode
}) {
  const split = variant === "split"
  const crumbs = breadcrumbs ?? [
    { label: "Inicio", href: "/" },
    { label: eyebrow },
  ]
  return (
    <section
      data-page-intro
      data-header-tone={split ? "dark" : "light"}
      data-mode={split ? "light" : "dark"}
      className={cn(
        "group/dark relative isolate overflow-hidden",
        split ? "border-b bg-background" : "bg-background-2 text-white"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10",
          split && "hidden lg:left-[55%] lg:block"
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={split ? "45vw" : "100vw"}
          preload
          className="object-cover"
          style={{ objectPosition: image.position ?? "center" }}
        />
        {!split && (
          <div className="absolute inset-0 bg-linear-to-r from-background-2/95 via-background-2/80 to-background-2/45" />
        )}
      </div>
      <div className="relative container-screen-2xl pt-40 pb-16 sm:pt-48 sm:pb-20 lg:pt-56 lg:pb-24">
        <div className={cn(split && "lg:max-w-[48%]")}>
          <Breadcrumb aria-label="Ruta de navegación" className="mb-10">
            <BreadcrumbList
              className={cn("font-mono", !split && "text-white/65")}
            >
              {crumbs.map((crumb, index) => (
                <Fragment key={`${crumb.label}-${index}`}>
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {crumb.href ? (
                      <BreadcrumbLink
                        asChild
                        className={cn(!split && "hover:text-white")}
                      >
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage className={cn(!split && "text-white")}>
                        {crumb.label}
                      </BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <P
            className={cn(
              "mb-5 font-mono",
              split
                ? "text-primary"
                : "text-primary group-data-[mode='dark']/dark:text-primary"
            )}
          >
            {eyebrow}
          </P>
          <H1 reveal className="max-w-5xl text-balance">
            {title}
          </H1>
          <P reveal className="max-w-2xl">
            {description}
          </P>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
      {split && (
        <div className="relative h-64 sm:h-80 lg:hidden">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: image.position ?? "center" }}
          />
        </div>
      )}
    </section>
  )
}
