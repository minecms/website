import type { Metadata } from "next";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "MineCMS — Headless CMS со schemas-as-code",
  description:
    "Self-hosted headless CMS на TypeScript. Опиши схемы в коде — получи Studio, REST API и типизированный SDK.",
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
