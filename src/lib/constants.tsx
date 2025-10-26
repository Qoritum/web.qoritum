import { DiscordIcon } from "@/components/icons/discord";
import { InstagramIcon } from "@/components/icons/instagram";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { TiktokIcon } from "@/components/icons/tiktok";
import { TwitterIcon } from "@/components/icons/twitter";
import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

export const Social = [
  {
    icon: <DiscordIcon />,
    href: "https://discord.gg/zeewspace",
    label: "Discord",
  },
  {
    icon: <TiktokIcon />,
    href: "https://www.tiktok.com/@zeewspace",
    label: "TikTok",
  },
  {
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/zeewspace",
    label: "Instagram",
  },
  {
    icon: <LinkedinIcon />,
    href: "https://www.linkedin.com/company/zeewspace",
    label: "LinkedIn",
  },
  { icon: <TwitterIcon />, href: "https://x.com/zeewspace", label: "X" },
];

export const Contact = [
  {
    icon: MapPinIcon,
    title: "Encuentranos",
    content: "Lima, Perú",
    href: null,
  },
  {
    icon: PhoneIcon,
    title: "Teléfono",
    content: "+51 924 001 129",
    href: "https://wa.me/51924001129",
  },
  {
    icon: MailIcon,
    title: "Escríbenos",
    content: "contacto@qoritum.com",
    href: "mailto:contacto@qoritum.com",
  },
];

export const CallToAction = "https://api.whatsapp.com/send/?phone=51924001129&text&type=phone_number&app_absent=0"