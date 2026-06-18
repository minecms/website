"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
};

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;
    const nodes: Node[] = [];
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seedNodes = () => {
      nodes.length = 0;
      const count = Math.floor((width * height) / 32000);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          radius: 0.8 + Math.random() * 1.6,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawField = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const linkDistance = Math.min(width, height) * 0.12;

      for (const node of nodes) {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < -20) node.x = width + 20;
          if (node.x > width + 20) node.x = -20;
          if (node.y < -20) node.y = height + 20;
          if (node.y > height + 20) node.y = -20;
        }

        const pulse = 0.5 + Math.sin(time * 0.002 + node.phase) * 0.3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(244, 242, 238, 0.42)";
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > linkDistance) continue;

          const alpha = (1 - dist / linkDistance) * 0.14;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(210, 175, 120, ${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    const render = (time: number) => {
      drawField(time);
      raf = requestAnimationFrame(render);
    };

    resize();
    seedNodes();
    raf = requestAnimationFrame(render);

    const onResize = () => {
      resize();
      seedNodes();
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/video/hero-loop.mp4" type="video/mp4" />
      </video>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70 mix-blend-screen" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(210,175,120,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0e0d0c]/20 via-transparent to-[#f4f2ee]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,#f4f2ee_88%)]" />
    </div>
  );
}
