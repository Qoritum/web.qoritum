import React from "react";
import Image from "next/image";

const features = [
  {
    title: "Compromiso Profesional",
    description:
      "Cumplimos cada entrega con rigor técnico y responsabilidad real.  Documentamos, probamos y entregamos con estándares verificables.",
  },
  {
    title: "Soluciones a medida",
    description:
      "Diseñamos arquitectura, flujos y sistemas adaptados a la operación  real de tu negocio. Nada genérico, todo alineado a tus procesos y objetivos.",
  },
  {
    title: "Acompañamiento continuo",
    description:
      "Estás acompañado de principio a fin: diagnóstico, desarrollo y  evolución. Reportes, comunicación directa y soporte garantizado en cada fase.",
  },
  {
    title: "Transparencia comercial",
    description:
      "Presupuestos claros, métricas visibles y decisiones justificadas.  Tu inversión se gestiona con la misma seriedad que un proyecto interno.",
  },
];

export const Solution = () => {
  return (
    <section className="relative py-24 flex flex-col lg:flex-row w-full justify-center gap-12 container-screen-2xl">
      <div className="w-full">
        <h2 className="font-bold text-3xl md:text-5xl lg:text-6xl mb-8">Proceso de Solución</h2>

        <div className="flex flex-col items-start gap-12 relative self-stretch w-full flex-[0_0_auto]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col w-full max-w-[536px] items-start gap-2.5 relative flex-[0_0_auto] rounded-[18px]"
            >
              <h3 className="text-primary text-xl lg:text-2xl font-medium">
                {feature.title}
              </h3>

              <p className=" text-balance">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden w-full h-170 lg:mt-30 lg:flex items-start justify-end gap-2.5 lg:px-14 lg:py-12 rounded-3xl rounded-bl-3xl bg-[url('/SOLUTION-IMG.png')] bg-cover bg-center flex-col **:text-white">
        <div className="bg-secondary p-6 inline-flex flex-col items-end justify-center rounded-xl">
          <span className="font-bold text-2xl sm:text-5xl text-right"> +45 </span>
          <p> Clientes Activos</p>
        </div>

        <div className="bg-primary p-6 inline-flex flex-col items-end justify-center rounded-xl ml-14">
          <span className="font-bold text-2xl sm:text-5xl text-right"> 97% </span>
          <p className="text-end">
            {" "}
            Satisfacción <br /> Atención Al Cliente
          </p>
        </div>
      </div>

      <Image
        src="/SOLUTION-IMG.png"
        alt="SOLUCION"
        width={1250}
        height={1250}
        className="w-full h-80 object-cover block lg:hidden"
      />

      <div className="grid grid-cols-2 gap-8 lg:hidden">
        <div className="flex flex-col items-center">
          <span className="font-bold text-4xl sm:text-7xl text-right text-secondary">
            {" "}
            +45{" "}
          </span>
          <p className="text-center"> Clientes Activos</p>
        </div>

        <div className="flex flex-col items-center">
          <span className="font-bold text-4xl sm:text-7xl text-right text-primary">
            {" "}
            97%{" "}
          </span>
          <p className="text-center">
            {" "}
            Satisfacción <br /> Atención Al Cliente
          </p>
        </div>
      </div>
    </section>
  );
};

