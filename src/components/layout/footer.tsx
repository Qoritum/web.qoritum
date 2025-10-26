import {
  MailIcon,
  MapPinIcon,
  MessageSquareIcon,
  PhoneIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DiscordIcon } from "../icons/discord";
import { TiktokIcon } from "../icons/tiktok";
import { InstagramIcon } from "../icons/instagram";
import { LinkedinIcon } from "../icons/linkedin";
import { TwitterIcon } from "../icons/twitter";

const contactInfo = [
  {
    icon: MapPinIcon,
    title: "Encuentranos",
    content: "Lima, Perú",
    href: null,
  },
  {
    icon: PhoneIcon,
    title: "Teléfono",
    content: "+51 924 001 129",
    href: "https://wa.me/51924001129",
  },
  {
    icon: MailIcon,
    title: "Escríbenos",
    content: "contacto@qoritum.com",
    href: "mailto:contacto@qoritum.com",
  },
];

const footerLinks = [
  { text: "Términos Y Condiciones", href: "#" },
  { text: "Políticas de Privacidad", href: "#" },
];

const socials = [
  {
    icon: <DiscordIcon />,
    href: "https://discord.gg/zeewspace",
    label: "Discord",
  },
  {
    icon: <TiktokIcon />,
    href: "https://www.tiktok.com/@zeewspace",
    label: "TikTok",
  },
  {
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/zeewspace",
    label: "Instagram",
  },
  {
    icon: <LinkedinIcon />,
    href: "https://www.linkedin.com/company/zeewspace",
    label: "LinkedIn",
  },
  { icon: <TwitterIcon />, href: "https://x.com/zeewspace", label: "X" },
];

export const Footer = (): React.JSX.Element => {
  return (
    <footer className="flex flex-col w-full items-center justify-center bg-transparent mt-20 px-6">
      <div className="container-screen-2xl flex flex-col items-center px-8 py-16 gap-4 bg-secondary rounded-4xl">
        <h2 className="self-stretch [&_span]:font-arboria font-bold text-5xl text-center text-white">
          ¿Estás Listo Para
          <span className="text-[#e58621]">Impulsar Tu Negocio?</span>
        </h2>

        <p className="w-full max-w-xl text-white text-xl text-center">
          Un negocio merece estar ordenado, conectado y bajo control. Comencemos
          con un diagnóstico gratuito
        </p>

        <Button className="mt-5">
          Agenda tu diagnóstico gratuito
          <MessageSquareIcon className="w-6 h-6" />
        </Button>
      </div>

      <div className="flex flex-col w-full container-screen-2xl items-start gap-6 px-4 py-12">
        <div className="flex w-full max-w-4xl items-center justify-end gap-6">
          {contactInfo.map((item, index) => (
            <div key={index} className="flex items-center gap-2.5 flex-1">
              <item.icon className="w-9 h-9 text-[#e58621]" />
              <div className="flex flex-col items-start justify-center flex-1">
                <span className="text-primary font-bold font-arboria">
                  {item.title}
                </span>
                {item.href ? (
                  <a
                    className="text-lg hover:text-primary"
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {item.content}
                  </a>
                ) : (
                  <div className="text-lg">{item.content}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between self-stretch w-full">
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
              {socials.map(({href, icon, label}, i) => {
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

        <div className="flex items-start justify-between w-full">
          <span className="opacity-80 text-lg w-full">
            © 2025 QORITUM ITD — Todos los derechos reservados.
          </span>

          <div className="flex w-full items-center justify-end gap-6">
            {footerLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:opacity-100 opacity-70"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

