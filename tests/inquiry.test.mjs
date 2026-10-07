import assert from "node:assert/strict"
import test from "node:test"
import { inquirySchema, inquiryRecommendation, inquiryMessage } from "../components/contact/inquiry-schema.ts"
import { sanitizeEventParameters } from "../lib/marketing.ts"

test("qualification requires complete allowed answers", () => {
  assert.equal(inquirySchema.safeParse({goal:"automation",situation:"manual",timeline:"soon"}).success,true)
  assert.equal(inquirySchema.safeParse({goal:"automation"}).success,false)
  assert.equal(inquirySchema.safeParse({goal:"unknown",situation:"manual",timeline:"soon"}).success,false)
})
test("recommendation and handoff retain the client's chosen context", () => {
  const answers = inquirySchema.parse({goal:"automation",situation:"manual",timeline:"soon"})
  assert.equal(inquiryRecommendation(answers).improvement,"Automatización de procesos")
  const message=inquiryMessage({fullName:"Persona de prueba",company:"Empresa",email:"test@example.com",phone:"",sector:"Servicios",improvement:"Automatización de procesos",details:"Una consulta con información de prueba.",consent:true,country:"PE"},answers)
  assert(message.includes("Reducir tareas manuales"));assert(message.includes("Lo antes posible"));assert(message.includes("test@example.com"))
})
test("measurement includes controlled IDs and strips personal/free-form data", () => {
  assert.deepEqual(sanitizeEventParameters({form_id:"inquiry",step_id:"goal",option_id:"automation",email:"test@example.com",details:"private text",goal_id:"wrong value",project_id:"../secret"}),{form_id:"inquiry",step_id:"goal",option_id:"automation"})
})
