import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import { cn } from "@/lib/utils";
import { createMetadata } from "@/lib/metadata";

import 'dayjs/locale/es';


const questrial = Questrial({
  variable: "--font-questrial-400",
  weight: ["400"],
});

const arboria = localFont({
  variable: "--font-arboria-custom",
  src: [
    {
      path: "./fonts/Arboria-Black.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./fonts/Arboria-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Arboria-Book.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Arboria-Light.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Arboria-Thin.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = createMetadata({
  title: {
    template: "%s | Qoritum",
    default: "Consultoría IT y Transformación Digital | Qoritum",
  },
  description:
    "Servicios de consultoría IT y soluciones de ingeniería industrial para micro y grandes empresas. Optimización de procesos, automatización, infraestructura tecnológica y modernización operativa para acelerar la transformación digital.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          questrial.variable,
          arboria.variable,
          "antialiased select-none"
        )}
      >
        {children}
      </body>
    </html>
  );
}

