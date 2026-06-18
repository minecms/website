"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { SmoothScroll } from "./smooth-scroll";
import { HeroVideo } from "./hero-background";

gsap.registerPlugin(ScrollTrigger);

const CREATE_CMD = `npm create @minecms/minecms-app my-app -- --next -y`;

const USE_CASES = [
  {
    title: "Studio",
    description:
      "Vite 8 + React 19 + TanStack Router/Query. Списки, формы и field renderers строятся из minecms.config.ts — правка схемы обновляет UI без ручной вёрстки.",
    href: "https://github.com/minecms/minecms/tree/main/minecms/apps/studio",
  },
  {
    title: "Server & API",
    description:
      "Fastify v5, REST + tRPC v11, signed-cookie сессии. PostgreSQL 16 и MySQL 8 через Drizzle ORM. CRUD и медиа из одного контракта схем.",
    href: "https://github.com/minecms/minecms/tree/main/minecms/apps/server",
  },
  {
    title: "SDK",
    description:
      "Типизированный REST-клиент с InferSchemaType. Пакеты @minecms/sdk, sdk-next и sdk-nuxt — документы на клиенте с полным выводом типов из схем.",
    href: "https://github.com/minecms/minecms/tree/main/minecms/packages/sdk",
  },
  {
    title: "CLI",
    description:
      "npm create @minecms/minecms-app — monorepo с cms/ и web/. Шаблоны --next, --nuxt или только CMS. Docker Compose для БД и MinIO.",
    href: "https://www.npmjs.com/package/@minecms/create-minecms-app",
  },
] as const;

const MEET_FEATURES = [
  {
    label: "defineSchema",
    title: "Схемы в TypeScript, не в админке",
    description:
      "defineSchema, defineField, defineConfig — контент-модели в git с code review. Zod-валидаторы и миграции Drizzle собираются из одного контракта в @minecms/core.",
    image: "/images/studio-visual.png",
    imageAlt: "Схемы MineCMS в коде",
    reverse: false,
  },
  {
    label: "Studio",
    title: "Админка из схем, без ручной вёрстки",
    description:
      "Install-визард создаёт администратора и прогоняет миграции. CRUD, медиа и field renderers рендерятся динамически — tRPC связывает UI с server.",
    image: "/images/install-visual.png",
    imageAlt: "Install-визард MineCMS Studio",
    reverse: true,
  },
  {
    label: "SDK & API",
    title: "Один контракт — REST, tRPC и типы",
    description:
      "Server сериализует схемы один раз. REST и tRPC v11 отдают CRUD, SDK типизирует документы через InferSchemaType. UI, валидация и API не расходятся.",
    image: "/images/architecture-visual.png",
    imageAlt: "Архитектура MineCMS: core, server, studio, sdk",
    reverse: false,
  },
] as const;

const STACK = [
  "Node 24 LTS",
  "Fastify v5",
  "tRPC v11",
  "Drizzle ORM",
  "PostgreSQL 16",
  "MySQL 8",
  "React 19",
  "Next.js / Nuxt",
] as const;

const MARQUEE = [
  "schemas-as-code",
  "self-hosted",
  "MIT",
  "vendor-neutral",
  "Fastify",
  "tRPC",
  "Drizzle",
  "InferSchemaType",
] as const;

function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 md:px-10 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.28em] text-[#121212]/60">
      {children}
    </p>
  );
}

