import { ServiceDetail } from "./service-detail"
import { SERVICES } from "@/lib/services"

export function Catalog() {
  return (
    <>
      {SERVICES.map((service, index) => (
        <ServiceDetail key={service.id} service={service} index={index} />
      ))}
    </>
  )
}
