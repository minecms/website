"use client";

export function HeroVideo() {
  return (
    <div className="absolute inset-0">
      <video
        className="pointer-events-none h-full w-full object-cover object-center"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src="/video/intro.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/45" aria-hidden />
    </div>
  );
}
