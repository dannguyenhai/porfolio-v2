"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "Full Stack Developer",
  "React.js / Next.js Expert",
  "Node.js / NestJS Developer",
  "Shopify Developer",
];

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

interface HeroSectionProps {
  onNavigate: (index: number) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-xl">
          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-[#6c63ff] text-sm tracking-[0.3em] uppercase font-medium mb-4"
          >
            Welcome to my portfolio
          </motion.p>

          <motion.h1
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-4"
          >
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-[#6c63ff] via-[#a855f7] to-[#ff6b6b] bg-clip-text text-transparent">
              Dan Nguyen
            </span>
          </motion.h1>

          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-xl md:text-2xl text-white/85 mb-8 h-8 overflow-hidden"
          >
            <motion.span
              key={roleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="block"
            >
              {roles[roleIndex]}
            </motion.span>
          </motion.div>

          <motion.p
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-white/75 text-base md:text-lg leading-relaxed mb-10 max-w-md"
          >
            Full Stack Developer with 3+ years of experience building scalable,
            high-performance web applications. Passionate about React.js,
            Next.js, Node.js, and delivering great user experiences.
          </motion.p>

          <motion.div
            variants={item}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.55, duration: 0.7 }}
            className="flex gap-4 pointer-events-auto select-none"
          >
            <motion.button
              onClick={() => onNavigate(2)}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(108, 99, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#6c63ff] to-[#a855f7] text-white font-medium transition-all"
            >
              View My Work
            </motion.button>
            <motion.button
              onClick={() => onNavigate(3)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border border-white/20 text-white/80 hover:border-white/50 hover:text-white transition-all backdrop-blur-sm"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-12 bg-gradient-to-b from-[#6c63ff] to-transparent"
        />
      </motion.div>
    </section>
  );
}
