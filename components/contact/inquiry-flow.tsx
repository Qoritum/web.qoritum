"use client"

import { useRef, useState } from "react"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { H2, H3 } from "@/components/typography/heading"
import { P } from "@/components/typography/description"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ContactForm } from "./contact-form"
import {
  inquiryQuestions,
  inquirySchema,
  inquiryRecommendation,
  inquiryLabel,
  type InquiryAnswers,
} from "./inquiry-schema"
import { trackEvent } from "@/lib/marketing"

export function InquiryFlow() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<InquiryAnswers>>({})
  const started = useRef(false)
  const completed = useRef(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const question = inquiryQuestions[step]
  const parsed = inquirySchema.safeParse(answers)
  const recommendation = parsed.success
    ? inquiryRecommendation(parsed.data)
    : undefined
  const labels = [...inquiryQuestions.map((item) => item.label), "Contacto"]
  function move(next: number) {
    setStep(next)
    requestAnimationFrame(() =>
      titleRef.current?.focus({ preventScroll: true })
    )
  }
  function select(value: string) {
    if (!question) return
    if (!started.current) {
      started.current = true
      trackEvent("qualification_start", { form_id: "inquiry" })
    }
    setAnswers((previous) => ({ ...previous, [question.id]: value }))
  }
  function next() {
    if (!question || !answers[question.id]) return
    trackEvent("qualification_step", {
      form_id: "inquiry",
      step_id: question.id,
      option_id: answers[question.id],
    })
    if (step === 2 && parsed.success && !completed.current) {
      completed.current = true
      trackEvent("qualification_complete", {
        form_id: "inquiry",
        goal_id: parsed.data.goal,
        timeline_id: parsed.data.timeline,
      })
    }
    move(step + 1)
  }
  return (
    <div>
      <div className="mb-10">
        <P className="mb-5 font-mono text-primary">Tu siguiente paso</P>
        <H2 reveal>Encuentra tu punto de partida.</H2>
        <P className="max-w-xl">
          Tres preguntas para orientar la conversación. Después podrás preparar
          tu consulta con un resumen de lo que necesitas.
        </P>
      </div>
      <ol
        aria-label="Pasos de la consulta"
        className="mb-5 grid grid-cols-4 gap-2"
      >
        {labels.map((label, index) => (
          <li
            key={label}
            aria-current={step === index ? "step" : undefined}
            className="flex flex-col gap-2 font-mono text-xs text-foreground/40 sm:text-sm"
          >
            <span
              className={`flex size-7 items-center justify-center border ${index <= step ? "border-primary bg-primary/10 text-foreground" : ""}`}
            >
              {index < step ? <Check className="size-4" /> : index + 1}
            </span>
            <span className={index === step ? "text-foreground" : ""}>
              {label}
            </span>
          </li>
        ))}
      </ol>
      <Progress
        value={((step + 1) / 4) * 100}
        aria-label={`Paso ${step + 1} de 4`}
        className="mb-10 h-1"
      />
      <div
        ref={titleRef}
        tabIndex={-1}
        className="outline-none"
        aria-live="polite"
      >
        {question ? (
          <div key={question.id}>
            <H3 reveal id="inquiry-question">
              {question.title}
            </H3>
            <P className="mb-8">{question.help}</P>
            <RadioGroup
              aria-labelledby="inquiry-question"
              value={answers[question.id] ?? ""}
              onValueChange={select}
              className="gap-4"
            >
              {question.options.map((option) => (
                <Label
                  key={option.id}
                  htmlFor={`inquiry-${option.id}`}
                  className="flex cursor-pointer items-start gap-4 border bg-card/50 p-5 transition-colors hover:border-primary/50 has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5"
                >
                  <RadioGroupItem
                    id={`inquiry-${option.id}`}
                    value={option.id}
                    className="mt-1"
                  />
                  <span className="min-w-0">
                    <P className="font-medium text-foreground">
                      {option.label}
                    </P>
                    <P className="mt-2 text-foreground/60">{option.detail}</P>
                  </span>
                </Label>
              ))}
            </RadioGroup>
          </div>
        ) : parsed.success && recommendation ? (
          <div>
            <H3 reveal>Preparemos la conversación.</H3>
            <div className="my-8 border-l-2 border-primary bg-primary/5 p-5">
              <P className="font-medium text-foreground">
                {recommendation.title}
              </P>
              <P className="mt-3">{recommendation.text}</P>
              <dl className="mt-6 space-y-3">
                {inquiryQuestions.map((item) => (
                  <div key={item.id}>
                    <dt className="font-mono text-sm text-foreground/50">
                      {item.label}
                    </dt>
                    <dd className="mt-1">
                      <P>{inquiryLabel(item.id, parsed.data[item.id])}</P>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        ) : null}
      </div>
      {parsed.success && recommendation && (
        <div hidden={step !== 3}>
          <ContactForm
            brief={parsed.data}
            initialImprovement={recommendation.improvement}
            formId="inquiry"
          />
        </div>
      )}
      <div className="mt-8 flex items-center justify-between gap-4">
        <Button
          variant="ghost"
          disabled={step === 0}
          onClick={() => move(step - 1)}
        >
          <ArrowLeft />
          Volver
        </Button>
        {step < 3 && (
          <Button disabled={!question || !answers[question.id]} onClick={next}>
            Continuar <ArrowRight />
          </Button>
        )}
      </div>
    </div>
  )
}
