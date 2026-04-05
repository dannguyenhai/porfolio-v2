"use client";

import { motion } from "framer-motion";

const navLinks = [
  { label: "Home", index: 0 },
  { label: "About", index: 1 },
  { label: "Projects", index: 2 },
  { label: "Contact", index: 3 },
];

interface NavbarProps {
  currentSection: number;
  onNavigate: (index: number) => void;
}

export default function Navbar({ currentSection, onNavigate }: NavbarProps) {
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-auto px-8 py-4 backdrop-blur-xl bg-black/10 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate(0)}
          className="text-xl font-bold bg-gradient-to-r from-[#6c63ff] to-[#ff6b6b] bg-clip-text text-transparent cursor-pointer"
        >
          DN.
        </motion.div>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.3 }}
            >
              <button
                onClick={() => onNavigate(link.index)}
                className={`text-sm tracking-wider uppercase font-medium relative group transition-colors ${
                  currentSection === link.index
                    ? "text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-[#6c63ff] to-[#ff6b6b] transition-all duration-300 ${
                    currentSection === link.index
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            </motion.li>
          ))}
        </ul>

        <motion.button
          onClick={() => onNavigate(3)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-5 py-2 rounded-full border border-[#6c63ff] text-[#6c63ff] text-sm font-medium hover:bg-[#6c63ff] hover:text-white transition-all duration-300"
        >
          Hire Me
        </motion.button>
      </div>
    </motion.nav>
  );
}
