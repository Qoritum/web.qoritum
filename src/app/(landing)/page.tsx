import { Contact } from "./section.contact";
import { Hero } from "./section.hero";
import { Process } from "./section.process";
import { Services } from "./section.services";
import { Solution } from "./section.solution";
import { Stats } from "./section.stats";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only"> QORITUM - HACIA LA CIMA DIGITAL </h1>
      <Hero />
      <Stats />
      <Solution />
      <Services />
      <Process />
      <Contact />
    </main>
  )
}