function CopyButton({ text }: { text: string }) {
  const copy = () => navigator.clipboard.writeText(text);
  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-md px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
      aria-label="Скопировать команду"
    >
      Copy
    </button>
  );
}

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.1,
      });

      gsap.from("[data-hero-fade]", {
        y: 24,
        opacity: 0,
        duration: 0.85,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.45,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 36,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div ref={rootRef} className="landing bg-white text-[#121212]">
        {/* Header */}
        <header className="fixed inset-x-0 top-0 z-40">
          <Shell className="flex items-center justify-between py-6 md:py-7">
            <Link
              href="/"
              className="text-[13px] font-medium tracking-[0.22em] uppercase text-white transition-opacity hover:opacity-60"
            >
              MineCMS
            </Link>
            <nav className="flex items-center gap-6 text-[13px] tracking-wide text-white/80">
              <Link
                href="https://github.com/minecms/minecms"
                className="transition-opacity hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Link>
              <Link
                href="https://www.npmjs.com/org/minecms"
                className="transition-opacity hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                npm
              </Link>
            </nav>
          </Shell>
        </header>

        {/* 1. Hero */}
        <section className="relative min-h-[100svh] overflow-hidden bg-black">
          <HeroVideo />

          <Shell className="relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-32 md:pb-32 md:pt-36">
            <div className="mx-auto w-full max-w-4xl text-center">
              <p
                data-hero-fade
                className="mb-6 text-[13px] tracking-wide text-white/75"
              >
                Headless CMS · TypeScript · self-hosted · MIT
              </p>

              <h1 className="text-balance text-[clamp(2.25rem,6.5vw,4.75rem)] font-normal leading-[1.05] tracking-[-0.04em] text-white">
                <span data-hero-line className="block">
                  Схемы в коде.
                </span>
                <span data-hero-line className="block text-white/80">
                  Studio, API и SDK
                </span>
                <span data-hero-line className="block">
                  из одного контракта.
                </span>
              </h1>

              <p
                data-hero-fade
                className="mx-auto mt-8 max-w-2xl text-base leading-[1.75] text-white/80 md:text-lg"
              >
                defineSchema описывает контент-модели — @minecms/core
                сериализует контракт, server отдаёт REST/tRPC, Studio рендерит
                UI, SDK типизирует клиент через InferSchemaType.
              </p>

              <div
                data-hero-fade
                className="mx-auto mt-10 flex max-w-xl flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center"
              >
                <div className="flex w-full items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-mono text-[13px] text-white/80 sm:max-w-md">
                  <code className="min-w-0 flex-1 truncate text-left">
                    {CREATE_CMD}
                  </code>
                  <CopyButton text={CREATE_CMD} />
                </div>
              </div>

              <div
                data-hero-fade
                className="mt-8 flex flex-wrap items-center justify-center gap-4"
              >
                <Button
                  nativeButton={false}
                  render={<Link href="#start" />}
                  size="lg"
                  className="h-10 bg-white px-5 text-black hover:bg-white/90"
                >
                  Быстрый старт
                </Button>
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href="https://github.com/minecms/minecms"
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  variant="outline"
                  size="lg"
                  className="h-10 border-white/25 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
                >
                  Документация →
                </Button>
              </div>
            </div>
          </Shell>
        </section>

        {/* 2. Social proof strip */}
        <section className="border-y border-[#121212]/8 bg-[#fafafa] py-5">
          <Shell>
            <p
              data-reveal
              className="text-center text-sm leading-relaxed text-[#121212]/50 md:text-base"
            >
              Open source headless CMS для команд, которым нужен{" "}
              <span className="text-[#121212]/80">schemas-as-code</span>,{" "}
              <span className="text-[#121212]/80">self-hosted</span> деплой и{" "}
              <span className="text-[#121212]/80">vendor-neutral</span> стек — без
              проприетарных облаков и кликов в GUI для моделей данных.
            </p>
          </Shell>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden bg-white py-6 md:py-8">
          <div className="marquee-track flex w-max gap-8 font-mono text-[clamp(1.25rem,3vw,2.25rem)] tracking-[-0.03em] text-[#121212]/30">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`} className="whitespace-nowrap">
                {item}
                <span className="mx-8 text-[#121212]/35">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* 3. Two-audience split */}
        <section className="py-20 md:py-28">
          <Shell>
            <div
              data-reveal
              className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24"
            >
              <div>
                <SectionLabel>Разработчикам</SectionLabel>
                <h2 className="mt-4 text-balance text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal leading-[1.15] tracking-[-0.03em]">
                  Schemas-as-code для разработчиков
                </h2>
                <p className="mt-5 text-base leading-[1.8] text-[#121212]/75">
                  defineSchema, defineField, defineConfig в TypeScript. Схемы в
                  git, миграции Drizzle из контракта, InferSchemaType на
                  клиенте. Fastify + tRPC + REST — без расхождения типов между
                  API и фронтом.
                </p>
              </div>
              <div>
                <SectionLabel>Контент-командам</SectionLabel>
                <h2 className="mt-4 text-balance text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal leading-[1.15] tracking-[-0.03em]">
                  Studio для контента
                </h2>
                <p className="mt-5 text-base leading-[1.8] text-[#121212]/75">
                  Админка с динамическими списками, формами и медиа. Install-визард
                  за минуты — PostgreSQL, администратор, готово. CRUD по вашим
                  схемам без отдельной вёрстки под каждый тип документа.
                </p>
              </div>
            </div>
          </Shell>
        </section>

        {/* 4. Use cases grid */}
        <section className="bg-[#fafafa] py-20 md:py-28">
          <Shell>
            <div data-reveal className="mx-auto max-w-3xl text-center">
              <SectionLabel>Платформа</SectionLabel>
              <h2 className="mt-4 text-balance text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.15] tracking-[-0.03em]">
                Четыре поверхности из одного контракта
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-[#121212]/75 md:text-lg">
                @minecms/core сериализует схемы один раз — Studio, server, SDK и
                CLI читают один и тот же источник правды.
              </p>
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:gap-12">
              {USE_CASES.map((item) => (
                <article key={item.title} data-reveal>
                  <h3 className="text-xl tracking-[-0.02em] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-[#121212]/75">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#121212] transition-opacity hover:opacity-55"
                  >
                    Подробнее
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </Shell>
        </section>

        {/* 5. Stack showcase */}
        <section className="py-20 md:py-28">
          <Shell>
            <div data-reveal className="mx-auto max-w-3xl text-center">
              <SectionLabel>Стек</SectionLabel>
              <h2 className="mt-4 text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em]">
                Node 24, Fastify, tRPC, Drizzle — без legacy-обёрток
              </h2>
            </div>
            <div
              data-reveal
              className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-4"
            >
              {STACK.map((item) => (
                <span
                  key={item}
                  className="font-mono text-sm text-[#121212]/70 md:text-[15px]"
                >
                  {item}
                </span>
              ))}
            </div>
          </Shell>
        </section>

        {/* 6. Meet the CMS — alternating feature blocks */}
        <section className="bg-[#fafafa] py-20 md:py-28">
          <Shell>
            <div data-reveal className="mx-auto max-w-3xl text-center">
              <SectionLabel>MineCMS</SectionLabel>
              <h2 className="mt-4 text-balance text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.15] tracking-[-0.03em]">
                Знакомьтесь с CMS
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-[#121212]/75 md:text-lg">
                От defineSchema до типизированного SDK — один контракт на все
                runtime-поверхности.
              </p>
            </div>

            <div className="mt-16 space-y-24 md:mt-24 md:space-y-32">
              {MEET_FEATURES.map((feature) => (
                <div
                  key={feature.label}
                  data-reveal
                  className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
                    feature.reverse ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <div className={feature.reverse ? "lg:[direction:ltr]" : ""}>
                    <SectionLabel>{feature.label}</SectionLabel>
                    <h3 className="mt-4 text-balance text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-[1.2] tracking-[-0.03em]">
                      {feature.title}
                    </h3>
                    <p className="mt-5 text-base leading-[1.8] text-[#121212]/75 md:text-lg">
                      {feature.description}
                    </p>
                  </div>
                  <div
                    className={`relative aspect-[16/10] w-full overflow-hidden bg-[#121212]/5 ${
                      feature.reverse ? "lg:[direction:ltr]" : ""
                    }`}
                  >
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Shell>
        </section>

        {/* 7. Philosophy */}
        <section className="py-20 md:py-28">
          <Shell>
            <div
              data-reveal
              className="mx-auto max-w-3xl text-center"
            >
              <SectionLabel>Философия</SectionLabel>
              <h2 className="mt-4 text-balance text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.15] tracking-[-0.03em]">
                Лучший способ управлять контентом
              </h2>
              <p className="mt-6 text-base leading-[1.85] text-[#121212]/75 md:text-lg">
                MineCMS — vendor-neutral headless CMS с открытым исходным кодом
                под MIT. Self-hosted: ваш сервер, ваши данные, PostgreSQL или
                MySQL. Схемы живут в репозитории рядом с приложением — code
                review вместо кликов в GUI. Без проприетарных облаков и
                vendor lock-in.
              </p>
              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#121212]/70">
                <li>MIT License</li>
                <li>Self-hosted</li>
                <li>Vendor-neutral</li>
                <li>Schemas-as-code</li>
                <li>Open source</li>
              </ul>
            </div>
          </Shell>
        </section>

        {/* 8. Footer CTA + links */}
        <section
          id="start"
          className="border-t border-[#121212]/8 bg-black py-20 text-white md:py-28"
        >
          <Shell>
            <div data-reveal className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.15] tracking-[-0.03em]">
                Начните за одну команду
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-white/80 md:text-lg">
                Node 24+, pnpm 10+, Docker. Шаблон --next поднимает cms/ и
                Next.js web/ — после install-визарда документ сразу в API и SDK.
              </p>

              <pre className="mx-auto mt-10 max-w-xl overflow-x-auto rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-left font-mono text-[13px] leading-[1.9] text-white/85">
                <code>{`${CREATE_CMD}
cd my-app
docker compose -f cms/docker-compose.yml up -d
pnpm dev

# Studio  → http://localhost:3333/admin
# API     → http://localhost:3333/api
# Сайт    → http://localhost:3000`}</code>
              </pre>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href="https://www.npmjs.com/package/@minecms/create-minecms-app"
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  size="lg"
                  className="h-10 bg-white px-5 text-black hover:bg-white/90"
                >
                  npm create @minecms/minecms-app
                </Button>
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href="https://github.com/minecms/minecms"
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  variant="outline"
                  size="lg"
                  className="h-10 border-white/25 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
                >
                  GitHub
                </Button>
              </div>
            </div>
          </Shell>
        </section>

        <footer className="border-t border-white/10 bg-black pb-12 pt-10 text-white md:pb-16">
          <Shell>
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
              <div>
                <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-none tracking-[-0.04em]">
                  MineCMS
                </p>
                <p className="mt-3 text-sm text-white/70">
                  MIT · Node 24+ · pnpm 10+ · vendor-neutral
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 text-sm text-white/70 md:items-end">
                <Link
                  href="mailto:hello@minecms.ru"
                  className="transition-opacity hover:text-white/70"
                >
                  hello@minecms.ru
                </Link>
                <div className="flex gap-5">
                  <Link
                    href="https://github.com/minecms/minecms"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity hover:text-white/70"
                  >
                    GitHub
                  </Link>
                  <Link
                    href="https://www.npmjs.com/org/minecms"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity hover:text-white/70"
                  >
                    npm
                  </Link>
                </div>
              </div>
            </div>
          </Shell>
        </footer>
      </div>
    </SmoothScroll>
  );
}
