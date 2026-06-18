"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { typo } from "@/lib/typography";
import { ImageZoom } from "@/components/ui/image-zoom";
import { ScrollProvider } from "./scroll-provider";
import { HeroVideo } from "./hero-background";
import {
  Container,
  FullBleedMarquee,
  Section,
  SectionIntro,
  SectionLabel,
  SectionTitle,
} from "./section-layout";

gsap.registerPlugin(ScrollTrigger);

const CREATE_CMD_HERO = `npx @minecms/create-minecms-app@latest`;
const CREATE_CMD_PNPM = `pnpm create @minecms/minecms-app@latest my-app -- --next -y`;
const CREATE_CMD_NPX = `npx @minecms/create-minecms-app@latest my-app -- --next -y`;
const CREATE_CMD_BLOCK = `${CREATE_CMD_PNPM}\n# ${typo("или")}\n${CREATE_CMD_NPX}`;

const USE_CASES = [
  {
    title: typo("Ядро"),
    description: typo(
      "Пакет @minecms/core: defineSchema, defineField и defineConfig описывают модели в TypeScript. Отсюда же берутся Zod-валидаторы и миграции Drizzle — одно место, где задаётся структура контента.",
    ),
    href: "https://github.com/minecms/minecms/tree/main/packages/core",
  },
  {
    title: typo("Сервер"),
    description: typo(
      "Сервер на Fastify v5: REST и tRPC v11, сессии через подписанные cookie. PostgreSQL 16 или MySQL 8 через Drizzle ORM. CRUD, медиа в MinIO и права доступа — всё из тех же схем, что в конфиге.",
    ),
    href: "https://github.com/minecms/minecms/tree/main/apps/server",
  },
  {
    title: "Studio",
    description: typo(
      "Админка на Vite 8 и React 19. Списки, формы и поля собираются из minecms.config.ts — изменили схему в коде, интерфейс обновился сам, без ручной вёрстки под каждый тип документа.",
    ),
    href: "https://github.com/minecms/minecms/tree/main/apps/studio",
  },
  {
    title: "SDK",
    description: typo(
      "Типизированный REST-клиент: InferSchemaType выводит типы документов прямо из схем. Пакеты @minecms/sdk, sdk-next и sdk-nuxt — на фронте те же типы, что на сервере, без ручного дублирования.",
    ),
    href: "https://github.com/minecms/minecms/tree/main/packages/sdk",
  },
] as const;

