import type { ReactNode } from "react"

const headerSpacing =
  "flex min-h-18 w-full items-center justify-between gap-3 px-3 sm:min-h-22 sm:px-8 lg:px-12"
export function HeaderBar({ children }: { children: ReactNode }) {
  return <div className={headerSpacing}>{children}</div>
}
