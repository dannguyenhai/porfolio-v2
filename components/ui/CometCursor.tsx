"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  hue: number;
}

interface TrailPoint {
  x: number;
  y: number;
  age: number; // 0 = newest, increases over time
}

const TRAIL_LENGTH = 28;
const LERP_FACTOR = 0.18; // lower = smoother/lazier follow

export default function CometCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const trail = useRef<TrailPoint[]>([]);
  const rawMouse = useRef({ x: -999, y: -999 }); // actual cursor
  const smoothMouse = useRef({ x: -999, y: -999 }); // lerped position
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      rawMouse.current = { x: e.clientX, y: e.clientY };

      // Spawn sparkles from raw position
      if (Math.random() < 0.5) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.2 + 0.2;
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6,
          alpha: Math.random() * 0.5 + 0.5,
          size: Math.random() * 2 + 0.8,
          hue: 200 + Math.random() * 100,
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Lerp smooth mouse toward raw ---
      const sm = smoothMouse.current;
      const rm = rawMouse.current;
      sm.x += (rm.x - sm.x) * LERP_FACTOR;
      sm.y += (rm.y - sm.y) * LERP_FACTOR;

      // --- Record trail from smooth position ---
      trail.current.unshift({ x: sm.x, y: sm.y, age: 0 });
      if (trail.current.length > TRAIL_LENGTH) trail.current.length = TRAIL_LENGTH;
      trail.current.forEach((p) => p.age++);

      // --- Draw trail as a continuous smooth curve ---
      if (trail.current.length > 2) {
        for (let i = 1; i < trail.current.length; i++) {
          const prev = trail.current[i - 1];
          const curr = trail.current[i];
          const t = 1 - i / trail.current.length; // 1 = head, 0 = tail

          const lineWidth = 1 + t * 6;
          const alpha = t * t * 0.9; // quadratic fade — smoother than linear
          const hue = 200 + (1 - t) * 70; // cyan head → purple tail
          const lightness = 55 + t * 25;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);
          ctx.strokeStyle = `hsla(${hue}, 100%, ${lightness}%, ${alpha})`;
          ctx.lineWidth = lineWidth;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowBlur = t > 0.5 ? 14 * t : 0;
          ctx.shadowColor = `hsla(${hue}, 100%, 75%, 0.6)`;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      // --- Draw comet head at smooth position ---
      const { x, y } = sm;
      if (x > -100) {
        // Outer halo
        const halo = ctx.createRadialGradient(x, y, 0, x, y, 22);
        halo.addColorStop(0, "rgba(160, 190, 255, 0.5)");
        halo.addColorStop(0.5, "rgba(108, 99, 255, 0.25)");
        halo.addColorStop(1, "rgba(108, 99, 255, 0)");
        ctx.beginPath();
        ctx.arc(x, y, 22, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.shadowBlur = 30;
        ctx.shadowColor = "rgba(130, 110, 255, 0.8)";
        ctx.fill();

        // Core glow
        const core = ctx.createRadialGradient(x, y, 0, x, y, 10);
        core.addColorStop(0, "rgba(230, 240, 255, 1)");
        core.addColorStop(0.5, "rgba(150, 140, 255, 0.8)");
        core.addColorStop(1, "rgba(108, 99, 255, 0)");
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = core;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "rgba(200, 200, 255, 1)";
        ctx.fill();

        // Bright center dot
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.shadowBlur = 12;
        ctx.shadowColor = "white";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // --- Update & draw sparkle particles ---
      particles.current = particles.current.filter((p) => p.alpha > 0.01 && p.size > 0.05);
      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.97;
        p.alpha *= 0.9;
        p.size *= 0.94;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 72%, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 80%, 0.5)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[9999] pointer-events-none" />;
}
