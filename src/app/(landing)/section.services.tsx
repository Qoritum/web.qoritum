import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { BrainCircuit, Code, Cpu, Handshake } from "lucide-react";

const servicesData = [
  {
    id: 1,
    title: "Consultoría ITD",
    description:
      "Diagnóstico digital, planificación de transformación, optimización de procesos y adopción de herramientas.",
    image: "/services/itd.png",
    icon: <Cpu />,
  },
  {
    id: 2,
    title: "Desarrollo E Integración",
    description:
      "Sistemas web a medida, integraciones con servicios externos y arquitectura en la nube.",
    image: "/services/dev.png",
    icon: <Code />,
  },
  {
    id: 3,
    title: "Comunicación Digital",
    description:
      "Branding, redes sociales, landing pages y automatización de marketing.",
    image: "/services/comunication.png",
    icon: <Handshake />,
  },
  {
    id: 4,
    title: "Ia Y Automatización",
    description:
      "Automatización de procesos, asistentes virtuales e integración de IA en flujos de trabajo.",
    image: "/services/ia.png",
    icon: <BrainCircuit />,
  },
];

export const Services = (): React.JSX.Element => {
  return (
    <section id="services" className="bg-accent/20 py-32">
      <div className="container-screen-2xl">
        <h2 className="font-semibold text-primary text-3xl md:text-6xl text-center mb-20">
          Nuestros Servicios
        </h2>

        <Carousel>
          <CarouselContent className="-ml-1 *:mr-4 [&>*:last-child]:mr-0">
            {servicesData.map((service, i) => {
              return (
                <CarouselItem
                  key={i}
                  className="bg-background p-4 rounded-3xl basis-full sm:basis-[65%] md:basis-[40%] lg:basis-[28%]"
                >
                  <Image
                    alt={`Service ${i}`}
                    src={service.image}
                    width={850}
                    height={850}
                    className="aspect-10/11 rounded-2xl object-cover"
                  />
                  <div className="mt-6 px-2">
                    <h3 className="flex items-center gap-2.5 text-2xl font-bold">
                      <div className="flex flex-col justify-center items-center size-10 rounded-lg bg-linear-to-t to-accent from-[#3556E6]/50 text-white">
                        {service.icon}
                      </div>
                      {service.title}
                    </h3>
                    <p className="mt-2 text-base opacity-90 leading-5">
                      {service.description}
                    </p>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="mt-12 flex items-center justify-end gap-2">
            <CarouselPrevious className="static size-10 bg-primary text-primary-foreground rounded-lg hover:scale-110 hover:opacity-90 hover:bg-primary" />
            <CarouselNext className="static size-10 bg-primary text-primary-foreground rounded-lg hover:scale-110 hover:opacity-90 hover:bg-primary" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

