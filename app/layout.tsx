import { Geist_Mono, Inter, Lunasima } from "next/font/google"

import "./globals.css"
import "lenis/dist/lenis.css"
import { SmoothScroll } from "@/components/smooth-scroll"
import { cn } from "@/lib/utils"
import { baseMetadata } from "@/lib/seo"
import { Footer } from "@/components/footer"
import { ConsentProvider } from "@/components/marketing/consent"
import { Tracking } from "@/components/marketing/tracking"

export const metadata = baseMetadata

const lunasimaHeading = Lunasima({
  weight: ["400", "700"],
  variable: "--font-heading",
})

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable,
        lunasimaHeading.variable
      )}
    >
      <body id="inicio">
        <SmoothScroll />
        <a
          href="#main-content"
          className="sr-only z-100 bg-background p-4 text-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Saltar al contenido
        </a>
        <ConsentProvider>
          {children}
          <Footer />
          <Tracking />
        </ConsentProvider>
      </body>
    </html>
  )
}
