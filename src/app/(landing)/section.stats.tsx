import React from "react";

const features = [
  {
    title: "100%",
    subtitle: "Consultoría estratégica",
  },
  {
    title: "Sin compromiso",
    subtitle: "Diagnóstico gratuito",
  },
  {
    title: "Acompañamiento",
    subtitle: "Post-implementación",
  },
];

export const Stats = (): React.JSX.Element => {
  return (
    <section className="py-12 bg-accent/20 font-questrial sm:my-8">
      <div className="mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-[121px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-2.5"
            >
              <h3 className=" text-primary text-2xl sm:text-4xl">
                {feature.title}
              </h3>
              <p className="sm:text-xl opacity-60">{feature.subtitle}</p>
            </div>
          ))}
        </div>
        <span className="sr-only">
          <span> Zeew Space </span> | <span> Neenbyss </span>
        </span>
      </div>
    </section>
  );
};

