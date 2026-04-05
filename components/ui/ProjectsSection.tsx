"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Synctrack Returns & Exchanges",
    description:
      "Shopify app for managing returns & exchanges, serving merchants worldwide. Maintained and developed new features, mentored interns, and optimized system performance.",
    tags: [
      "ReactJS",
      "NestJS",
      "TypeScript",
      "Shopify Polaris",
      "MySQL",
      "GraphQL",
    ],
    gradient: "from-[#6c63ff] to-[#a855f7]",
    image: "/images/synctrack-logo.png",
    link: "https://apps.shopify.com/omega-returns-drive",
    period: "Apr 2025 – Present",
  },
  {
    title: "Magnify Health",
    description:
      "Health blog platform for Singapore market — allows users to upload, manage, and share health articles. Built the codebase and worked closely with the design team.",
    tags: [
      "Next.js",
      "TypeScript",
      "Strapi",
      "React-Query",
      "Redux Saga",
      "SCSS",
    ],
    gradient: "from-[#1dd1a1] to-[#10ac84]",
    image: "🏥",
    link: "https://magnifyhealth.sg",
    period: "Dec 2024 – Apr 2025",
  },
  {
    title: "Crafted-Data",
    description:
      "AI-powered chat assistant for customer account analysis. Integrated QuickBooks financial data via Fivetran into BigQuery, built frontend and REST APIs.",
    tags: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Firebase",
      "AWS",
      "Docker",
    ],
    gradient: "from-[#ff9f43] to-[#ee5a24]",
    image: "🤖",
    link: null,
    period: "Aug 2024 – Dec 2024",
  },
  {
    title: "Jobcadu",
    description:
      "AI-powered recruitment platform for Thailand market. Uses GPT to help job seekers build resumes and employers post listings. Includes Stripe payments and real-time features.",
    tags: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "PostgreSQL",
      "Stripe",
      "AWS",
      "Socket.IO",
    ],
    gradient: "from-[#54a0ff] to-[#2e86de]",
    image: "💼",
    link: "https://jobcadu.com",
    period: "Nov 2023 – Aug 2024",
  },
  {
    title: "Jivedoctor",
    description:
      "Mobile application for doctors to record diagnoses and save audio. Recordings can be accessed, edited, and downloaded. Built for Singapore healthcare provider.",
    tags: ["React Native", "TypeScript", "Redux Saga", "Socket.IO", "Formik"],
    gradient: "from-[#fd79a8] to-[#e84393]",
    image: "🩺",
    link: null,
    period: "Apr 2023 – Sep 2023",
  },
  {
    title: "Forum Bulletin Board",
    description:
      "Interactive community platform for Singapore client. Users can post videos and images with captions. Admins can moderate content with exclusive delete permissions.",
    tags: [
      "React.js",
      "TypeScript",
      "React-Query",
      "Redux Saga",
      "Tailwind CSS",
    ],
    gradient: "from-[#ff6b6b] to-[#feca57]",
    image: "💬",
    link: null,
    period: "Feb 2023 – Apr 2023",
  },
];

export default function ProjectsSection() {
  return (
    <section className="relative h-full pointer-events-none">
      <div
        data-scrollable
        className="h-full overflow-y-auto px-8 md:px-16 lg:px-24 pt-3 pb-2 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-[#6c63ff] to-[#ff6b6b] bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.15 + (i % 3) * 0.1 + Math.floor(i / 3) * 0.15,
                  duration: 0.6,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative backdrop-blur-xl bg-[#100818]/75 border border-white/10 rounded-2xl p-4 overflow-hidden hover:border-white/25 transition-colors duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none`}
                />

                <div className="flex items-start justify-between mb-2">
                  <div className="text-3xl">
                    {project.image?.match(/\.(png|jpg|jpeg|webp|svg)/) ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-10 h-10 object-contain rounded-lg"
                      />
                    ) : (
                      project.image
                    )}
                  </div>
                  <span className="text-white/50 text-xs">
                    {project.period}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed mb-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/85"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 inline-flex items-center gap-1 text-[#6c63ff] text-xs hover:text-[#a855f7] transition-colors"
                  >
                    View Live →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
