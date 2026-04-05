"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "React.js / Next.js", level: 95 },
  { name: "TypeScript / JavaScript", level: 92 },
  { name: "Node.js / NestJS / Express.js", level: 88 },
  { name: "PostgreSQL / MongoDB / MySQL", level: 82 },
  { name: "AWS / Docker / DevOps", level: 78 },
  { name: "React Native", level: 75 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (delay = 0) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.65, ease: "easeOut" } }),
};

export default function AboutSection() {
  return (
    <section className="relative h-full flex items-center px-8 md:px-16 lg:px-24 py-24 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left */}
          <div className="flex-1">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={fadeUp.show(0.05)}
              className="text-[#6c63ff] text-sm tracking-[0.3em] uppercase font-medium mb-4"
            >
              About Me
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Crafting Digital{" "}
              <span className="bg-gradient-to-r from-[#6c63ff] to-[#ff6b6b] bg-clip-text text-transparent">
                Experiences
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.65 }}
              className="text-white/85 text-base leading-relaxed mb-4"
            >
              I&apos;m a Full Stack Developer with 3+ years of experience, primarily working with
              React.js, Next.js, Node.js, NestJS and Express.js. I graduated from Posts and
              Telecommunications Institute of Technology (Computer Science, 2018–2023).
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.65 }}
              className="text-white/85 text-base leading-relaxed"
            >
              Passionate about building scalable, high-performance applications across
              various industries — from Shopify e-commerce and AI-powered tools to healthcare
              and recruitment platforms. Outside of work: badminton, football, e-sports.
            </motion.p>
          </div>

          {/* Right: Skills */}
          <div className="flex-1 w-full">
            <motion.p
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-white/75 text-sm mb-6 uppercase tracking-wider"
            >
              Skills & Expertise
            </motion.p>
            <div className="space-y-4">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.55, ease: "easeOut" }}
                >
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white/80">{skill.name}</span>
                    <span className="text-[#6c63ff]">{skill.level}%</span>
                  </div>
                  <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.35 + i * 0.07, duration: 0.9, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#6c63ff] to-[#ff6b6b] rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
