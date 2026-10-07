"use client"

import { ArrowUpRight, Check, MessageCircle, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PhoneInput } from "@/components/ui/phone-input"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ContactFieldControl } from "./contact-field"
import { IMPROVEMENTS, SECTORS } from "./contact-schema"
import { useContactForm } from "./use-contact-form"
import type { InquiryAnswers } from "./inquiry-schema"
import { inquiryHandoff } from "./inquiry-handoff"
import { trackEvent } from "@/lib/marketing"

export function ContactForm({
  brief,
  initialImprovement,
  formId = "contact",
}: {
  brief?: InquiryAnswers
  initialImprovement?: string
  formId?: string
}) {
  const form = useContactForm({ initialImprovement, formId })
  const handoff = form.values ? inquiryHandoff(form.values, brief) : undefined
  return (
    <form
      noValidate
      onSubmit={form.submit}
      onFocusCapture={form.start}
      aria-label="Formulario de contacto"
      className={brief ? "pt-2" : "pt-2 lg:pt-16"}
    >
      <FieldGroup>
        <div className="grid items-start gap-6 sm:grid-cols-2">
          <ContactFieldControl
            name="fullName"
            label="Nombres y apellidos (obligatorio)"
            error={form.errors.fullName}
          >
            <Input
              {...form.fieldProps("fullName")}
              autoComplete="name"
              placeholder="Nombres y apellidos *"
              required
              maxLength={100}
              onChange={() => form.clearError("fullName")}
            />
          </ContactFieldControl>
          <ContactFieldControl
            name="company"
            label="Razón social (obligatorio)"
            error={form.errors.company}
          >
            <Input
              {...form.fieldProps("company")}
              autoComplete="organization"
              placeholder="Razón social *"
              required
              maxLength={150}
              onChange={() => form.clearError("company")}
            />
          </ContactFieldControl>
          <ContactFieldControl
            name="email"
            label="Correo electrónico (obligatorio)"
            error={form.errors.email}
          >
            <Input
              {...form.fieldProps("email")}
              type="email"
              autoComplete="email"
              placeholder="Correo electrónico *"
              required
              maxLength={254}
              onChange={() => form.clearError("email")}
            />
          </ContactFieldControl>
          <ContactFieldControl
            name="phone"
            label="Teléfono de contacto (opcional)"
            error={form.errors.phone}
          >
            <PhoneInput
              {...form.fieldProps("phone")}
              country={form.country}
              value={form.phone}
              onCountryChange={form.changeCountry}
              onValueChange={form.changePhone}
              autoComplete="tel"
              placeholder="Teléfono"
            />
          </ContactFieldControl>
        </div>
        {(
          [
            {
              name: "sector",
              label: "Sector",
              options: SECTORS,
              value: form.sector,
              onChange: form.changeSector,
            },
            {
              name: "improvement",
              label: "¿Qué te gustaría mejorar?",
              options: IMPROVEMENTS,
              value: form.improvement,
              onChange: form.changeImprovement,
            },
          ] as const
        ).map((field) => (
          <ContactFieldControl
            key={field.name}
            name={field.name}
            label={`${field.label} (obligatorio)`}
            error={form.errors[field.name]}
          >
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              required
            >
              <SelectTrigger
                {...form.fieldProps(field.name)}
                className="w-full"
              >
                <SelectValue placeholder={`${field.label} *`} />
              </SelectTrigger>
              <SelectContent position="popper">
                {field.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ContactFieldControl>
        ))}
        <ContactFieldControl
          name="details"
          label="Describe más detalles (obligatorio)"
          error={form.errors.details}
        >
          <Textarea
            {...form.fieldProps("details")}
            rows={4}
            required
            maxLength={2000}
            placeholder="Describe más detalles *"
            onChange={() => form.clearError("details")}
          />
        </ContactFieldControl>
        <Field data-invalid={Boolean(form.errors.consent)}>
          <div className="flex items-center gap-3">
            <Checkbox
              {...form.fieldProps("consent")}
              checked={form.consent}
              onCheckedChange={form.changeConsent}
              required
            />
            <FieldLabel
              htmlFor="consent"
              className="text-sm! sm:text-base! md:text-lg!"
            >
              Acepto las condiciones de contacto *
            </FieldLabel>
          </div>
          <FieldError id="consent-error">{form.errors.consent}</FieldError>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button type="button" variant="link">
                Leer condiciones
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <FieldDescription>
                Autorizo a Qoritum a utilizar los datos de este formulario para
                responder a mi consulta y contactarme sobre los servicios
                solicitados.
              </FieldDescription>
            </CollapsibleContent>
          </Collapsible>
        </Field>
        <div className="flex items-center justify-between gap-5">
          <FieldDescription>* Campos obligatorios</FieldDescription>
          <Button type="submit">
            Preparar consulta <ArrowUpRight data-icon="inline-end" />
          </Button>
        </div>
        <div role="status" aria-live="polite">
          {form.validated && handoff && (
            <div className="space-y-5 border-l-2 border-primary bg-primary/5 p-5">
              <FieldDescription className="flex items-start gap-2">
                <Check className="shrink-0" />
                Tu consulta está preparada. Elige WhatsApp o correo para
                compartirla con nuestro equipo; todavía no se ha enviado.
              </FieldDescription>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <a
                    href={handoff.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackEvent("lead_handoff", {
                        form_id: formId,
                        channel: "whatsapp",
                      })
                    }
                  >
                    <MessageCircle />
                    Abrir WhatsApp
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={handoff.email}
                    onClick={() =>
                      trackEvent("lead_handoff", {
                        form_id: formId,
                        channel: "email",
                      })
                    }
                  >
                    <Mail />
                    Abrir correo
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </FieldGroup>
    </form>
  )
}
