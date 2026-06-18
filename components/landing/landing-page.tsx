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
    text: "defineSchema и defineField в TypeScript. Схемы живут в git и проходят code review — не в чужой админке.",
  },
  {
    num: "02",
    title: "Studio",
    text: "Админка с динамическими формами и списками. Добавили поле в код — Studio подхватила без ручной вёрстки.",
  },
  {
    num: "03",
    title: "Server & SDK",
    text: "REST + tRPC, Drizzle ORM, MySQL 8 и PostgreSQL 16. SDK выводит типы документов через InferSchemaType.",
  },
] as const;

const STACK = [
  "defineSchema",
  "@minecms/core",
  "server",
  "studio",
  "sdk",
] as const;

const MARQUEE = [
  "schemas-as-code",
  "self-hosted",
  "opensource",
  "PostgreSQL 16",
  "MySQL 8",
  "TypeScript",
  "REST API",
  "tRPC",
  "Next.js",
  "Nuxt",
] as const;

function Shell({
  children,
  wide,
  className = "",
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-10 lg:px-14 ${wide ? "max-w-[1400px]" : "max-w-5xl"} ${className}`}
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
          y: -48,
          scale: 1.03,
          ease: "none",
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <div ref={rootRef} className="landing relative bg-[#f4f2ee] text-[#121212]">
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.035] mix-blend-multiply"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <header className="fixed inset-x-0 top-0 z-40">
          <Shell
            wide
            className="flex items-center justify-between py-6 mix-blend-difference md:py-8"
          >
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

        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-32 md:pb-24">
          <HeroBackground />
          <Shell wide className="relative z-10">
            <p
              data-hero-meta
              className="mb-8 max-w-xl text-[13px] leading-relaxed tracking-wide text-sky-200/50"
            >
              Headless CMS на TypeScript · self-hosted · vendor-neutral
            </p>

            <h1 className="max-w-[14ch] text-[clamp(2.75rem,9vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.04em] text-white">
              <span data-hero-line className="block">
                Схемы
              </span>
              <span data-hero-line className="block text-sky-300/45">
                в коде.
              </span>
              <span data-hero-line className="block">
                CMS из коробки.
              </span>
            </h1>

            <p
              data-hero-meta
              className="mt-10 max-w-md text-base leading-relaxed text-sky-100/55 md:text-lg"
            >
              Опиши контент-модели в TypeScript — получи Studio, REST API и
              типизированный SDK из одного источника правды.
            </p>

            <div
              data-scroll-hint
              className="mt-20 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-sky-200/30"
            >
              <span className="h-px w-8 bg-current" />
              scroll
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
            <div data-reveal className="mb-14 max-w-2xl md:mb-20">
              <SectionLabel>Studio</SectionLabel>
              <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.03em]">
                Панель, которая строится сама — по вашим схемам
              </h2>
              <p className="mt-6 max-w-lg text-base leading-[1.75] text-[#121212]/55 md:text-lg">
                Списки, формы, медиа и CRUD без ручной вёрстки. Изменили
                minecms.config.ts — Studio и API обновились вместе с кодом.
              </p>
            </div>
          </Shell>

          <Shell wide className="mt-4">
            <div
              data-parallax
              className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[2/1]"
            >
              <div data-parallax-inner className="absolute inset-[-6%]">
                <Image
                  src="/images/studio-visual.png"
                  alt="Абстрактная визуализация схем данных MineCMS Studio"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                  priority
                />
              </div>
            </div>
          </Shell>
        </section>

        <section className="py-20 md:py-32">
          <Shell>
            <div className="grid gap-16 md:grid-cols-3 md:gap-12 lg:gap-16">
              {FEATURES.map((feature) => (
                <article key={feature.num} data-reveal>
                  <span className="text-[11px] tabular-nums tracking-[0.3em] text-[#121212]/30">
                    {feature.num}
                  </span>
                  <h3 className="mt-5 text-xl tracking-[-0.02em] md:text-2xl">
                    {feature.title}
                  </h3>
                  <p className="mt-4 text-base leading-[1.75] text-[#121212]/55">
                    {feature.text}
                  </p>
                </article>
              ))}
            </div>
          </Shell>
        </section>

        <section className="py-20 md:py-32">
          <Shell>
            <SectionLabel>Архитектура</SectionLabel>
            <h2
              data-reveal
              className="mt-5 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.12] tracking-[-0.03em]"
            >
              Один контракт — три поверхности: API, админка, клиент
            </h2>

            <div
              data-reveal
              className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[clamp(0.8rem,1.8vw,1rem)] text-[#121212]/65"
            >
              {STACK.map((item, i) => (
                <span key={item} className="flex items-center gap-3">
                  <span className="tracking-tight">{item}</span>
                  {i < STACK.length - 1 && (
                    <span className="text-[#121212]/25" aria-hidden>
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>

            <p
              data-reveal
              className="mt-8 max-w-2xl text-base leading-[1.75] text-[#121212]/55 md:mt-10 md:text-lg"
            >
              Fastify + tRPC на сервере, Vite + React в Studio, типизированный
              REST-клиент в SDK. Схемы сериализуются один раз — UI и валидация
              всегда синхронны.
            </p>
          </Shell>

          <Shell wide className="mt-14 md:mt-20">
            <div
              data-parallax
              className="relative aspect-[21/9] w-full overflow-hidden"
            >
              <div data-parallax-inner className="absolute inset-[-5%]">
                <Image
                  src="/images/architecture-visual.png"
                  alt="Абстрактная визуализация архитектуры MineCMS"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1400px) 100vw, 1400px"
                />
              </div>
            </div>
          </Shell>
        </section>

        <section className="py-20 md:py-32">
          <Shell wide>
            <div className="grid items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16 lg:gap-24">
              <div data-reveal>
                <SectionLabel>Установка</SectionLabel>
                <h2 className="mt-5 text-[clamp(1.75rem,4vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.03em]">
                  Готово за минуты — визард в Studio
                </h2>
                <p className="mt-6 max-w-md text-base leading-[1.75] text-[#121212]/55 md:text-lg">
                  PostgreSQL, администратор, первый документ. Без облачных
                  подписок и чужих панелей.
                </p>
              </div>

              <div
                data-parallax
                className="relative aspect-[4/3] w-full overflow-hidden"
              >
                <div data-parallax-inner className="absolute inset-[-5%]">
                  <Image
                    src="/images/install-visual.png"
                    alt="Абстрактная визуализация быстрого запуска MineCMS"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 55vw"
                  />
                </div>
              </div>
            </div>
          </Shell>
        </section>

        <section className="py-20 md:py-32">
          <Shell>
            <SectionLabel>Быстрый старт</SectionLabel>

            <pre
              data-reveal
              className="mt-8 max-w-2xl overflow-x-auto font-mono text-[clamp(0.78rem,1.5vw,0.92rem)] leading-[2] text-[#121212]/70"
            >
              <code>{`npm create @minecms/minecms-app my-app -- --next -y
cd my-app
docker compose -f cms/docker-compose.yml up -d
pnpm dev

# Studio → http://localhost:3333/admin
# Сайт   → http://localhost:3000`}</code>
            </pre>

            <div
              data-reveal
              className="mt-14 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-10"
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
          <Shell wide>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[clamp(2rem,6vw,4rem)] font-normal leading-none tracking-[-0.04em]">
                  MineCMS
                </p>
                <p className="mt-5 text-sm text-[#121212]/40">
                  MIT · Node 24+ · pnpm 10+
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