const MEET_FEATURES = [
  {
    label: "defineSchema",
    title: typo("Модели контента — в коде, рядом с приложением"),
    description: typo(
      "Что: defineSchema, defineField и defineConfig описывают поля, связи и права в TypeScript. Как: схемы лежат в git, проходят ревью кода; @minecms/core собирает из них Zod-валидаторы и миграции Drizzle. Зачем: структура контента версионируется вместе с проектом — не в отдельной админке и не в чужом облаке.",
    ),
    image: "/images/minecms-admin-1.png",
    imageAlt: typo("Список документов в MineCMS Studio"),
    reverse: false,
  },
  {
    label: "Studio",
    title: typo("Админка собирается из схем автоматически"),
    description: typo(
      "Что: панель управления с динамическими списками, формами и медиа. Как: мастер установки создаёт администратора и прогоняет миграции; tRPC связывает интерфейс с сервером в реальном времени. Зачем: контент-команда работает с готовым интерфейсом — разработчикам не нужно вёрстать форму под каждый тип документа.",
    ),
    image: "/images/minecms-admin-2.png",
    imageAlt: typo("Редактор документа в MineCMS Studio"),
    reverse: true,
  },
  {
    label: "SDK & API",
    title: typo("REST, tRPC и типы — из одного minecms.config.ts"),
    description: typo(
      "Что: сервер отдаёт CRUD через REST и tRPC v11, SDK типизирует ответы через InferSchemaType. Как: сервер читает схемы один раз при старте — эндпоинты, валидация и типы на клиенте совпадают. Зачем: фронт и API не расходятся — поменяли поле в схеме, TypeScript сразу покажет, где обновить код.",
    ),
    image: "/images/minecms-admin-3.png",
    imageAlt: typo("Медиатека MineCMS Studio"),
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

const UI_MARQUEE = [
  "React 19",
  "Tailwind CSS v4",
  "shadcn/ui",
  "Radix UI",
  "oklch",
  "@minecms/ui",
  "TanStack",
  "TipTap",
  "Hugeicons",
  "Storybook",
  "Vite 8",
] as const;

const UI_TECH = [
  {
    label: typo("Дизайн-система"),
    title: "@minecms/ui",
    description: typo(
      "Собственная дизайн-система Studio: токены в oklch, светлая и тёмная тема, единые отступы и радиусы. Компоненты документированы в Storybook — Button, Form, Dialog, Select, Sheet и другие примитивы из одного пакета.",
    ),
    tags: ["@minecms/ui", "oklch", "Storybook", "Design Engineer"],
  },
  {
    label: typo("Стили"),
    title: "Tailwind CSS v4",
    description: typo(
      "Utility-first вёрстка на последней major-версии Tailwind: CSS-first конфиг, @theme inline, без legacy tailwind.config. Быстрая сборка через Vite 8, предсказуемые утилиты bg-background, text-foreground и ring-ring из токенов.",
    ),
    tags: ["Tailwind v4", "Vite 8", "CVA", "tailwind-merge"],
  },
  {
    label: typo("Компоненты"),
    title: "shadcn/ui + Radix UI",
    description: typo(
      "Паттерны shadcn/ui — composable-компоненты, которые вы контролиете в коде, а не тянете из чёрного ящика. Radix UI даёт доступность из коробки: фокус, клавиатура, aria — в Dialog, Dropdown, Select, Popover, Tooltip и Switch.",
    ),
    tags: ["shadcn/ui", "Radix UI", "a11y", "composable"],
  },
  {
    label: typo("Формы и данные"),
    title: "TanStack + tRPC",
    description: typo(
      "TanStack Router — типизированная навигация, TanStack Query — кэш и синхронизация с сервером, TanStack Form — управление полями без боли. tRPC v11 связывает Studio с API в реальном времени: типы на клиенте совпадают с сервером.",
    ),
    tags: ["TanStack Router", "TanStack Query", "TanStack Form", "tRPC v11"],
  },
  {
    label: typo("Редактор"),
    title: "TipTap",
    description: typo(
      "Современный rich-text на ProseMirror: заголовки, списки, ссылки, таблицы, выделение, выравнивание — всё в поле контента Studio. Расширяемая архитектура: новые блоки добавляются без переписывания админки.",
    ),
    tags: ["TipTap", "ProseMirror", "rich-text", "tables"],
  },
  {
    label: typo("Рантайм"),
    title: "React 19 + Vite 8",
    description: typo(
      "Studio собран на React 19 и Vite 8: мгновенный HMR при разработке, быстрый production-бандл. Списки, формы и медиатека открываются без перезагрузки — TanStack Router переключает экраны, Query подтягивает данные с сервера.",
    ),
    tags: ["React 19", "Vite 8", "HMR", "TanStack Router"],
  },
  {
    label: typo("Детали"),
    title: typo("Иконки и варианты"),
    description: typo(
      "Hugeicons — единый набор иконок через обёртку Icon во всём Studio. clsx и class-variance-authority задают варианты Button, Badge, Alert и других компонентов @minecms/ui — один API, предсказуемый вид во всех экранах админки.",
    ),
    tags: ["Hugeicons", "clsx", "CVA", "tailwind-merge"],
  },
] as const;

const MARQUEE = [
  typo("схемы в коде"),
  typo("на вашем сервере"),
  "MIT",
  typo("открытый исходный код"),
  "Fastify",
  "tRPC",
  "Drizzle",
  "InferSchemaType",
] as const;

function CopyButton({ text }: { text: string }) {
  const copy = () => navigator.clipboard.writeText(text);
  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 rounded-md px-3 py-1.5 text-xs text-white/70 transition-colors hover:bg-black hover:text-white"
      aria-label={typo("Скопировать команду")}
    >
      {typo("Копировать")}
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
    <ScrollProvider>
      <div ref={rootRef} className="landing bg-white text-[#121212]">
        {/* 1. Hero */}
        <Section id="hero" className="relative min-h-svh overflow-hidden bg-black">
          <HeroVideo />

          <Container className="relative z-10 flex min-h-svh flex-col justify-center pb-24 pt-32 md:pb-32 md:pt-36">
            <div className="w-full text-center">
              <h1 className="text-balance text-[clamp(3rem,8vw,6rem)] font-normal leading-[1.05] tracking-[-0.04em] text-white">
                <span data-hero-line className="block">
                  MineCMS
                </span>
              </h1>

              <h2
                data-hero-fade
                className="mt-8 w-full text-balance font-normal text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-[-0.03em] text-white/80"
              >
                {typo(
                  "Система управления контентом на вашем сервере. Опишите структуру в коде — получите админку и API без чужих облаков.",
                )}
              </h2>

              <div data-hero-fade className="mt-10 flex justify-center">
                <div className="inline-flex max-w-[calc(100vw-3rem)] items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-4 py-3 font-mono text-[13px] text-white/80">
                  <code className="whitespace-nowrap text-left">
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
                  {typo("Быстрый старт")}
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
                  {typo("Документация →")}
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 2. Social proof strip */}
        <Section className="border-y border-[#121212]/8 bg-[#fafafa]">
          <Container className="py-6 md:py-8">
            <p
              data-reveal
              className="max-w-4xl text-sm leading-relaxed text-[#121212]/75 md:text-base md:leading-[1.85]"
            >
              {typo(
                "Открытая CMS на вашем сервере: PostgreSQL или MySQL, данные и медиа у вас. Схемы контента — в коде рядом с проектом, без чужих облаков и ежемесячных подписок.",
              )}
            </p>
          </Container>
        </Section>

        {/* Marquee */}
        <FullBleedMarquee>
          <div className="marquee-track flex w-max gap-8 font-mono text-[clamp(1.25rem,3vw,2.25rem)] tracking-[-0.03em] text-[#121212]/30">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`} className="whitespace-nowrap">
                {item}
                <span className="mx-8 text-[#121212]/35">·</span>
              </span>
            ))}
          </div>
        </FullBleedMarquee>

        {/* 3. Two-audience split */}
        <Section className="py-24 md:py-32 lg:py-40">
          <Container>
            <div
              data-reveal
              className="grid gap-16 border-t border-[#121212]/8 pt-16 md:grid-cols-2 md:gap-20 md:pt-20 lg:gap-28"
            >
              <div>
                <SectionLabel>{typo("Разработчикам")}</SectionLabel>
                <SectionTitle className="mt-5">
                  {typo("TypeScript, git и типы без расхождений")}
                </SectionTitle>
                <p className="mt-6 text-base leading-[1.85] text-[#121212]/75 md:text-[17px]">
                  {typo(
                    "defineSchema, defineField и defineConfig — схемы в репозитории, миграции Drizzle из того же конфига, InferSchemaType на клиенте. Fastify + tRPC + REST: типы на фронте и в API совпадают, потому что оба читают один minecms.config.ts.",
                  )}
                </p>
              </div>
              <div>
                <SectionLabel>{typo("Контент-командам")}</SectionLabel>
                <SectionTitle className="mt-5">
                  {typo("Studio — готовая админка из ваших схем")}
                </SectionTitle>
                <p className="mt-6 text-base leading-[1.85] text-[#121212]/75 md:text-[17px]">
                  {typo(
                    "Динамические списки, формы и медиа с превью в полный экран. Интерфейс на React 19, Tailwind v4 и shadcn/ui — понятный редакторам, без ручной вёрстки под каждый тип документа. Мастер установки за минуты: PostgreSQL 16, администратор, миграции.",
                  )}
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* 4. Use cases grid */}
        <Section className="border-t border-[#121212]/8 bg-[#fafafa] py-24 md:py-32 lg:py-40">
          <Container>
            <div data-reveal className="w-full">
              <SectionLabel>{typo("Платформа")}</SectionLabel>
              <SectionTitle className="mt-5 w-full">
                {typo("Ядро, Сервер, Studio и SDK — один конфиг")}
              </SectionTitle>
              <p className="mt-6 max-w-4xl text-base leading-[1.85] text-[#121212]/75 md:text-lg">
                {typo(
                  "minecms.config.ts описывает модели один раз. @minecms/core собирает валидаторы и миграции, сервер отдаёт API, Studio рисует админку, SDK типизирует клиент — четыре части читают одни и те же схемы.",
                )}
              </p>
            </div>

            <div className="mt-16 grid gap-12 border-t border-[#121212]/8 pt-16 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-14 lg:pt-20">
              {USE_CASES.map((item) => (
                <article key={item.title} data-reveal>
                  <h3 className="text-xl tracking-[-0.02em] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.85] text-[#121212]/75">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm text-[#121212] transition-opacity hover:opacity-55"
                  >
                    {typo("Подробнее")}
                    <span aria-hidden>→</span>
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* 5. Stack showcase */}
        <Section className="py-24 md:py-32 lg:py-40">
          <Container>
            <SectionIntro data-reveal align="left">
              <SectionLabel>{typo("Стек")}</SectionLabel>
              <SectionTitle className="mt-5">
                {typo("Современный стек без лишних прослоек")}
              </SectionTitle>
              <p className="mt-6 text-base leading-[1.85] text-[#121212]/75 md:text-lg">
                {typo(
                  "Node 24 LTS, Fastify v5, tRPC v11, Drizzle ORM — PostgreSQL 16 или MySQL 8, React 19 на фронте, шаблоны под Next.js и Nuxt.",
                )}
              </p>
            </SectionIntro>
            <div
              data-reveal
              className="mt-14 grid grid-cols-2 gap-x-8 gap-y-5 border-t border-[#121212]/8 pt-14 sm:grid-cols-4 lg:grid-cols-8"
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
          </Container>
        </Section>

        {/* 5b. UI / Design system */}
        <Section className="border-y border-[#121212]/8 bg-[#fafafa] py-24 md:py-32 lg:py-40">
          <Container>
            <SectionIntro data-reveal align="left">
              <SectionLabel>Studio</SectionLabel>
              <SectionTitle className="mt-5">
                {typo("Интерфейс MineCMS Studio")}
              </SectionTitle>
              <p className="mt-6 text-base leading-[1.85] text-[#121212]/75 md:text-lg">
                {typo(
                  "Админка MineCMS — не legacy-панель на jQuery. React 19, Tailwind CSS v4, shadcn/ui и Radix UI: продуманный интерфейс Design Engineer, понятный редакторам и удобный разработчикам.",
                )}
              </p>
            </SectionIntro>
          </Container>

          <FullBleedMarquee>
            <div className="marquee-track flex w-max gap-8 font-mono text-[clamp(1rem,2.5vw,1.75rem)] tracking-[-0.03em] text-[#121212]/25">
              {[...UI_MARQUEE, ...UI_MARQUEE].map((item, i) => (
                <span key={`${item}-${i}`} className="whitespace-nowrap">
                  {item}
                  <span className="mx-8 text-[#121212]/30">·</span>
                </span>
              ))}
            </div>
          </FullBleedMarquee>

          <Container>
            <div className="mt-16 grid gap-12 border-t border-[#121212]/8 pt-16 sm:grid-cols-2 lg:gap-x-16 lg:gap-y-14 lg:pt-20">
              {UI_TECH.map((item) => (
                <article key={item.title} data-reveal>
                  <SectionLabel>{item.label}</SectionLabel>
                  <h3 className="mt-3 text-xl tracking-[-0.02em] md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.85] text-[#121212]/75">
                    {item.description}
                  </p>
                  <p className="mt-4 font-mono text-xs leading-relaxed text-[#121212]/55">
                    {item.tags.join(" · ")}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>

        {/* 6. Meet the CMS — full-bleed feature showcases */}
        <Section className="py-24 md:py-32 lg:py-40">
          <Container className="mb-16 md:mb-24">
            <SectionIntro data-reveal align="left">
              <SectionLabel>MineCMS</SectionLabel>
              <SectionTitle className="mt-5">
                {typo("Как устроена MineCMS")}
              </SectionTitle>
              <p className="mt-6 text-base leading-[1.85] text-[#121212]/75 md:text-lg">
                {typo(
                  "От defineSchema в коде до типизированного SDK на клиенте — один конфиг связывает админку, API и фронт.",
                )}
              </p>
            </SectionIntro>
          </Container>

          <div className="space-y-0">
            {MEET_FEATURES.map((feature, index) => (
              <div
                key={feature.label}
                data-reveal
                className={`grid lg:grid-cols-2 lg:items-start ${
                  index > 0 ? "border-t border-[#121212]/8" : ""
                }`}
              >
                <div
                  className={`flex items-center px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28 xl:px-24 ${
                    feature.reverse ? "lg:order-2" : ""
                  }`}
                >
                  <div>
                    <SectionLabel>{feature.label}</SectionLabel>
                    <h3 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.04em]">
                      {feature.title}
                    </h3>
                    <p className="mt-6 text-base leading-[1.85] text-[#121212]/75 md:text-[17px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-6 py-16 md:px-10 md:py-24 lg:px-16 lg:py-28 xl:px-24 ${
                    feature.reverse ? "lg:order-1 lg:pl-8 xl:pl-12" : "lg:pr-8 xl:pr-12"
                  }`}
                >
                  <ImageZoom
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 7. Philosophy */}
        <Section className="bg-black py-24 text-white md:py-32 lg:py-40">
          <Container>
            <SectionIntro data-reveal align="left">
              <SectionLabel invert>{typo("Философия")}</SectionLabel>
              <SectionTitle className="mt-5 text-white">
                {typo("Контент под вашим контролем")}
              </SectionTitle>
              <p className="mt-6 text-base leading-[1.85] text-white/75 md:text-lg">
                {typo(
                  "MineCMS — открытая CMS без готовой вёрстки, лицензия MIT. Данные на вашем сервере: PostgreSQL 16 или MySQL 8, медиа в MinIO. Схемы лежат в репозитории рядом с приложением — ревью кода вместо правок в чужой админке. Без облачных подписок и привязки к чужой платформе.",
                )}
              </p>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/65">
                <li>{typo("Лицензия MIT")}</li>
                <li>{typo("На вашем сервере")}</li>
                <li>{typo("Открытый исходный код")}</li>
                <li>{typo("Схемы в коде")}</li>
                <li>{typo("PostgreSQL и MySQL")}</li>
              </ul>
            </SectionIntro>
          </Container>
        </Section>

        {/* 8. Footer CTA + links */}
        <Section
          id="start"
          className="border-t border-white/10 bg-black py-24 text-white md:py-32 lg:py-40"
        >
          <Container>
            <SectionIntro data-reveal align="left">
              <SectionTitle className="text-white">
                {typo("Запуск за одну команду")}
              </SectionTitle>
              <p className="mt-6 text-base leading-[1.85] text-white/75 md:text-lg">
                {typo(
                  "Node 24+, pnpm 10+, Docker. Шаблон --next создаёт репозиторий с cms/ и web/: Docker Compose поднимает PostgreSQL и MinIO, мастер установки в Studio — и документ сразу доступен через REST, tRPC и SDK.",
                )}
              </p>

              <pre className="mt-10 max-w-2xl overflow-x-auto rounded-lg border border-white/10 bg-white/5 px-5 py-4 font-mono text-[13px] leading-[1.9] text-white/85">
                <code>{`${CREATE_CMD_BLOCK}
cd my-app
docker compose -f cms/docker-compose.yml up -d
pnpm dev

# Studio  → http://localhost:3333/admin
# API     → http://localhost:3333/api
# ${typo("Сайт")}    → http://localhost:3000`}</code>
              </pre>

              <div className="mt-10 flex flex-wrap items-center gap-4">
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
                  className="h-11 bg-white px-6 text-black hover:bg-black hover:text-white"
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
                  className="h-11 border-white/25 bg-transparent px-6 text-white hover:bg-black hover:text-white"
                >
                  GitHub
                </Button>
              </div>
            </SectionIntro>
          </Container>
        </Section>

        <footer className="border-t border-white/10 bg-black pb-12 pt-10 text-white md:pb-16">
          <Container>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[clamp(1.5rem,4vw,2.5rem)] font-normal leading-none tracking-[-0.04em]">
                  MineCMS
                </p>
                <p className="mt-3 text-sm text-white/75">
                  {typo("MIT · Node 24+ · pnpm 10+ · открытый исходный код")}
                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm text-white/70 md:items-end">
                <Link
                  href="/versions"
                  className="transition-opacity hover:text-white"
                >
                  {typo("Версии")}
                </Link>
                <Link
                  href="mailto:hello@minecms.ru"
                  className="transition-opacity hover:text-white/70"
                >
                  hello@minecms.ru
                </Link>
                <p>
                  {typo("Сделано в")}{" "}
                  <Link
                    href="https://fubon.ru"
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity hover:text-white/70"
                  >
                    Fubon
                  </Link>
                </p>
              </div>
            </div>
          </Container>
        </footer>
      </div>
    </ScrollProvider>
  );
}
