import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "MineCMS — Headless CMS со schemas-as-code",
  description:
    "Self-hosted headless CMS: defineSchema, Fastify + tRPC, Drizzle ORM, Studio на React 19, типизированный SDK. PostgreSQL 16, MySQL 8.",
  openGraph: {
    title: "MineCMS",
    description:
      "Headless CMS на TypeScript со schemas-as-code. Self-hosted, opensource, vendor-neutral.",
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
