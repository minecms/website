"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  phase: number;
};

const BG = "#070b12";
const GRID = "rgba(56, 189, 248, 0.07)";
const GRID_BRIGHT = "rgba(56, 189, 248, 0.14)";
const NODE = "rgba(125, 211, 252, 0.85)";
const LINK = "rgba(56, 189, 248, 0.12)";

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
    let gridOffset = 0;
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
      const count = Math.floor((width * height) / 45000);
      for (let i = 0; i < Math.max(count, 18); i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.75,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.06,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawGrid = (time: number) => {
      if (!prefersReducedMotion) {
        gridOffset = (gridOffset + 0.35) % 64;
      }

      const horizon = height * 0.58;
      const spacing = 56;

      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.08,
        0,
        width * 0.5,
        height * 0.2,
        width * 0.7,
      );
      glow.addColorStop(0, "rgba(14, 165, 233, 0.12)");
      glow.addColorStop(1, "rgba(14, 165, 233, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (let y = horizon; y < height + spacing; y += spacing * 0.55) {
        const progress = (y - horizon) / (height - horizon);
        const alpha = 0.04 + progress * 0.12;
        ctx.beginPath();
        ctx.moveTo(0, y + gridOffset * progress * 0.3);
        ctx.lineTo(width, y + gridOffset * progress * 0.3);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const vanishX = width * 0.5;
      const lines = 14;
      for (let i = -lines; i <= lines; i++) {
        const x = vanishX + i * spacing * 0.9;
        ctx.beginPath();
        ctx.moveTo(vanishX, horizon * 0.55);
        ctx.lineTo(x, height);
        ctx.strokeStyle = GRID;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const scanY =
        horizon +
        ((time * 0.04) % (height - horizon));
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
      scanGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
      scanGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.08)");
      scanGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 40, width, 80);

      for (let x = 0; x < width; x += spacing) {
        const pulse = 0.5 + Math.sin(time * 0.0015 + x * 0.02) * 0.5;
        ctx.fillStyle = `rgba(56, 189, 248, ${0.03 * pulse})`;
        ctx.fillRect(x, horizon, 1, height - horizon);
      }

      ctx.strokeStyle = GRID_BRIGHT;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(width, horizon);
      ctx.stroke();
    };

    const drawNetwork = (time: number) => {
      const linkDistance = Math.min(width, height) * 0.16;

      for (const node of nodes) {
        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height * 0.8) node.vy *= -1;
        }

        const pulse = 0.6 + Math.sin(time * 0.002 + node.phase) * 0.4;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.2 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = NODE;
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist > linkDistance) continue;

          const alpha = (1 - dist / linkDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    };

    const render = (time: number) => {
      drawGrid(time);
      drawNetwork(time);
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
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#070b12]" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,165,233,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f4f2ee]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#f4f2ee_92%)]" />
    </div>
  );
}
