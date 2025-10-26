import { WhatsAppIcon } from "../icons/whatsapp";

export function WhatsAppFixed() {
    return (
        <a className="size-20 bg-green-500 rounded-2xl shadow-2xl fixed bottom-10 right-10 z-10 flex items-center justify-center">
            <WhatsAppIcon className="text-white size-12" />
        </a>
    )
}