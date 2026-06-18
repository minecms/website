import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { typo } from "@/lib/typography";

export const metadata: Metadata = {
  title: typo("MineCMS — CMS со схемами в коде"),
  description: typo(
    "Один minecms.config.ts — админка Studio, REST и tRPC API, типизированный SDK через InferSchemaType. PostgreSQL 16, MySQL 8, Drizzle ORM, Fastify v5. На вашем сервере, лицензия MIT.",
  ),
  openGraph: {
    title: "MineCMS",
    description: typo(
      "CMS без готовой вёрстки на TypeScript. Схемы в коде, свой сервер, открытый исходный код — админка, API и типы из одного конфига.",
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}
