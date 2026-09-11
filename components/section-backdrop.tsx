import { cn } from "@/lib/utils"
import { IsometricArt } from "@/components/isometric-art"

// Place inside a relative, isolated section. The mask keeps decoration local.
export function SectionBackdrop({
  pattern = "grid",
  shape = "field",
  className,
}: {
  pattern?: "grid" | "dots"
  shape?: "stack" | "bridge" | "field"
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "section-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden text-primary select-none",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 mask-[linear-gradient(130deg,transparent_25%,black)] opacity-15",
          pattern === "grid" ? "backdrop-grid" : "backdrop-dots"
        )}
      />
      <IsometricArt
        variant={shape}
        className="absolute -right-24 -bottom-28 h-100 w-120 text-current opacity-15 sm:-right-12 sm:h-120 sm:w-160"
      />
    </div>
  )
}
