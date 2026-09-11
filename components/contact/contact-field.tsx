import type { ReactNode } from "react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import type { ContactField } from "./contact-schema"

export function ContactFieldControl({
  name,
  label,
  error,
  children,
}: {
  name: ContactField
  label: string
  error?: string
  children: ReactNode
}) {
  return (
    <Field data-invalid={Boolean(error)} className="min-w-0">
      <FieldLabel htmlFor={name} className="sr-only">
        {label}
      </FieldLabel>
      {children}
      <FieldError id={`${name}-error`}>{error}</FieldError>
    </Field>
  )
}
