"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "../icons/whatsapp";
import { CallToAction, Social } from "@/lib/constants";
import { ExternalLink, MenuIcon } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "../ui/drawer";

const links = [
  { label: "Inicio", href: "#hero" },
  { label: "Servicios", href: "#services" },
  { label: "Proceso", href: "#process" },
  { label: "Contacto", href: "#contact" },
];

const filterSocial = Social.filter(
  (x) => x.label === "Instagram" || x.label === "LinkedIn"
);

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full h-16 md:h-20 flex items-center transition-transform duration-300 z-50 bg-background/90 backdrop-blur-xl",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="container-screen-2xl flex items-center justify-between">
        <nav className="flex items-center gap-4">
          <Link href="/" className="mr-4">
            <Image
              src="/qoritum_isotipo.png"
              alt="QORITUM"
              className="w-45 md:w-50 h-10 md:h-15 object-left object-contain"
              width={500}
              height={500}
            />
          </Link>
          {links.map(({ href, label }, i) => (
            <Link
              key={i}
              href={href}
              className="hover:text-primary font-questrial text-xl transition-colors hidden lg:block"
            >
              {label}
            </Link>
          ))}
        </nav>

        <nav className="flex items-center gap-3">
          <MenuMobile />

          {filterSocial.map(({ href, icon }, i) => {
            return (
              <a
                key={i}
                href={href}
                target="_blank"
                className="p-1.5 hover:scale-110 transition text-secondary hover:text-primary hidden lg:block"
              >
                {icon}
              </a>
            );
          })}

          <Button variant="secondary" asChild className="hidden sm:flex">
            <Link href={CallToAction} target="_blank">
              Agenda tu consulta <WhatsAppIcon />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

const MenuMobile = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="icon-sm" variant="ghost" className="flex lg:hidden">
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-start opacity-40">Menu</DrawerTitle>
          <DrawerDescription className="sr-only">
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-2 px-6 pb-4">
          {links.map(({ href, label }, i) => (
            <Link key={i} href={href} className="text-lg font-questrial py-2">
              {label} <span className="text-xs">#</span>
            </Link>
          ))}
          {filterSocial.map(({ href, icon, label }, i) => {
            return (
              <a
                key={i}
                href={href}
                target="_blank"
                className="flex items-center gap-2 py-2 [&_svg]:size-5 text-lg"
              >
                {icon}
                {label}
                <ExternalLink className="size-4!" />
              </a>
            );
          })}
          <Button
            size="sm"
            variant="secondary"
            asChild
            className="justify-start text-lg sm:hidden"
          >
            <Link href={CallToAction} target="_blank">
              <WhatsAppIcon /> Agenda tu consulta
            </Link>
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

