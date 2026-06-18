import type { Metadata } from "next";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";
import { cn } from "@/lib/utils";
import { typo } from "@/lib/typography";

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
    <html lang="ru" className={cn("h-full", "antialiased")}>
      <body className="min-h-full">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
