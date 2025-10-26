import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChartLine, MapPin, Rocket, Search, Sparkle, Users } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Diagnóstico Estratégico",
    description:
      "Analizamos tus procesos, tecnología y metas. Identificamos desafíos ocultos y trazamos una visión clara para tu transformación digital.",
    icon: <Search />,
  },
  {
    number: "02",
    title: "Plan de Ruta",
    description:
      "Creamos un plan de acción pragmático y detallado. Priorizamos iniciativas de alto impacto, marcando un camino seguro hacia el crecimiento.",
    icon: <MapPin />,
  },
  {
    number: "03",
    title: "Implementación Ágil",
    description:
      "Ejecutamos soluciones de forma iterativa y colaborativa. Entregamos valor constante y medible, sin interrumpir tus operaciones diarias.",
    icon: <Sparkle />,
  },
  {
    number: "04",
    title: "Capacitación y Adopción",
    description:
      "Tu equipo es clave para el éxito. Aseguramos la adopción total de herramientas, fomentando una mentalidad de innovación continua.",
    icon: <Users />,
  },
  {
    number: "05",
    title: "Medición y Optimización",
    description:
      "El éxito se mide con datos. Establecemos KPIs claros y analizamos resultados para el retorno de inversión, refinando las soluciones.",
    icon: <ChartLine />,
  },
  {
    number: "06",
    title: "Soporte y Evolución",
    description:
      "Nuestra relación no termina con la implementación. Ofrecemos soporte y exploramos nuevas oportunidades para estar a la vanguardia.",
    icon: <Rocket />,
  },
];

export function Process() {
  return (
    <section id="process" className="sm:rounded-4xl bg-secondary py-25">
      <div className="container-screen-xl grid md:grid-cols-2 gap-10">
        <div>
          <div className="**:text-white sticky top-20">
            <h2 className="capitalize text-3xl md:text-5xl lg:text-6xl text-balance mb-4 md:mb-12 font-bold">
              {" "}
              Nuestro proceso de transformación{" "}
            </h2>
            <p className="opacity-80">
              {" "}
              Seis etapas diseñadas para generar valor real, <br /> medible y
              sostenible en tu negocio.
            </p>
            <div className="md:h-50" />
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 sm:gap-12 flex-1 mt-15 md:mt-0">
          {processSteps.map((step, index) => (
            <Card
              key={index}
              className={cn("w-full bg-background rounded-3xl shadow-2xl")}
            >
              <CardContent className="flex flex-col items-start gap-2.5 p-4.5 lg:p-8">
                <div className="flex items-center justify-between w-full [&_svg]:size-10 [&_svg]:text-accent">
                  <span className="font-bold text-primary text-4xl lg:text-6xl font-arboria">
                    {step.number}
                  </span>
                  {step.icon}
                </div>

                <h3 className="font-bold text-2xl lg:text-3xl ">{step.title}</h3>

                <p>{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

