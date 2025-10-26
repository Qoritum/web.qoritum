import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="h-20 flex items-center">
      <div className="container-screen-2xl flex items-center justify-between">
        <nav className="flex items-center">
          <Link href="/">
            <Image
              src="/qoritum_isotipo.png"
              alt="QORITUM"
              className="w-50 h-15 object-contain"
              width={500}
              height={500}
            />
          </Link>
        </nav>

        <nav className="flex items-center gap-3">
          <Button variant="secondary">Agenda tu consulta</Button>
        </nav>
      </div>
    </header>
  );
}

