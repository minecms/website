import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "MineCMS — CMS со схемами в коде",
  description:
    "Система управления контентом на вашем сервере: defineSchema, Fastify + tRPC, Drizzle ORM, админка Studio на React 19, типизированный SDK. PostgreSQL 16, MySQL 8.",
  openGraph: {
    title: "MineCMS",
    description:
      "CMS без готовой вёрстки на TypeScript. Схемы в коде, на вашем сервере, открытый исходник.",
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
