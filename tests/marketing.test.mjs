import assert from "node:assert/strict"
import test from "node:test"
import { parseConsent, trackEvent, marketing } from "../lib/marketing.ts"

test("missing, malformed, expired or unknown consent is never accepted", () => {
  for (const value of [null, "", "invalid", "{}", JSON.stringify({version: 2, analytics: true, advertising: true, expires: Date.now()+10000}), JSON.stringify({version: 1, analytics: true, advertising: true, expires: 1}), JSON.stringify({version: 1, analytics: "true", advertising: false, expires: Date.now()+10000})]) assert.equal(parseConsent(value), null)
})
test("consent preserves independent analytics and advertising choices", () => {
  const value={version:1,analytics:true,advertising:false,expires:Date.now()+10000}
  assert.deepEqual(parseConsent(JSON.stringify(value)),value)
})
test("server-side event calls do not execute browser tracking", () => {
  assert.doesNotThrow(()=>trackEvent("form_validated",{form_id:"contact"}))
})
test("missing measurement IDs do not produce placeholder IDs", () => {
  if (!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) assert.equal(marketing.google,undefined)
  if (!process.env.NEXT_PUBLIC_META_PIXEL_ID) assert.equal(marketing.meta,undefined)
  if (!process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID) assert.equal(marketing.tiktok,undefined)
})

