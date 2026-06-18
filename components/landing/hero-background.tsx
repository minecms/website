"use client";

export function HeroVideo() {
  return (
    <video
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden
    >
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  );
}
