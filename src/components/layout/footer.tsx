import { MessageSquareIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import { CallToAction, Contact, Social } from "@/lib/constants";
import Link from "next/link";

const footerLinks = [
  { text: "Términos Y Condiciones", href: "/terms" },
  { text: "Políticas de Privacidad", href: "/police" },
];


export const Footer = (): React.JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-center justify-center bg-transparent md:px-6">
      <div className="md:container-screen-2xl flex flex-col items-center px-3 md:px-8 py-8 md:py-16 gap-4 bg-secondary md:rounded-4xl">
        <h2 className="self-stretch [&_span]:font-arboria font-bold text-3xl md:text-5xl text-center text-white">
          ¿Estás Listo Para{" "}
          <span className="text-[#e58621]">Impulsar Tu Negocio?</span>
        </h2>

        <p className="w-full max-w-xl text-white text-base md:text-xl text-center">
          Un negocio merece estar ordenado, conectado y bajo control. Comencemos
          con un diagnóstico gratuito
        </p>

        <Button asChild className="mt-5">
          <Link href={CallToAction} target="_blank">
            Agenda tu diagnóstico gratuito
            <MessageSquareIcon />
          </Link>
        </Button>
      </div>

      <div className="flex flex-col w-full container-screen-2xl items-start gap-6 px-4 py-12">
        <div className="flex flex-wrap md:flex-nowrap w-full max-w-4xl items-center justify-end gap-6">
          {Contact.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5 flex-1">
              <item.icon className="size-5 md:size-9 text-primary" />
              <div className="flex flex-col items-start justify-center flex-1">
                <span className="text-primary font-bold font-arboria">
                  {item.title}
                </span>
                {item.href ? (
                  <a
                    className="text-sm md:text-lg hover:text-primary text-nowrap"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.content}
                  </a>
                ) : (
                  <span className="text-sm md:text-lg text-nowrap">{item.content}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between self-stretch w-full">
          <div className="flex flex-col w-full max-w-xs items-start gap-2.5">
            <Image
              src="/qoritum_isotipo.png"
              alt="QORITUM"
              className="w-40 h-12 object-contain"
              width={500}
              height={500}
            />
            <p className="text-base">
              Diseñamos soluciones claras, medibles y sostenibles, con
              resultados en cada sprint.
            </p>
          </div>

          <div className="inline-flex flex-col items-end gap-2">
            <span className="text-primary font-bold font-arboria block">
              Síguenos
            </span>

            <div className="flex flex-wrap gap-3 mt-2">
              {Social.map(({ href, icon, label }, i) => {
                return (
                  <a
                    key={i}
                    href={href}
                    className="bg-accent/30 rounded-full flex items-center justify-center size-9 hover:scale-110 transition"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse md:flex-row items-start justify-between w-full">
          <span className="opacity-80 text-sm md:text-lg w-full">
            © {new Date().getFullYear()} QORITUM ITD — Todos los derechos reservados.
          </span>

          <div className="flex w-full items-center md:justify-end gap-6 mb-4 md:mb-0">
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="hover:opacity-100 opacity-70 underline text-primary md:text-foreground"
              >
                {link.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

