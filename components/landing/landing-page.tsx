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

const CREATE_CMD_HERO = `npx @minecms/create-minecms-app`;
const CREATE_CMD_PNPM = `pnpm create @minecms/minecms-app my-app -- --next -y`;
const CREATE_CMD_NPX = `npx @minecms/create-minecms-app my-app -- --next -y`;
const CREATE_CMD_BLOCK = `${CREATE_CMD_PNPM}\n# или\n${CREATE_CMD_NPX}`;

const USE_CASES = [
  {
    title: "Ядро",
    description:
      "Пакет @minecms/core: defineSchema, defineField и defineConfig описывают модели в TypeScript. Отсюда же берутся Zod-валидаторы и миграции Drizzle — одно место, где задаётся структура контента.",
    href: "https://github.com/minecms/minecms/tree/main/packages/core",
  },
  {
    title: "Сервер",
    description:
      "Сервер на Fastify v5: REST и tRPC v11, сессии через подписанные cookie. PostgreSQL 16 или MySQL 8 через Drizzle ORM. CRUD, медиа в MinIO и права доступа — всё из тех же схем, что в конфиге.",
    href: "https://github.com/minecms/minecms/tree/main/apps/server",
  },
  {
    title: "Studio",
    description:
      "Админка на Vite 8 и React 19. Списки, формы и поля собираются из minecms.config.ts — изменили схему в коде, интерфейс обновился сам, без ручной вёрстки под каждый тип документа.",
    href: "https://github.com/minecms/minecms/tree/main/apps/studio",
  },
  {
    title: "SDK",
    description:
      "Типизированный REST-клиент: InferSchemaType выводит типы документов прямо из схем. Пакеты @minecms/sdk, sdk-next и sdk-nuxt — на фронте те же типы, что на сервере, без ручного дублирования.",
    href: "https://github.com/minecms/minecms/tree/main/packages/sdk",
  },
] as const;

