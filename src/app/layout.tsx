import type { Metadata } from "next";
import { Questrial } from "next/font/google";
import localFont from 'next/font/local'

import "./globals.css";
import { cn } from "@/lib/utils";

const questrial = Questrial({
  variable: "--font-questrial-400",
  weight: ["400"]
});

const arboria = localFont({
  variable: "--font-arboria-custom",
  src: [
    {
      path: './fonts/Arboria-Black.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/Arboria-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Arboria-Book.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/Arboria-Light.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Arboria-Thin.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
})


export const metadata: Metadata = {
  title: {
    template: "%s | Qoritum",
    default: "Qoritum"
  },
  description: "Diseñamos soluciones digitales ajustadas a las necesidades de tu negocio para acelerar su transformación en la Industria 4.0.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(questrial.variable, arboria.variable, "antialiased")}
      >
        {children}
      </body>
    </html>
  );
}
