"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
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
          y: 48,
          opacity: 0,
          duration: 1,
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
          y: -80,
          scale: 1.04,
          ease: "none",
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-pin-text]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 40%",
          end: "bottom 60%",
          pin: el.querySelector("[data-pin-inner]"),
          pinSpacing: false,
          anticipatePin: 1,
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

        <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 mix-blend-difference md:px-10 md:py-8">
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
        </header>

        <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-16 pt-32 text-[#f4f2ee] md:px-10 md:pb-24">
          <HeroBackground />

          <div className="relative z-10">
            <p
              data-hero-meta
              className="mb-8 max-w-xl text-[13px] leading-relaxed tracking-wide text-[#f4f2ee]/55"
            >
              Headless CMS на TypeScript · self-hosted · vendor-neutral
            </p>

            <h1 className="max-w-[14ch] text-[clamp(2.75rem,9vw,7.5rem)] font-normal leading-[0.92] tracking-[-0.04em]">
              <span data-hero-line className="block">
                Схемы
              </span>
              <span data-hero-line className="block text-[#f4f2ee]/40">
                в коде.
              </span>
              <span data-hero-line className="block">
                CMS из коробки.
              </span>
            </h1>

            <p
              data-hero-meta
              className="mt-10 max-w-md text-base leading-relaxed text-[#f4f2ee]/60 md:text-lg"
            >
              Опиши контент-модели в TypeScript — получи Studio, REST API и
              типизированный SDK из одного источника правды.
            </p>

            <div data-scroll-hint className="mt-20 flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-[#f4f2ee]/35">
              <span className="h-px w-8 bg-current" />
              scroll
            </div>
          </div>
        </section>

        <div className="overflow-hidden py-6">
          <div className="marquee-track flex w-max gap-10 text-[clamp(1.5rem,4vw,3rem)] tracking-[-0.03em] text-[#121212]/12">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={`${item}-${i}`} className="whitespace-nowrap">
                {item}
                <span className="mx-10 text-[#121212]/20">·</span>
              </span>
            ))}
          </div>
        </div>

        <section className="px-6 py-24 md:px-10 md:py-32">
          <div data-reveal className="mb-16 max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#121212]/40">
              Studio
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.03em]">
              Панель, которая строится сама — по вашим схемам
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[#121212]/55">
              Списки, формы, медиа и CRUD без ручной вёрстки. Изменили
              minecms.config.ts — Studio и API обновились вместе с кодом.
            </p>
          </div>

          <div
            data-parallax
            className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[2/1]"
          >
            <div data-parallax-inner className="absolute inset-[-8%]">
              <Image
                src="/images/studio-visual.png"
                alt="Абстрактная визуализация схем данных MineCMS Studio"
                fill
                className="object-cover object-center"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-10 md:py-36">
          <div className="grid gap-20 md:grid-cols-[1fr_2fr] md:gap-16">
            {FEATURES.map((feature) => (
              <article key={feature.num} data-reveal className="group">
                <span className="text-[11px] tabular-nums tracking-[0.3em] text-[#121212]/30">
                  {feature.num}
                </span>
                <h3 className="mt-4 text-2xl tracking-[-0.02em] md:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-[#121212]/55">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          data-pin-text
          className="relative min-h-[90vh] px-6 py-24 md:px-10 md:py-32"
        >
          <div
            data-pin-inner
            className="max-w-xs md:absolute md:left-10 md:top-1/2 md:-translate-y-1/2"
          >
            <p data-reveal className="text-[11px] uppercase tracking-[0.3em] text-[#121212]/40">
              Установка
            </p>
            <h2
              data-reveal
              className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.03em]"
            >
              Готово за минуты — визард в Studio
            </h2>
            <p
              data-reveal
              className="mt-6 text-base leading-relaxed text-[#121212]/55"
            >
              PostgreSQL, администратор, первый документ. Без облачных
              подписок и чужих панелей.
            </p>
          </div>

          <div
            data-parallax
            className="relative mt-16 aspect-[4/3] w-full overflow-hidden md:ml-auto md:mt-0 md:w-[72%]"
          >
            <div data-parallax-inner className="absolute inset-[-6%]">
              <Image
                src="/images/install-visual.png"
                alt="Абстрактная визуализация быстрого запуска MineCMS"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 72vw"
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-10 md:py-36">
          <p data-reveal className="text-[11px] uppercase tracking-[0.3em] text-[#121212]/40">
            Архитектура
          </p>
          <h2
            data-reveal
            className="mt-4 max-w-3xl text-[clamp(1.75rem,4vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.03em]"
          >
            Один контракт — три поверхности: API, админка, клиент
          </h2>

          <div
            data-reveal
            className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[clamp(0.85rem,2vw,1.1rem)] text-[#121212]/70"
          >
            {STACK.map((item, i) => (
              <span key={item} className="flex items-center gap-4">
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
            className="mt-12 max-w-2xl text-base leading-relaxed text-[#121212]/55"
          >
            Fastify + tRPC на сервере, Vite + React в Studio, типизированный
            REST-клиент в SDK. Схемы сериализуются один раз — UI и валидация
            всегда синхронны.
          </p>

          <div
            data-parallax
            className="relative mt-20 aspect-[21/9] w-full overflow-hidden"
          >
            <div data-parallax-inner className="absolute inset-[-6%]">
              <Image
                src="/images/architecture-visual.png"
                alt="Абстрактная визуализация архитектуры MineCMS"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-10 md:py-36">
          <p data-reveal className="text-[11px] uppercase tracking-[0.3em] text-[#121212]/40">
            Быстрый старт
          </p>

          <pre
            data-reveal
            className="mt-8 overflow-x-auto font-mono text-[clamp(0.8rem,1.6vw,0.95rem)] leading-[1.9] text-[#121212]/75"
          >
            <code>{`npm create @minecms/minecms-app my-app -- --next -y
cd my-app
docker compose -f cms/docker-compose.yml up -d
pnpm dev

# Studio → http://localhost:3333/admin
# Сайт   → http://localhost:3000`}</code>
          </pre>

          <div data-reveal className="mt-12 flex flex-wrap items-center gap-8">
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
        </section>

        <footer className="px-6 pb-16 pt-8 md:px-10 md:pb-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[clamp(2rem,6vw,4.5rem)] font-normal leading-none tracking-[-0.04em]">
                MineCMS
              </p>
              <p className="mt-4 text-sm text-[#121212]/40">
                MIT · Node 24+ · pnpm 10+
              </p>
            </div>
            <p className="text-sm text-[#121212]/35">
              hello@minecms.ru
            </p>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}