const MEET_FEATURES = [
  {
    label: "defineSchema",
    title: "Модели контента — в коде, рядом с приложением",
    description:
      "Что: defineSchema, defineField и defineConfig описывают поля, связи и права в TypeScript. Как: схемы лежат в git, проходят ревью кода; @minecms/core собирает из них Zod-валидаторы и миграции Drizzle. Зачем: структура контента версионируется вместе с проектом — не в отдельной админке и не в чужом облаке.",
    image: "/images/studio-visual.png",
    imageAlt: "Схемы MineCMS в коде",
    reverse: false,
  },
  {
    label: "Studio",
    title: "Админка собирается из схем автоматически",
    description:
      "Что: панель управления с динамическими списками, формами и медиа. Как: мастер установки создаёт администратора и прогоняет миграции; tRPC связывает интерфейс с сервером в реальном времени. Зачем: контент-команда работает с готовым интерфейсом — разработчикам не нужно вёрстать форму под каждый тип документа.",
    image: "/images/install-visual.png",
    imageAlt: "Мастер установки MineCMS Studio",
    reverse: true,
  },
  {
    label: "SDK & API",
    title: "REST, tRPC и типы — из одного minecms.config.ts",
    description:
      "Что: сервер отдаёт CRUD через REST и tRPC v11, SDK типизирует ответы через InferSchemaType. Как: сервер читает схемы один раз при старте — эндпоинты, валидация и типы на клиенте совпадают. Зачем: фронт и API не расходятся — поменяли поле в схеме, TypeScript сразу покажет, где обновить код.",
    image: "/images/architecture-visual.png",
    imageAlt: "Архитектура MineCMS: ядро, сервер, Studio, SDK",
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
  "схемы в коде",
  "на вашем сервере",
  "MIT",
  "открытый исходный код",
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
      className="shrink-0 rounded-md px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-black hover:text-white"
      aria-label="Скопировать команду"
    >
      Копировать
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
              <h1 className="text-balance text-[clamp(3rem,8vw,6rem)] font-normal leading-[1.05] tracking-[-0.04em] text-white">
                <span data-hero-line className="block">
                  MineCMS
                </span>
              </h1>

              <p
                data-hero-fade
                className="mx-auto mt-8 max-w-2xl text-base leading-[1.75] text-white/80 md:text-lg"
              >
                Система управления контентом на вашем сервере. Опишите структуру
                в коде — получите админку и API без чужих облаков.
              </p>

              <div
                data-hero-fade
                className="mx-auto mt-10 flex max-w-xl flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center"
              >
                <div className="flex w-full items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-mono text-[13px] text-white/80 sm:max-w-lg">
                  <code className="min-w-0 flex-1 text-left">
                    {CREATE_CMD_HERO}
                  </code>
                  <CopyButton text={CREATE_CMD_HERO} />
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
                  className="h-10 bg-white px-5 text-black hover:bg-black hover:text-white"
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
                  className="h-10 border-white/25 bg-transparent px-5 text-white hover:bg-black hover:text-white"
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
              className="text-center text-sm leading-relaxed text-[#121212]/75 md:text-base"
            >
              Открытая CMS на вашем сервере: PostgreSQL или MySQL, данные и медиа
              у вас. Схемы контента — в коде рядом с проектом, без чужих облаков
              и ежемесячных подписок.
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
                  TypeScript, git и типы без расхождений
                </h2>
                <p className="mt-5 text-base leading-[1.8] text-[#121212]/75">
                  defineSchema, defineField и defineConfig — схемы в репозитории,
                  миграции Drizzle из того же конфига, InferSchemaType на клиенте.
                  Fastify + tRPC + REST: типы на фронте и в API совпадают, потому
                  что оба читают один minecms.config.ts.
                </p>
              </div>
              <div>
                <SectionLabel>Контент-командам</SectionLabel>
                <h2 className="mt-4 text-balance text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal leading-[1.15] tracking-[-0.03em]">
                  Studio — готовая админка из ваших схем
                </h2>
                <p className="mt-5 text-base leading-[1.8] text-[#121212]/75">
                  Динамические списки, формы и медиа с превью в полный экран.
                  Мастер установки за минуты: PostgreSQL 16, администратор,
                  миграции — и можно создавать документы. CRUD по схемам без
                  отдельной вёрстки под каждый тип контента.
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
                Ядро, Сервер, Studio и SDK — один конфиг
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-[#121212]/75 md:text-lg">
                minecms.config.ts описывает модели один раз. @minecms/core
                собирает валидаторы и миграции, сервер отдаёт API, Studio
                рисует админку, SDK типизирует клиент — четыре части читают
                одни и те же схемы.
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
                Современный стек без лишних прослоек
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-[#121212]/75 md:text-lg">
                Node 24 LTS, Fastify v5, tRPC v11, Drizzle ORM — PostgreSQL 16
                или MySQL 8, React 19 на фронте, шаблоны под Next.js и Nuxt.
              </p>
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
                Как устроена MineCMS
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-[#121212]/75 md:text-lg">
                От defineSchema в коде до типизированного SDK на клиенте — один
                конфиг связывает админку, API и фронт.
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
                Контент под вашим контролем
              </h2>
              <p className="mt-6 text-base leading-[1.85] text-[#121212]/75 md:text-lg">
                MineCMS — открытая CMS без готовой вёрстки, лицензия MIT. Данные
                на вашем сервере: PostgreSQL 16 или MySQL 8, медиа в MinIO.
                Схемы лежат в репозитории рядом с приложением — ревью кода
                вместо правок в чужой админке. Без облачных подписок и
                привязки к чужой платформе.
              </p>
              <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[#121212]/75">
                <li>Лицензия MIT</li>
                <li>На вашем сервере</li>
                <li>Открытый исходный код</li>
                <li>Схемы в коде</li>
                <li>PostgreSQL и MySQL</li>
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
                Запуск за одну команду
              </h2>
              <p className="mt-5 text-base leading-[1.8] text-white/80 md:text-lg">
                Node 24+, pnpm 10+, Docker. Шаблон --next создаёт репозиторий с
                cms/ и web/: Docker Compose поднимает PostgreSQL и MinIO, мастер
                установки в Studio — и документ сразу доступен через REST, tRPC
                и SDK.
              </p>

              <pre className="mx-auto mt-10 max-w-xl overflow-x-auto rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-left font-mono text-[13px] leading-[1.9] text-white/85">
                <code>{`${CREATE_CMD_BLOCK}
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
                  className="h-10 bg-white px-5 text-black hover:bg-black hover:text-white"
                >
                  pnpm create @minecms/minecms-app
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
                  className="h-10 border-white/25 bg-transparent px-5 text-white hover:bg-black hover:text-white"
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
                <p className="mt-3 text-sm text-white/75">
                  MIT · Node 24+ · pnpm 10+ · открытый исходный код
                </p>
              </div>
              <div className="flex flex-col items-center gap-3 text-sm text-white/70 md:items-end">
                <Link
                  href="mailto:hello@minecms.ru"
                  className="transition-opacity hover:text-white/70"
                >
                  hello@minecms.ru
                </Link>
                <p>
                  Проект{" "}
                  <Link
                    href="https://fubon.ru"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity hover:text-white/70"
                  >
                    Fubon
                  </Link>
                  .
                </p>
              </div>
            </div>
          </Shell>
        </footer>
      </div>
    </SmoothScroll>
  );
}
