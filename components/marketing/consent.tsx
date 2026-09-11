"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { P } from "@/components/typography/description"
import {
  CONSENT_EVENT,
  CONSENT_KEY,
  hasMarketing,
  parseConsent,
  type Consent,
} from "@/lib/marketing"

let memory: string | null = null
function snapshot() {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return memory
  }
}
function subscribe(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== CONSENT_KEY && event.key !== null) return
    const before = parseConsent(event.oldValue)
    const after = parseConsent(event.newValue)
    if (
      (before?.analytics && !after?.analytics) ||
      (before?.advertising && !after?.advertising) ||
      event.key === null
    ) {
      clearMeasurementCookies()
      window.location.reload()
    } else listener()
  }
  window.addEventListener(CONSENT_EVENT, listener)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener(CONSENT_EVENT, listener)
    window.removeEventListener("storage", onStorage)
  }
}
const ConsentContext = createContext<{
  consent: Consent | null
  openPreferences: () => void
} | null>(null)

export function useConsent() {
  const value = useContext(ConsentContext)
  if (!value) throw new Error("useConsent must be used within ConsentProvider")
  return value
}

function clearMeasurementCookies() {
  // Clear accessible first-party identifiers at host and parent-domain scope.
  const domains = window.location.hostname.split(".")
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim()
    if (!/^(_ga|_gid|_gat|_gcl_|_fbp|_fbc|_ttp|ttcsid)/.test(name)) continue
    document.cookie = `${name}=; Max-Age=0; path=/`
    for (let i = 0; i < domains.length - 1; i++)
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domains.slice(i).join(".")}`
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const raw = useSyncExternalStore(subscribe, snapshot, () => null)
  const consent = useMemo(() => parseConsent(raw), [raw])
  const [open, setOpen] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [advertising, setAdvertising] = useState(false)

  function openPreferences() {
    setAnalytics(consent?.analytics ?? false)
    setAdvertising(consent?.advertising ?? false)
    setOpen(true)
  }

  function save(analytics: boolean, advertising: boolean) {
    const next: Consent = {
      version: 1,
      analytics,
      advertising,
      expires: Date.now() + 180 * 24 * 60 * 60 * 1000,
    }
    memory = JSON.stringify(next)
    try {
      localStorage.setItem(CONSENT_KEY, memory)
    } catch {
      /* Keep this visit functional when storage is unavailable. */
    }
    window.dispatchEvent(new Event(CONSENT_EVENT))
    setOpen(false)
    if (
      (consent?.analytics && !analytics) ||
      (consent?.advertising && !advertising)
    ) {
      clearMeasurementCookies()
      // Unload already-executing SDKs, which cannot be undone by removing a tag.
      window.location.reload()
    }
  }

  return (
    <ConsentContext value={{ consent, openPreferences }}>
      {children}
      {hasMarketing && !consent && !open && (
        <aside
          aria-label="Preferencias de cookies"
          className="fixed inset-x-3 bottom-3 z-60 border border-border bg-background p-6 shadow-xl sm:left-auto sm:max-w-xl"
        >
          <P className="mb-3 font-heading">Tú decides qué compartes.</P>
          <P>
            Usamos cookies opcionales para entender el uso de la web y medir
            nuestras campañas. Puedes aceptarlas, rechazarlas o elegir por
            categoría.
          </P>
          <Link
            href="/cookies"
            className="mt-3 inline-block underline underline-offset-4"
          >
            Ver información de cookies
          </Link>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button onClick={() => save(true, true)}>Aceptar todas</Button>
            <Button variant="outline" onClick={() => save(false, false)}>
              Solo necesarias
            </Button>
            <Button variant="ghost" onClick={openPreferences}>
              Configurar
            </Button>
          </div>
        </aside>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90svh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preferencias de cookies</DialogTitle>
            <DialogDescription>
              Las categorías opcionales están desactivadas hasta que las
              autorices. Puedes cambiar tu decisión desde el footer.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label>Necesarias · siempre activas</Label>
              <P className="mt-2">
                Conservan tu elección de privacidad y permiten el funcionamiento
                del sitio.
              </P>
            </div>
            <div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="consent-analytics">Analítica</Label>
                <Switch
                  id="consent-analytics"
                  checked={analytics}
                  onCheckedChange={setAnalytics}
                />
              </div>
              <P className="mt-2">
                Google Analytics: visitas e interacciones para mejorar la web.
              </P>
            </div>
            <div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="consent-advertising">Publicidad</Label>
                <Switch
                  id="consent-advertising"
                  checked={advertising}
                  onCheckedChange={setAdvertising}
                />
              </div>
              <P className="mt-2">
                Meta y TikTok: medición de campañas y audiencias publicitarias.
              </P>
            </div>
          </div>
          <DialogFooter className="flex-wrap">
            <Button variant="outline" onClick={() => save(false, false)}>
              Rechazar opcionales
            </Button>
            <Button onClick={() => save(analytics, advertising)}>
              Guardar preferencias
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConsentContext>
  )
}

export function CookieSettingsButton() {
  const { openPreferences } = useConsent()
  return (
    <Button type="button" variant="link" onClick={openPreferences}>
      Preferencias de cookies
    </Button>
  )
}
