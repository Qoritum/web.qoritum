import { Hero } from "./section.hero";
import { Process } from "./section.process";
import { Solution } from "./section.solution";
import { Stats } from "./section.stats";

export default function Home() {
  return (
    <main>
      <h1 className="sr-only"> QORITUM - HACIA LA CIMA DIGITAL </h1>
      <Hero />
      <Stats />
      <Solution />
      <Process />
    </main>
  )
}
