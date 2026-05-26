"use client";

import { motion } from "framer-motion";
import { Shield, Eye, Lock, FileText } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Data Collection",
      icon: <Eye size={18} />,
      content:
        "We collect information you provide directly to us, such as when you submit a review or request a consultation. This may include your name, email address, and any imagery or project details shared during the creative process.",
    },
    {
      title: "Utilization of Data",
      icon: <Shield size={18} />,
      content:
        "Your data is used strictly to enhance your experience. This includes personalizing our service, verifying testimonial authenticity, and maintaining a secure archive of client history. We do not sell your personal narratives to third parties.",
    },
    {
      title: "Digital Security",
      icon: <Lock size={18} />,
      content:
        "We implement industry-standard encryption to protect your records. While no digital transmission is 100% secure, our architecture is built to minimize exposure and ensure your project details remain confidential.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-[#E11D5C] pb-24">
      {/* HEADER SECTION */}
      <header className="pt-32 pb-20 px-6 border-b border-zinc-900/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-10 h-[1px] bg-[#E11D5C]" />
            <span className="text-[#E11D5C] font-black uppercase tracking-[0.5em] text-[10px]">
              Legal Protocol
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter leading-none"
          >
            Privacy <br /> <span className="text-zinc-800">Standard.</span>
          </motion.h1>
        </div>
      </header>

      {/* POLICY CONTENT */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="space-y-24">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-[150px_1fr] gap-8 md:gap-16"
            >
              {/* Sidebar Label */}
              <div className="flex items-center md:items-start gap-4">
                <div className="p-3 border border-zinc-900 text-[#E11D5C]">
                  {section.icon}
                </div>
                <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-zinc-600 italic">
                  0{index + 1}
                </span>
              </div>

              {/* Text Block */}
              <div className="space-y-6">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white">
                  {section.title}
                </h2>
                <p className="text-lg md:text-xl text-zinc-100 leading-relaxed font-medium">
                  {section.content}
                </p>
              </div>
            </motion.section>
          ))}

          {/* FINAL NOTICE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-zinc-950 border border-zinc-900 p-10 mt-32"
          >
            <div className="flex items-center gap-2 mb-4">
              <FileText size={14} className="text-[#E11D5C]" />
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white">
                Document Update
              </h3>
            </div>
            <p className="text-sm text-zinc-500 leading-loose">
              This policy was last refined on May 26, 2026. We reserve the right
              to evolve these standards as our studio grows. Continued use of
              our digital portal signifies your agreement to these protocols.
            </p>
          </motion.div>
        </div>
      </main>

      {/* BACK BUTTON */}
      <footer className="max-w-4xl mx-auto px-6 pt-12">
        <button
          onClick={() => window.history.back()}
          className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 hover:text-[#E11D5C] transition-colors flex items-center gap-4"
        >
          <div className="w-8 h-[1px] bg-zinc-800 group-hover:bg-[#E11D5C]" />
          Return to Studio
        </button>
      </footer>
    </div>
  );
}
