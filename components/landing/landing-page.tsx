"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "./smooth-scroll";
import { HeroBackground } from "./hero-background";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    num: "01",
    title: "Schemas-as-code",
    text: "defineSchema, defineField, defineConfig в TypeScript. Zod-валидаторы и миграции Drizzle собираются из одного контракта. Схемы в git — code review вместо кликов в админке.",
  },
  {
    num: "02",
    title: "Studio",
    text: "Vite 8 + React 19 + TanStack Router/Query + tRPC. Списки, формы и field renderers строятся динамически — правка minecms.config.ts обновляет UI без ручной вёрстки.",
  },
  {
    num: "03",
    title: "Server & SDK",
    text: "Fastify v5, REST + tRPC v11, signed-cookie сессии. PostgreSQL 16 и MySQL 8 через Drizzle ORM. SDK и InferSchemaType типизируют документы на клиенте.",
  },
] as const;

const HERO_STACK = [
  "Node 24 LTS",
  "Fastify v5",
  "tRPC v11",
  "Drizzle ORM",
  "PostgreSQL 16",
  "MySQL 8",
] as const;

const PIPELINE = [
  "defineSchema",
  "@minecms/core",
  "server",
  "studio",
  "sdk",
] as const;

const DEPLOY_POINTS = [
  "PostgreSQL 16 или MySQL 8",
  "Docker Compose для БД и MinIO",
  "Install-визард в Studio",
  "Миграции Drizzle из схем",
  "Signed-cookie сессии",
] as const;

const MARQUEE = [
  "schemas-as-code",
  "self-hosted",
  "Fastify",
  "tRPC",
  "Drizzle",
  "PostgreSQL 16",
  "MySQL 8",
  "InferSchemaType",
  "Next.js",
  "Nuxt",
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
    <p className="text-[11px] uppercase tracking-[0.3em] text-[#121212]/40">
      {children}
    </p>
  );
}

function SectionIntro({
  label,
  title,
  children,
  centered = true,
}: {
  label: string;
  title: string;
  children: ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      data-reveal
      className={centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}
    >
      <SectionLabel>{label}</SectionLabel>
      <h2 className="mt-5 text-balance text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.15] tracking-[-0.03em]">
        {title}
      </h2>
      <p className="mt-6 text-base leading-[1.8] text-[#121212]/55 md:text-lg">
        {children}
      </p>
    </div>
  );
}

