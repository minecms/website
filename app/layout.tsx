import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";
import { typo } from "@/lib/typography";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: typo("MineCMS — CMS со схемами в коде"),
  description: typo(
    "Headless CMS на React 19, Tailwind CSS v4, shadcn/ui и Radix UI. Админка Studio, REST и tRPC API, типизированный SDK — на вашем сервере, лицензия MIT.",
  ),
  openGraph: {
    title: "MineCMS",
    description: typo(
      "CMS с современным UI: Tailwind v4, shadcn/ui, Radix UI, @minecms/ui. Схемы в коде, свой сервер, открытый исходный код — админка, API и типы из одного конфига.",
    ),
    url: "https://minecms.ru",
    siteName: "MineCMS",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={cn("h-full antialiased", inter.variable)}>
      <body className="min-h-full font-sans">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
