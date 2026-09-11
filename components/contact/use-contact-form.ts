"use client"

import { useRef, useState, type FormEvent } from "react"
import { trackEvent } from "@/lib/marketing"
import type { Country, Value } from "react-phone-number-input/input"
import { contactSchema, type ContactField } from "./contact-schema"

export function useContactForm() {
  const started = useRef(false)
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>(
    {}
  )
  const [validated, setValidated] = useState(false)
  const [country, setCountry] = useState<Country>("PE")
  const [phone, setPhone] = useState<Value>()
  const [sector, setSector] = useState("")
  const [improvement, setImprovement] = useState("")
  const [consent, setConsent] = useState(false)

  function clearError(field: ContactField) {
    setValidated(false)
    setErrors((previous) => ({ ...previous, [field]: undefined }))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const result = contactSchema.safeParse({
      ...Object.fromEntries(new FormData(form)),
      country,
      phone: phone ?? "",
      sector,
      improvement,
      consent,
    })
    setValidated(false)
    if (!result.success) {
      const next: Partial<Record<ContactField, string>> = {}
      for (const issue of result.error.issues)
        next[issue.path[0] as ContactField] ??= issue.message
      setErrors(next)
      // Select and Checkbox render buttons; focus the visible control by ID.
      form.querySelector<HTMLElement>(`[id="${Object.keys(next)[0]}"]`)?.focus()
      return
    }
    setErrors({})
    // API pending. Connect result.data here; no request is made by this preview.
    setValidated(true)
    trackEvent("form_validated", { form_id: "contact" })
  }

  const fieldProps = (name: ContactField) => ({
    id: name,
    name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  })

  return {
    start: () => {
      if (!started.current) {
        started.current = true
        trackEvent("form_start", { form_id: "contact" })
      }
    },
    errors,
    validated,
    submit,
    fieldProps,
    clearError,
    country,
    phone,
    sector,
    improvement,
    consent,
    changeCountry: (value: Country) => {
      setCountry(value)
      clearError("country")
      clearError("phone")
    },
    changePhone: (value?: Value) => {
      setPhone(value)
      clearError("phone")
    },
    changeSector: (value: string) => {
      setSector(value)
      clearError("sector")
    },
    changeImprovement: (value: string) => {
      setImprovement(value)
      clearError("improvement")
    },
    changeConsent: (value: boolean | "indeterminate") => {
      setConsent(value === true)
      clearError("consent")
    },
  }
}
