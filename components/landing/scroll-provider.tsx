"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Обёртка для GSAP ScrollTrigger без Lenis — нативный скролл. */
export function ScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let raf = 0;
    const refresh = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    const resizeObserver = new ResizeObserver(refresh);
    resizeObserver.observe(document.body);

    refresh();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      resizeObserver.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return children;
}
