"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteNav } from "@/components/site-nav";
import { Container } from "@/components/landing/section-layout";

const FADE_RANGE = 140;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function SiteHeader() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [bgOpacity, setBgOpacity] = useState(isLanding ? 0 : 1);

  useEffect(() => {
    if (!isLanding) {
      setBgOpacity(1);
      return;
    }

    const hero = document.getElementById("hero");
    if (!hero) return;

    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const headerHeight =
          document.querySelector("header")?.getBoundingClientRect().height ??
          84;
        const heroBottom = hero.getBoundingClientRect().bottom;
        const progress = clamp(
          1 - (heroBottom - headerHeight) / FADE_RANGE,
          0,
          1,
        );
        setBgOpacity(progress);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [isLanding]);

  const solid = !isLanding || bgOpacity > 0.65;

  return (
    <header
      className={
        isLanding
          ? "fixed inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b border-[#121212]/8 bg-white"
      }
    >
      {isLanding ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 border-b"
          style={{
            backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
            borderColor: `rgba(18, 18, 18, ${bgOpacity * 0.08})`,
          }}
        />
      ) : null}
      <Container className="relative flex items-center justify-between py-6 md:py-8">
        <Link
          href="/"
          className={`text-[13px] font-medium tracking-[0.22em] uppercase transition-colors duration-300 hover:opacity-60 ${
            solid ? "text-[#121212]" : "text-white"
          }`}
        >
          MineCMS
        </Link>
        <SiteNav variant={solid ? "default" : "hero"} />
      </Container>
    </header>
  );
}
