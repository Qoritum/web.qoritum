import { InstagramIcon } from "@/components/icons/instagram";
import { LinkedinIcon } from "@/components/icons/linkedin";
import { TiktokIcon } from "@/components/icons/tiktok";
// import { TwitterIcon } from "@/components/icons/twitter";
//import { DiscordIcon } from "@/components/icons/discord";
import { FacebookIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

// https://x.com/qoritumitd
export const Social = [
  /** 
  {
    icon: <DiscordIcon />,
    href: "https://discord.gg/zeewspace",
    label: "Discord",
  },
  */
  {
    icon: <TiktokIcon />,
    href: "https://www.tiktok.com/@qoritum",
    label: "TikTok",
  },
  {
    icon: <InstagramIcon />,
    href: "https://www.instagram.com/qoritum.itd",
    label: "Instagram",
  },
  {
    icon: <LinkedinIcon />,
    href: "https://www.linkedin.com/company/qoritum ",
    label: "LinkedIn",
  },
  {
    icon: <FacebookIcon />,
    href: "https://www.facebook.com/people/Qoritum-ITD/61582091489210/",
    label: "Facebook",
  },
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

export const CallToAction =
  "https://api.whatsapp.com/send/?phone=51924001129&text&type=phone_number&app_absent=0";
