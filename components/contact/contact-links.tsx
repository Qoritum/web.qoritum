import { Mail, MessageCircle, Phone } from "lucide-react"
import { P } from "@/components/typography/description"
import { site } from "@/lib/site"

export function ContactLinks({ showPhone = false }: { showPhone?: boolean }) {
  const links = [
    {
      title: "Escríbenos",
      label: site.phoneDisplay,
      href: site.whatsapp,
      channel: "whatsapp",
      icon: MessageCircle,
      external: true,
    },
    {
      title: "Correo corporativo",
      label: site.email,
      href: `mailto:${site.email}`,
      channel: "email",
      icon: Mail,
      external: false,
    },
    ...(showPhone
      ? [
          {
            title: "Conversemos",
            label: site.phoneDisplay,
            href: `tel:${site.phone}`,
            channel: "phone",
            icon: Phone,
            external: false,
          },
        ]
      : []),
  ]
  return (
    <ul className="flex flex-col gap-7">
      {links.map(({ title, label, href, channel, icon: Icon, external }) => (
        <li key={channel}>
          <a
            href={href}
            data-track="contact_click"
            data-channel={channel}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
            className="group flex w-fit items-center gap-5 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary"
          >
            <Icon
              strokeWidth={1.5}
              className="size-7 shrink-0 transition-colors group-hover:text-primary"
            />
            <div className="flex min-w-0 flex-col gap-2">
              <P className="font-mono">{title}</P>
              <P className="break-all transition-colors group-hover:text-primary">
                {label}
              </P>
            </div>
          </a>
        </li>
      ))}
    </ul>
  )
}
