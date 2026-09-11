"use client"

import { useState, type ComponentProps } from "react"
import NumberInput, {
  type Country,
  type Value,
} from "react-phone-number-input/input"
import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js"
import flags from "react-phone-number-input/flags"
import labels from "react-phone-number-input/locale/es.json"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "cn"

const COUNTRIES = getCountries()
  .map((country) => ({
    country,
    label: labels[country],
    dial: getCountryCallingCode(country),
  }))
  .sort((a, b) =>
    a.country === "PE"
      ? -1
      : b.country === "PE"
        ? 1
        : a.label.localeCompare(b.label, "es")
  )

type PhoneInputProps = Omit<
  ComponentProps<typeof Input>,
  "value" | "defaultValue" | "onChange" | "type"
> & {
  value?: Value
  country: Country
  onValueChange: (value?: Value) => void
  onCountryChange: (country: Country) => void
}

function CountryFlag({ country }: { country: Country }) {
  const Flag = flags[country]
  return (
    <span
      aria-hidden="true"
      className="inline-flex w-5 sm:w-7 shrink-0 overflow-hidden rounded-xs [&_svg]:size-4! sm:[&_svg]:size-5! md:[&_svg]:size-7!"
    >
      {Flag && <Flag title={labels[country]} />}
    </span>
  )
}

// Formatting is delegated to the phone library; all visible controls are the
// project's shadcn components. No third-party CSS or platform-dependent emoji.
export function PhoneInput({
  value,
  country,
  onValueChange,
  onCountryChange,
  disabled,
  ...props
}: PhoneInputProps) {
  const [open, setOpen] = useState(false)

  function selectCountry(next: Country) {
    const national = value
      ? parsePhoneNumberFromString(value)?.nationalNumber
      : undefined
    onCountryChange(next)
    if (national)
      onValueChange(`+${getCountryCallingCode(next)}${national}` as Value)
    setOpen(false)
  }

  return (
    <div className="flex min-w-0 items-center gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            disabled={disabled}
            role="combobox"
            aria-expanded={open}
            aria-label={`País del teléfono: ${labels[country]} (+${getCountryCallingCode(country)})`}
            className="aria-expanded:bg-tanspared border-x-0 border-t-0 text-sm sm:text-base md:text-lg h-14 px-1 hover:bg-transparent"
          >
            <CountryFlag country={country} />+{getCountryCallingCode(country)}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="center" className="p-0 w-72 sm:w-90">
          <Command>
            <CommandInput
              placeholder="Buscar país o prefijo…"
              aria-label="Buscar país o prefijo"
            />
            <CommandList>
              <CommandEmpty>No encontramos ese país.</CommandEmpty>
              <CommandGroup>
                {COUNTRIES.map((option) => (
                  <CommandItem
                    key={option.country}
                    value={`${option.label} ${option.country} +${option.dial}`}
                    keywords={[
                      option.label
                        .normalize("NFD")
                        .replace(/\p{Diacritic}/gu, ""),
                    ]}
                    onSelect={() => selectCountry(option.country)}
                    className={cn(country === option.country && "bg-primary/20", "px-2")}
                    withCheck={false}
                  >
                    {country === option.country && <Check className="size-3.5 sm:size-4.5 md:size-6" aria-hidden="true" />}
                    <CountryFlag country={option.country} />
                    <span className="flex-1">{option.label}</span>
                    <span className="text-muted-foreground text-xs sm:text-sm text-right">
                      +{option.dial}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <NumberInput
        {...props}
        disabled={disabled}
        defaultCountry={country}
        value={value}
        inputComponent={Input}
        smartCaret={false}
        onChange={(next) => {
          const parsed = next ? parsePhoneNumberFromString(next) : undefined
          if (parsed?.country && parsed.country !== country)
            onCountryChange(parsed.country)
          onValueChange(next)
        }}
      />
    </div>
  )
}
