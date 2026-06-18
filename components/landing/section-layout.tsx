import type { ComponentPropsWithoutRef, ReactNode } from "react";

const CONTAINER =
  "mx-auto w-full max-w-[90rem] px-6 md:px-10 lg:px-16 xl:px-24";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`w-full ${className}`}>
      {children}
    </section>
  );
}

export function Container({
  children,
  className = "",
  narrow = false,
}: {
  children: ReactNode;
  className?: string;
  /** Узкая колонка для текста (~42rem). */
  narrow?: boolean;
}) {
  return (
    <div
      className={`${CONTAINER} ${narrow ? "max-w-3xl" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionIntro({
  children,
  className = "",
  align = "left",
  ...props
}: {
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
} & ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...props}
      className={`${align === "center" ? "mx-auto max-w-4xl text-center" : "max-w-4xl"} ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionLabel({
  children,
  invert = false,
}: {
  children: ReactNode;
  invert?: boolean;
}) {
  return (
    <p
      className={`text-[11px] uppercase tracking-[0.28em] ${
        invert ? "text-white/50" : "text-[#121212]/60"
      }`}
    >
      {children}
    </p>
  );
}

export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance text-[clamp(2rem,4.5vw,3.75rem)] font-normal leading-[1.08] tracking-[-0.04em] ${className}`}
    >
      {children}
    </h2>
  );
}

export function FullBleedMarquee({ children }: { children: ReactNode }) {
  return (
    <div className="landing-marquee relative w-full overflow-hidden py-8 md:py-10">
      {children}
    </div>
  );
}
