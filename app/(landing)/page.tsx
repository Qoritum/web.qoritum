import { About } from "./about"
import { Contact } from "./contact"
import { FAQ } from "./faq"
import { Hero } from "./hero"
import { Services } from "./services"
import { Results } from "./results"
import { Metrics } from "./metrics"
import { pageMetadata, websiteStructuredData } from "@/lib/seo"
import { site } from "@/lib/site"

export const metadata = pageMetadata(
  "Software, automatización e IA para empresas",
  site.description,
  "/"
)

export default function Landing() {
  const structuredData = websiteStructuredData()
  return (
    <main id="main-content" className="overflow-x-clip">
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <Hero />
      <About />
      <Services />
      <Results />
      <Metrics />
      <FAQ />
      <Contact />
    </main>
  )
}
