"use client"

import Script from "next/script"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useConsent } from "./consent"
import {
  marketing,
  TRACK_EVENT,
  type EventParameters,
  type MarketingEvent,
} from "@/lib/marketing"

// Vendor bootstraps run only after the matching consent category is granted.
// No noscript pixels: they would bypass the visitor's consent.
const googleBootstrap = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){dataLayer.push(arguments)};
  gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  gtag('js', new Date());
  gtag('config','${marketing.google}',{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false});
`
const metaBootstrap = `
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
  (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('consent','grant');
  fbq('set','autoConfig',false,'${marketing.meta}');
  fbq('init','${marketing.meta}');
`
const tiktokBootstrap = `
  !function(w,d,t){
    w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
    ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
    ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
    for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
    ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
    ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;
      ttq._o=ttq._o||{};ttq._o[e]=n||{};
      var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
      var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
    ttq.load('${marketing.tiktok}');
  }(window,document,'ttq');
`

function analyticsPage() {
  // No raw query strings, hash, email, phone, names or form text.
  const page = {
    page_location: location.origin + location.pathname,
    page_title: document.title,
    page_referrer: "",
  }
  try {
    if (document.referrer)
      page.page_referrer = new URL(document.referrer).origin
  } catch {
    /* Ignore invalid referrers. */
  }
  const campaign: Record<string, string> = {}
  const search = new URLSearchParams(location.search)
  for (const [query, key] of Object.entries({
    utm_source: "campaign_source",
    utm_medium: "campaign_medium",
    utm_campaign: "campaign_name",
    utm_id: "campaign_id",
    utm_content: "campaign_content",
    utm_term: "campaign_term",
  })) {
    const value = search.get(query)
    if (value && /^[\w .-]{1,100}$/.test(value)) campaign[key] = value
  }
  return { ...page, ...campaign }
}

export function Tracking() {
  const { consent } = useConsent()
  const pathname = usePathname()
  const [googleReady, setGoogleReady] = useState(false)
  const [metaReady, setMetaReady] = useState(false)
  const [tiktokReady, setTiktokReady] = useState(false)
  const lastPage = useRef<Record<string, string>>({})

  useEffect(() => {
    if (
      consent?.analytics &&
      googleReady &&
      lastPage.current.google !== pathname
    ) {
      window.gtag?.("event", "page_view", analyticsPage())
      lastPage.current.google = pathname
    }
    if (
      consent?.advertising &&
      metaReady &&
      lastPage.current.meta !== pathname
    ) {
      window.fbq?.("track", "PageView")
      lastPage.current.meta = pathname
    }
    if (
      consent?.advertising &&
      tiktokReady &&
      lastPage.current.tiktok !== pathname
    ) {
      window.ttq?.page()
      lastPage.current.tiktok = pathname
    }
  }, [pathname, consent, googleReady, metaReady, tiktokReady])

  useEffect(() => {
    function send(name: MarketingEvent, params: EventParameters) {
      const safe = Object.fromEntries(
        Object.entries(params).filter(
          ([key, value]) =>
            ["channel", "service_id", "form_id", "event_id"].includes(key) &&
            typeof value === "string" &&
            /^[a-zA-Z0-9_-]{1,100}$/.test(value)
        )
      )
      if (consent?.analytics && googleReady) window.gtag?.("event", name, safe)
      if (!consent?.advertising) return
      if (name === "form_start" || name === "form_validated") return // Preview actions are not conversions.
      const adName =
        name === "generate_lead"
          ? "Lead"
          : name === "select_service"
            ? "ViewContent"
            : "ContactLinkClick"
      if (metaReady)
        window.fbq?.(
          name === "contact_click" ? "trackCustom" : "track",
          adName,
          safe,
          safe.event_id ? { eventID: safe.event_id } : undefined
        )
      if (tiktokReady)
        window.ttq?.track(
          name === "generate_lead" ? "SubmitForm" : adName,
          safe,
          safe.event_id ? { event_id: safe.event_id } : undefined
        )
    }
    function onTrack(event: Event) {
      const detail = (
        event as CustomEvent<{
          name: MarketingEvent
          parameters: EventParameters
        }>
      ).detail
      if (
        [
          "contact_click",
          "select_service",
          "form_start",
          "form_validated",
          "generate_lead",
        ].includes(detail?.name)
      )
        send(detail.name, detail.parameters ?? {})
    }
    function onClick(event: MouseEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-track]")
          : null
      if (target?.dataset.track === "contact_click")
        send("contact_click", { channel: target.dataset.channel })
      if (target?.dataset.track === "select_service")
        send("select_service", { service_id: target.dataset.service })
    }
    window.addEventListener(TRACK_EVENT, onTrack)
    document.addEventListener("click", onClick)
    return () => {
      window.removeEventListener(TRACK_EVENT, onTrack)
      document.removeEventListener("click", onClick)
    }
  }, [consent, googleReady, metaReady, tiktokReady])

  return (
    <>
      {consent?.analytics && marketing.google && (
        <>
          <Script
            id="qoritum-ga-config"
            strategy="afterInteractive"
            onReady={() => setGoogleReady(true)}
          >
            {googleBootstrap}
          </Script>
          <Script
            id="qoritum-ga-sdk"
            src={`https://www.googletagmanager.com/gtag/js?id=${marketing.google}`}
            strategy="afterInteractive"
          />
        </>
      )}
      {consent?.advertising && marketing.meta && (
        <Script
          id="qoritum-meta"
          strategy="afterInteractive"
          onReady={() => setMetaReady(true)}
        >
          {metaBootstrap}
        </Script>
      )}
      {consent?.advertising && marketing.tiktok && (
        <Script
          id="qoritum-tiktok"
          strategy="afterInteractive"
          onReady={() => setTiktokReady(true)}
        >
          {tiktokBootstrap}
        </Script>
      )}
    </>
  )
}
