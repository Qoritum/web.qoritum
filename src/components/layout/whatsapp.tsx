import { CallToAction } from "@/lib/constants";
import { WhatsAppIcon } from "../icons/whatsapp";

export function WhatsAppFixed() {
    return (
        <a href={CallToAction} target="_blank" className="size-14 md:size-20 bg-green-500 rounded-2xl shadow-2xl fixed bottom-5 right-5 md:bottom-10 md:right-10 z-10 flex items-center justify-center">
            <WhatsAppIcon className="text-white size-10 md:size-12" />
        </a>
    )
}