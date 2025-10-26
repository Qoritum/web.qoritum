import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CallToAction } from "@/lib/constants";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="pt-15">
      <div className="flex flex-col items-start lg:flex-row gap-8 lg:items-end justify-between container-screen-2xl pb-4 pt-12 sm:pt-0 sm:pb-4 sm:py-16">
        <h2 className="text-5xl sm:text-6xl lg:text-8xl font-bold capitalize">
          {" "}
          Juntos hacia <br /> la{" "}
          <span className="text-primary font-arboria">cima digital</span>
        </h2>
        <p className="sr-only">
          Diseñamos soluciones digitales ajustadas a las necesidades de tu
          negocio para&nbsp;&nbsp;acelerar su transformación en la Industria
          4.0.
        </p>

        <div className="flex flex-col sm:flex-row-reverse justify-start lg:flex-col sm:items-end sm:gap-10 lg:gap-0">
          <div className="flex flex-col lg:items-end ">
            <span className="text-lg sm:text-2xl"> Sin Compromiso </span>
            <p className="sm:text-base opacity-60"> Resultados Garantizados </p>
          </div>

          <div className="flex items-center gap-2 mt-8">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="bg-accent/40 text-foreground-2 px-6"
            >
              <Link href="#services">Ver Servicios</Link>
            </Button>
            <Button asChild size="sm" className="px-8!">
              <Link href={CallToAction} target="_blank">
                Solicita tu Consulta <MessageSquare className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:px-8 mt-4 sm:mt-8">
        <div className="bg-[url(/HERO_BG.png)] overflow-clip lg:rounded-4xl bg-cover bg-center">
          <div className="bg-linear-to-b to-foreground from-foreground/0 px-6 lg:px-16 py-8">
            <div className="flex flex-col justify-between max-w-[1720px] mx-auto">
              <Badge className="backdrop-blur-[60px bg-[#FFF0BF] text-lg text-foreground rounded-sm">
                Consultoría Itd
              </Badge>

              <div className="h-30 sm:h-50 md:h-80" />

              <p className="text-white text-xl max-w-xl">
                Diseñamos soluciones digitales ajustadas a las necesidades de tu
                negocio para&nbsp;&nbsp;acelerar su transformación en la
                Industria 4.0.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