export function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        y: 80,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      gsap.from("[data-hero-meta]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        delay: 0.55,
      });

      gsap.from("[data-scroll-hint]", {
        opacity: 0,
        duration: 1,
        delay: 1.2,
      });

      gsap.to("[data-scroll-hint]", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "sine.inOut",
        delay: 1.2,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const inner = el.querySelector<HTMLElement>("[data-parallax-inner]");
        if (!inner) return;

        gsap.to(inner, {
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: -40,
          scale: 1.02,
          ease: "none",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div ref={rootRef} className="landing relative bg-[#f4f2ee] text-[#121212]">
        <header className="fixed inset-x-0 top-0 z-40">
          <Shell className="flex items-center justify-between py-6 mix-blend-difference md:py-8">
            <Link
              href="/"
              className="text-[13px] font-medium tracking-[0.22em] uppercase text-white transition-opacity hover:opacity-60"
            >
              MineCMS
            </Link>
            <nav className="flex items-center gap-6 text-[13px] tracking-wide text-white/80">
              <Link
                href="https://github.com/minecms/minecms"
                className="transition-opacity hover:opacity-60"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </Link>
              <Link
                href="https://www.npmjs.com/org/minecms"
                className="transition-opacity hover:opacity-60"
                target="_blank"
                rel="noreferrer"
              >
                npm
              </Link>
            </nav>
          </Shell>
        </header>

        <section className="relative min-h-[100svh] overflow-hidden pb-20 pt-32 md:pb-28 md:pt-36">
          <HeroBackground />
          <Shell className="relative z-10">
            <div className="grid items-end gap-14 lg:grid-cols-2 lg:gap-16">
              <div>
                <p
                  data-hero-meta
                  className="mb-8 text-[13px] leading-relaxed tracking-wide text-sky-200/50"
                >
                  Headless CMS · TypeScript · self-hosted · MIT
                </p>

                <h1 className="text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.04em] text-white">
                  <span data-hero-line className="block">
                    Схемы в коде.
                  </span>
                  <span data-hero-line className="block text-sky-300/50">
                    API, Studio и SDK
                  </span>
                  <span data-hero-line className="block">
                    из одного контракта.
                  </span>
                </h1>

                <p
                  data-hero-meta
                  className="mt-8 max-w-xl text-base leading-[1.8] text-sky-100/55 md:text-lg"
                >
                  defineSchema описывает контент-модели — @minecms/core
                  сериализует контракт, server отдаёт REST/tRPC, Studio рендерит
                  UI, SDK типизирует клиент через InferSchemaType.
                </p>

                <div
                  data-scroll-hint
                  className="mt-16 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-sky-200/30"
                >
                  <span className="h-px w-8 bg-current" />
                  scroll
                </div>
              </div>

              <div
                data-hero-meta
                className="grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-[13px] text-sky-100/45 md:text-sm"
              >
                {HERO_STACK.map((item) => (
                  <span key={item} className="tracking-tight">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Shell>
        </section>

        <div className="overflow-hidden py-8 md:py-10">
          <div className="marquee-track flex w-max gap-10 text-[clamp(1.5rem,4vw,3rem)] tracking-[-0.03em] text-[#121212]/12">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`} className="whitespace-nowrap">
                {item}
                <span className="mx-10 text-[#121212]/20">·</span>
              </span>
            ))}
          </div>
        </div>

        <section className="py-20 md:py-32">
          <Shell>
            <SectionIntro
              label="Studio"
              title="Динамический UI из minecms.config.ts"
            >
              TanStack Router, Query и Form подключаются к tRPC. Списки, формы,
              медиа и CRUD собираются из field renderers — без отдельной вёрстки
              под каждый тип контента.
            </SectionIntro>

            <div
              data-parallax
              className="relative mt-14 aspect-[16/10] w-full overflow-hidden md:mt-20 md:aspect-[2/1]"
            >
              <div data-parallax-inner className="absolute inset-[-4%]">
                <Image
                  src="/images/studio-visual.png"
                  alt="Визуализация схем данных MineCMS"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                  priority
                />
              </div>
            </div>
          </Shell>
        </section>

        <section className="py-20 md:py-32">
          <Shell>
            <div className="grid gap-14 md:grid-cols-3 md:gap-10 lg:gap-14">
              {FEATURES.map((feature) => (
                <article key={feature.num} data-reveal className="text-center md:text-left">
                  <span className="text-[11px] tabular-nums tracking-[0.3em] text-[#121212]/30">
                    {feature.num}
                  </span>
                  <h3 className="mt-4 text-xl tracking-[-0.02em] md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-[15px] leading-[1.8] text-[#121212]/55">
                    {feature.text}
                  </p>
                </article>
              ))}
            </div>
          </Shell>
        </section>

        <section className="py-20 md:py-32">
          <Shell>
            <SectionIntro
              label="Архитектура"
              title="Один контракт — три runtime-поверхности"
            >
              Схемы сериализуются один раз в @minecms/core. Server, Studio и SDK
              читают один и тот же контракт — UI, валидация и API не расходятся.
            </SectionIntro>

            <div
              data-reveal
              className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-3 font-mono text-[clamp(0.8rem,1.6vw,0.95rem)] text-[#121212]/65"
            >
              {PIPELINE.map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  <span>{item}</span>
                  {i < PIPELINE.length - 1 && (
                    <span className="text-[#121212]/25" aria-hidden>
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>

            <div
              data-parallax
              className="relative mt-14 aspect-[21/9] w-full overflow-hidden md:mt-20"
            >
              <div data-parallax-inner className="absolute inset-[-4%]">
                <Image
                  src="/images/architecture-visual.png"
                  alt="Визуализация архитектуры MineCMS"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1152px) 100vw, 1152px"
                />
              </div>
            </div>
          </Shell>
        </section>

        <section className="py-20 md:py-32">
          <Shell>
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <div data-parallax className="relative order-2 aspect-[4/3] w-full overflow-hidden lg:order-1">
                <div data-parallax-inner className="absolute inset-[-4%]">
                  <Image
                    src="/images/install-visual.png"
                    alt="Визуализация развёртывания MineCMS"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2" data-reveal>
                <SectionLabel>Развёртывание</SectionLabel>
                <h2 className="mt-5 text-balance text-[clamp(1.75rem,3.5vw,2.5rem)] font-normal leading-[1.2] tracking-[-0.03em]">
                  Install-визард, Docker Compose и миграции из коробки
                </h2>
                <p className="mt-6 text-base leading-[1.8] text-[#121212]/55 md:text-lg">
                  CLI поднимает monorepo с cms/ и web/. Compose стартует БД и
                  MinIO для медиа. Визард в Studio создаёт администратора и
                  прогоняет миграции — дальше CRUD доступен через API и SDK.
                </p>
                <ul className="mt-8 space-y-3 text-[15px] leading-relaxed text-[#121212]/55">
                  {DEPLOY_POINTS.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="text-[#121212]/25" aria-hidden>
                        —
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Shell>
        </section>

        <section className="py-20 md:py-32">
          <Shell>
            <SectionIntro label="Быстрый старт" title="Полный стек за одну команду">
              Node 24+, pnpm 10+, Docker. Шаблон --next поднимает cms/ и Next.js
              web/ — после install-визарда документ сразу в API и SDK.
            </SectionIntro>

            <pre
              data-reveal
              className="mx-auto mt-10 max-w-2xl overflow-x-auto font-mono text-[clamp(0.78rem,1.4vw,0.9rem)] leading-[2] text-[#121212]/70"
            >
              <code>{`npm create @minecms/minecms-app my-app -- --next -y
cd my-app
docker compose -f cms/docker-compose.yml up -d
pnpm dev

# Studio  → http://localhost:3333/admin
# API     → http://localhost:3333/api
# Сайт    → http://localhost:3000`}</code>
            </pre>

            <div
              data-reveal
              className="mx-auto mt-14 flex max-w-2xl flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10"
            >
              <Link
                href="https://github.com/minecms/minecms"
                className="group inline-flex items-center gap-2 text-sm tracking-wide text-[#121212] transition-opacity hover:opacity-55"
                target="_blank"
                rel="noreferrer"
              >
                <span>Документация на GitHub</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="https://www.npmjs.com/package/@minecms/create-minecms-app"
                className="group inline-flex items-center gap-2 text-sm tracking-wide text-[#121212]/55 transition-opacity hover:opacity-80"
                target="_blank"
                rel="noreferrer"
              >
                <span>@minecms/create-minecms-app</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </Shell>
        </section>

        <footer className="pb-16 pt-10 md:pb-24 md:pt-14">
          <Shell>
            <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left">
              <div>
                <p className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-none tracking-[-0.04em]">
                  MineCMS
                </p>
                <p className="mt-4 text-sm text-[#121212]/40">
                  MIT · Node 24+ · pnpm 10+ · vendor-neutral
                </p>
              </div>
              <p className="text-sm text-[#121212]/35">hello@minecms.ru</p>
            </div>
          </Shell>
        </footer>
      </div>
    </SmoothScroll>
  );
}
