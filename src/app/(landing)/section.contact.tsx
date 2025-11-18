"use client";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import Link from "next/link";
import { Send, Mail, User, Phone, MessageSquareText } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Contact as ContactInfo } from "@/lib/constants";
import { contactSchema, ContactSchemaType } from "@/lib/schemas/contact";
import { sendDiscordWebhookAction, sendEmailAction } from "@/service/contact";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export const Contact = () => {
  return (
    <section
      id="contact"
      className="flex flex-col-reverse md:flex-row w-full justify-center gap-16 px-6 bg-accent/20 my-10 py-20"
    >
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
                <span className="text-primary font-semibold font-arboria">
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
                  <span className="text-lg">{item.content}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="md:py-20 w-full xl:w-[70%]">
        <h3 className="font-semibold text-4xl mb-8 md:max-w-lg">
          Comunícate Con Nosotros
        </h3>
        <ContactForm />
      </div>
    </section>
  );
};

const initialData = {
  email: "",
  names: "",
  phone: "",
  asunto: "",
  message: "",
};

const formFields: {
  label: string;
  placeholder: string;
  icon: React.JSX.Element;
  type: string;
  name: keyof typeof initialData;
  required: boolean;
}[] = [
  {
    label: "Dirección Email",
    placeholder: "Ingresa tu Email",
    icon: <Mail />,
    type: "text",
    name: "email",
    required: true,
  },
  {
    label: "Nombres Completos",
    placeholder: "Tu Nombre",
    icon: <User />,
    type: "name",
    name: "names",
    required: true,
  },
  {
    label: "Número de teléfono",
    placeholder: "+51",
    icon: <Phone />,
    type: "phone",
    name: "phone",
    required: false,
  },
  {
    label: "Asunto del mensaje",
    placeholder: "Asunto del mensaje",
    icon: <MessageSquareText />,
    type: "text",
    name: "asunto",
    required: true,
  },
];

const ContactForm = () => {
  const [isTerms, setIsTerms] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<ContactSchemaType> = async (data) => {
    startTransition(async () => {
    const tId = toast.loading("Enviando…");
    try {
      const [dsc, em] = await Promise.allSettled([
        sendDiscordWebhookAction(data),
        sendEmailAction(data),
      ]);

      const ok =
        (dsc.status === "fulfilled" && dsc.value?.ok) ||
        (em.status === "fulfilled" && em.value?.ok);

      if (ok) {
        toast.success("Mensaje enviado", { id: tId });
        form.reset(initialData);
        setIsTerms(false);
      } else {
        toast.error("No se pudo enviar", { id: tId });
      }
    } catch {
      toast.error("No se pudo enviar", { id: tId });
    }
  });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="md:max-w-lg">
      <div className="flex flex-col gap-4">
        {formFields.map((field, index) => (
          <label key={index}>
            {field.label}{" "}
            {field.required && <span className="text-red-600">*</span>}
            <InputGroup>
              <InputGroupInput
                type={field.type}
                placeholder={field.placeholder}
                {...form.register(field.name, {
                  required: true,
                })}
              />
              <InputGroupAddon>{field.icon}</InputGroupAddon>
            </InputGroup>
            {Boolean(form.formState.errors.email) && (
              <span className="text-red-600 block mt-0.5 text-sm">
                {form.formState.errors[field.name]?.message}
              </span>
            )}
          </label>
        ))}

        <label>
          Mensaje <span className="text-red-600">*</span>
          <InputGroup className="overflow-clip">
            <InputGroupTextarea
              placeholder={"Describe de que podemos hacer por ti..."}
              {...form.register("message", {
                required: true,
              })}
              className="max-h-40"
            />
          </InputGroup>
          {Boolean(form.formState.errors.message) && (
            <span className="text-red-600 block mt-0.5 text-sm">
              {form.formState.errors.message?.message}
            </span>
          )}
        </label>

        <label className="flex items-start gap-3">
          <Checkbox onCheckedChange={(v) => setIsTerms(v as boolean)} />
          <span className="select-none text-balance">
            Al enviar este mensaje, confirmas que has leído y aceptas nuestras{" "}
            <Link
              href="/politicas-de-privacidad"
              className="text-primary hover:underline"
            >
              políticas de privacidad
            </Link>
            .
          </span>
        </label>

        <Button type="submit" disabled={!isTerms || isPending}>
          {isPending ? (
            <>
              <Spinner /> Enviando…
            </>
          ) : (
            "Enviar"
          )}
          <Send className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

