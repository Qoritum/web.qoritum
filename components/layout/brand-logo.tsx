import Image from "next/image"
import { cn } from "@/lib/utils"

export function BrandLogo({
  tone = "orange",
  className,
}: {
  tone?: "orange" | "cream"
  className?: string
}) {
  return (
    <span
      className={cn(
        "relative block aspect-[3336/736] w-40 overflow-hidden sm:w-48",
        className
      )}
    >
      {/* Display the useful area of the original PNG, which has large transparent margins. */}
      <Image
        src={`/images/Isotipo 1 ${tone === "cream" ? "beige" : "naranja"} sin fondo.png`}
        alt="Qoritum"
        width={4500}
        height={4500}
        sizes="(max-width: 640px) 216px, 320px"
        className="absolute top-[-255.3%] left-[-17.24%] h-auto w-[134.9%] max-w-none"
      />
    </span>
  )
}
