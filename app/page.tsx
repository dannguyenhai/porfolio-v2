"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/ui/HeroSection";
import AboutSection from "@/components/ui/AboutSection";
import ProjectsSection from "@/components/ui/ProjectsSection";
import ContactSection from "@/components/ui/ContactSection";
import CometCursor from "@/components/ui/CometCursor";

const Scene = dynamic(() => import("@/components/canvas/Scene"), {
  ssr: false,
});

const SECTIONS = ["hero", "about", "projects", "contact"];
// Sections that have inner-scrollable content (by index)
const SCROLLABLE_SECTIONS = new Set([2, 3, 4]);
// Lock duration = exit(500) + enter(600) + buffer(100)
const TRANSITION_DURATION = 1200;

const sectionVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? "5%" : "-5%",
    opacity: 0,
    filter: "blur(6px)",
  }),
  center: {
    y: "0%",
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: (dir: number) => ({
    y: dir > 0 ? "-5%" : "5%",
    opacity: 0,
    filter: "blur(6px)",
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

function SectionComponents({
  index,
  onNavigate,
}: {
  index: number;
  onNavigate: (i: number) => void;
}) {
  switch (index) {
    case 0:
      return <HeroSection onNavigate={onNavigate} />;
    case 1:
      return <AboutSection />;
    case 2:
      return <ProjectsSection />;
    case 3:
      return <ContactSection />;
    default:
      return null;
  }
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const isLocked = useRef(false);
  const touchStartY = useRef(0);

  const goTo = useCallback((next: number, dir: number) => {
    if (isLocked.current) return;
    if (next < 0 || next >= SECTIONS.length) return;
    isLocked.current = true;
    setDirection(dir);
    setCurrent(next);
    setTimeout(() => {
      isLocked.current = false;
    }, TRANSITION_DURATION);
  }, []);

  const navigate = useCallback(
    (index: number) => {
      if (index === current) return;
      goTo(index, index > current ? 1 : -1);
    },
    [current, goTo],
  );

  // Wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // For sections with inner scrollable content, check boundary first
      if (SCROLLABLE_SECTIONS.has(current)) {
        const el = document.querySelector(
          "[data-scrollable]",
        ) as HTMLElement | null;
        if (el) {
          const atTop = el.scrollTop <= 1;
          const atBottom =
            el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
            // Still inside section — let browser scroll naturally
            return;
          }
        }
      }

      e.preventDefault();
      if (Math.abs(e.deltaY) < 20) return;
      if (e.deltaY > 0) goTo(current + 1, 1);
      else goTo(current - 1, -1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [current, goTo]);

  // Touch
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 50) return;
      if (delta > 0) goTo(current + 1, 1);
      else goTo(current - 1, -1);
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [current, goTo]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") goTo(current + 1, 1);
      if (e.key === "ArrowUp" || e.key === "PageUp") goTo(current - 1, -1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  return (
    <main
      className="relative h-screen w-screen overflow-hidden"
      style={{ cursor: "none" }}
    >
      {/* Fixed galaxy background */}
      <div className="fixed inset-0 z-0">
        <Scene />
      </div>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-30 pointer-events-auto">
        <Navbar currentSection={current} onNavigate={navigate} />
      </div>

      {/* Section content */}
      <AnimatePresence mode="sync" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={sectionVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="fixed inset-0 z-10 pt-16 pointer-events-none"
        >
          <SectionComponents index={current} onNavigate={navigate} />
        </motion.div>
      </AnimatePresence>

      {/* Comet cursor */}
      <CometCursor />

      {/* Dot navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 pointer-events-auto">
        {SECTIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => navigate(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-2 h-6 bg-[#6c63ff]"
                : "w-2 h-2 bg-white/25 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Section counter */}
      <div className="fixed bottom-8 left-8 z-40 text-white/20 text-xs font-mono pointer-events-none">
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(SECTIONS.length).padStart(2, "0")}
      </div>
    </main>
  );
}
