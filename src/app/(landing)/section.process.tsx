import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const processSteps = [
  {
    number: "01",
    title: "Diagnóstico Estratégico",
    description:
      "Analizamos tus procesos, tecnología y metas. Identificamos desafíos ocultos y trazamos una visión clara para tu transformación digital.",
    icon: "/material-symbols-search.svg",
  },
  {
    number: "02",
    title: "Plan de Ruta",
    description:
      "Creamos un plan de acción pragmático y detallado. Priorizamos iniciativas de alto impacto, marcando un camino seguro hacia el crecimiento.",
    icon: "/hugeicons-maps-location-01.svg",
  },
  {
    number: "03",
    title: "Implementación Ágil",
    description:
      "Ejecutamos soluciones de forma iterativa y colaborativa. Entregamos valor constante y medible, sin interrumpir tus operaciones diarias.",
    icon: "/iconoir-spark-solid.svg",
  },
  {
    number: "04",
    title: "Capacitación y Adopción",
    description:
      "Tu equipo es clave para el éxito. Aseguramos la adopción total de herramientas, fomentando una mentalidad de innovación continua.",
    icon: "/fluent-people-12-regular.svg",
  },
  {
    number: "05",
    title: "Medición y Optimización",
    description:
      "El éxito se mide con datos. Establecemos KPIs claros y analizamos resultados para el retorno de inversión, refinando las soluciones.",
    icon: "/solar-graph-new-linear.svg",
  },
  {
    number: "06",
    title: "Soporte y Evolución",
    description:
      "Nuestra relación no termina con la implementación. Ofrecemos soporte y exploramos nuevas oportunidades para estar a la vanguardia.",
    icon: "/ri-space-ship-line.svg",
  },
];

export function Process() {
  return (
    <section className="rounded-4xl bg-secondary py-25">
      <div className="container-screen-xl grid grid-cols-2">
        <div>
          <div className="**:text-white sticky top-20">
            <h2 className="capitalize text-6xl text-balance mb-12 font-bold">
              {" "}
              Nuestro proceso de transformación{" "}
            </h2>
            <p className="opacity-80">
              {" "}
              Seis etapas diseñadas para generar valor real, <br /> medible y
              sostenible en tu negocio.
            </p>
            <div className="h-50" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-12 flex-1">
          {processSteps.map((step, index) => (
            <Card
              key={index}
              className={cn("w-full bg-background rounded-3xl shadow-2xl")}
            >
              <CardContent className="flex flex-col items-start gap-2.5 p-8">
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-primary text-6xl font-arboria">
                    {step.number}
                  </span>
                  <div className="size-14 border-accent border-2" />
                </div>

                <h3 className="font-bold text-3xl ">{step.title}</h3>

                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

