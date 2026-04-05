"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="relative h-full pointer-events-none">
      <div
        data-scrollable
        className="h-full overflow-y-auto flex items-center px-8 md:px-16 lg:px-24 py-8 pointer-events-auto"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[#6c63ff] text-sm tracking-[0.3em] uppercase font-medium mb-4 text-center"
          >
            Get In Touch
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Let&apos;s Work{" "}
            <span className="bg-gradient-to-r from-[#6c63ff] to-[#ff6b6b] bg-clip-text text-transparent">
              Together
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-white/75 text-center mb-8 max-w-md mx-auto"
          >
            Have a project in mind? I&apos;d love to hear about it.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
              className="space-y-5"
            >
              {[
                {
                  icon: "✉️",
                  label: "Email",
                  value: "nguyenhaidan13112000@gmail.com",
                },
                {
                  icon: "📞",
                  label: "Phone",
                  value: "0982751895",
                },
                { icon: "📍", label: "Location", value: "Hanoi, Vietnam" },
                {
                  icon: "💼",
                  label: "Availability",
                  value: "Open to opportunities",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/60 text-xs uppercase tracking-wider">
                      {item.label}
                    </p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex gap-4 pt-4 flex-wrap"
              >
                {[
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/nhd1311/",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: "rgba(108, 99, 255, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/85 text-sm hover:text-white transition-colors"
                  >
                    {social.label}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
              onSubmit={handleSubmit}
              className="space-y-4 backdrop-blur-xl bg-[#100818]/75 border border-white/10 rounded-2xl p-8"
            >
              {[
                {
                  name: "name",
                  label: "Your Name",
                  type: "text",
                  placeholder: "John Doe",
                },
                {
                  name: "email",
                  label: "Email Address",
                  type: "email",
                  placeholder: "john@example.com",
                },
              ].map((field, i) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                >
                  <label className="block text-white/75 text-xs uppercase tracking-wider mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field.name]: e.target.value })
                    }
                    className="w-full bg-[#100818]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#6c63ff] transition-colors text-sm"
                  />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.56, duration: 0.5 }}
              >
                <label className="block text-white/75 text-xs uppercase tracking-wider mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-[#100818]/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-[#6c63ff] transition-colors text-sm resize-none"
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(108, 99, 255, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#6c63ff] to-[#a855f7] text-white font-medium transition-all"
              >
                {sent ? "Message Sent! ✓" : "Send Message →"}
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
