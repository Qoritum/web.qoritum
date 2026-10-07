import { About } from "./about"
import { Contact } from "./contact"
import { FAQ } from "./faq"
import { Hero } from "./hero"
import { Services } from "./services"
import { Results } from "./results"
import { Metrics } from "./metrics"
import { pageMetadata, websiteStructuredData } from "@/lib/seo"
import { site } from "@/lib/site"
import { StructuredData } from "@/components/structured-data"

export const metadata = pageMetadata(
  "Software, automatización e IA para empresas",
  site.description,
  "/"
)

export default function Landing() {
  const structuredData = websiteStructuredData()
  return (
    <main id="main-content" className="overflow-x-clip">
      <StructuredData data={structuredData} />
      <Hero />
      <About />
      <Services />
      <div className="h-24" />
      <Results />
      <div className="h-8" />
      <Metrics />
      <FAQ />
      <Contact />
    </main>
  )
}
