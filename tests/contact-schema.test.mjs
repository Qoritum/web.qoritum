import assert from "node:assert/strict"
import test from "node:test"
import { contactSchema } from "../components/contact/contact-schema.ts"

const valid = {
  fullName: "  María Pérez  ", company: "Qoritum", email: "maria@example.com",
  country: "PE", phone: "964 228 584", sector: "Agroexportación",
  improvement: "Automatización de procesos",
  details: "Queremos automatizar el control de nuestro almacén.", consent: true,
}

test("trims text and normalizes the national phone number", () => {
  const result = contactSchema.parse(valid)
  assert.equal(result.fullName, "María Pérez")
  assert.equal(result.phone, "+51964228584")
})

test("phone is optional, but punctuation alone is not a phone", () => {
  assert.equal(contactSchema.safeParse({ ...valid, phone: "" }).success, true)
  for (const phone of ["---", "abc", "123", "1234567890123456"]) {
    assert.equal(contactSchema.safeParse({ ...valid, phone }).success, false, phone)
  }
})

test("accepts a Peruvian landline with area code and international national numbers", () => {
  assert.equal(contactSchema.safeParse({ ...valid, phone: "(01) 234-567" }).success, true)
  assert.equal(contactSchema.safeParse({ ...valid, country: "US", phone: "(415) 555-1234" }).success, true)
  assert.equal(contactSchema.safeParse({ ...valid, country: "XX" }).success, false)
})

test("rejects invalid email, missing consent and unsupported options", () => {
  for (const patch of [{ email: "not-an-email" }, { consent: false }, { sector: "" }, { improvement: "unsupported" }, { details: "Too short" }]) {
    assert.equal(contactSchema.safeParse({ ...valid, ...patch }).success, false)
  }
})

test("returns field-specific issues for an empty form", () => {
  const result = contactSchema.safeParse({ fullName: "", company: "", email: "", country: "PE", phone: "", sector: "", improvement: "", details: "", consent: false })
  assert.equal(result.success, false)
  assert.deepEqual(new Set(result.error.issues.map(issue => issue.path[0])), new Set(["fullName", "company", "email", "sector", "improvement", "details", "consent"]))
})

test("normalizes international phones and rejects a mismatched calling code", () => {
  assert.equal(contactSchema.parse({ ...valid, phone: "+51 964 228 584" }).phone, "+51964228584")
  assert.equal(contactSchema.parse({ ...valid, country: "ES", phone: "612 34 56 78" }).phone, "+34612345678")
  assert.equal(contactSchema.safeParse({ ...valid, country: "ES", phone: "+51 964 228 584" }).success, false)
})
