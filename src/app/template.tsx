// import { WhatsAppFixed } from "@/components/layout/whatsapp";
import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { ReactLenis } from "lenis/react";
import React from "react";

export default function Template({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ReactLenis root>
      <Header />
      {children}
      {/** 
      <WhatsAppFixed />
      */}

      <Footer />
    </ReactLenis>
  );
}
