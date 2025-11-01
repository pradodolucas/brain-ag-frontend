import type { Metadata } from "next";

import { Providers } from "@/provider";
import { Nunito } from "next/font/google";

export const metadata: Metadata = {
  title: "Brain Agriculture",
  description: "Sistema web para gestão de produtores rurais, suas propriedades e safras.",
};

const nunito = Nunito({
  subsets: ["latin"], 
  weight: ["400", "600", "700"], 
  variable: "--font-nunito", 
  display: "swap", 
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
