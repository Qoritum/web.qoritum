import { SectionBackdrop } from "@/components/section-backdrop"
import { H2 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { company } from "@/lib/company"

export function Purpose() {
  return (
    <section
      data-mode="dark"
      className="group/dark relative isolate overflow-hidden bg-background-2 py-20 text-white sm:py-28"
    >
      <SectionBackdrop shape="bridge" className="left-1/3" />
      <div className="container-screen-2xl grid gap-14 lg:grid-cols-2 lg:gap-20">
        {[
          { title: "Nuestra misión.", text: company.mission, number: "01" },
          { title: "Nuestra visión.", text: company.vision, number: "02" },
        ].map((item) => (
          <div key={item.title}>
            <P className="mb-6 font-mono text-primary group-data-[mode='dark']/dark:text-primary">
              {item.number}
            </P>
            <H2 reveal>{item.title}</H2>
            <P reveal className="max-w-xl">
              {item.text}
            </P>
          </div>
        ))}
      </div>
    </section>
  )
}
