import React from "react";

import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ReactLenis } from "lenis/react";
import { Toaster } from "@/components/ui/sonner";

import { WhatsAppFixed } from "@/components/layout/whatsapp";

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactLenis root>
      <Header />
      {children}
      
      <WhatsAppFixed />

      <Toaster />
      <Footer />
    </ReactLenis>
  );
}

