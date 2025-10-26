'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import Link from "next/link";
import {
  Send,
  Mail,
  User,
  Phone,
  MessageSquareText,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

import { Contact as ContactInfo } from "@/lib/constants";

const formFields = [
  {
    label: "Dirección Email",
    placeholder: "Ingresa tu Email",
    icon: <Mail />,
    type: "input",
  },
  {
    label: "Nombres Completos",
    placeholder: "Tu Nombre",
    icon: <User />,
    type: "input",
  },
  {
    label: "Número de teléfono",
    placeholder: "+51",
    icon: <Phone />,
    type: "input",
  },
  {
    label: "Asunto del mensaje",
    placeholder: "Asunto del mensaje",
    icon: <MessageSquareText />,
    type: "input",
  },
];

export const Contact = () => {
  return (
    <section id="contact" className="flex flex-col-reverse md:flex-row w-full justify-center gap-16 px-6 bg-accent/20 my-10 py-20">
      <h2 className="sr-only"> Contáctanos </h2>
      <div className="flex flex-col items-end gap-6 w-full">
        <Image
          src="/CONTACT_BG.png"
          alt="CONTACT"
          width={1250}
          height={1250}
          className="w-full h-150 rounded-3xl object-cover hidden md:block"
        />

        <div className="flex flex-col xl:flex-row w-full items-end xl:items-center justify-end gap-3 xl:gap-6">
          {ContactInfo.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 w-full xl:w-fit p-4 bg-background rounded-xl"
            >
              <item.icon className="size-9 text-[#e58621]" />
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
      </div>

      <div className="md:py-20 w-full xl:w-[70%]">
        <form className="md:max-w-lg">
          <h3 className="font-bold text-4xl mb-8">Comunícate Con Nosotros</h3>
          <div className="flex flex-col gap-4">
            {formFields.map((field, index) => (
              <label key={index}>
                {field.label}
                <InputGroup>
                  <InputGroupInput placeholder={field.placeholder} />
                  <InputGroupAddon>{field.icon}</InputGroupAddon>
                </InputGroup>
              </label>
            ))}

            <label>
              Mensaje
              <InputGroup className="overflow-clip">
                <InputGroupTextarea
                  placeholder={"Describe de que podemos hacer por ti..."}
                  className="max-h-40"
                />
              </InputGroup>
            </label>

            <label className="flex items-start gap-3">
              <Checkbox />
              <span className="select-none text-balance">
                Al enviar un mensaje estás aceptado nuestras
                <Link href="#" className="text-primary">
                  {" "}
                  políticas de privacidad
                </Link>
              </span>
            </label>

            <Button>
              Enviar
              <Send />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

