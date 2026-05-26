"use client";

import { motion } from "framer-motion";
import {
  Coffee,
  Droplets,
  Moon,
  Utensils,
  Zap,
  CheckCircle,
} from "lucide-react";
import "@/app/globals.css";

export default function PreTattooGuide() {
  const protocols = [
    {
      title: "Hydration & Nutrition",
      icon: <Utensils size={20} />,
      desc: "Eat a substantial meal 2-3 hours before your session. Maintaining stable blood sugar prevents lightheadedness. Drink plenty of water the day before to ensure your skin is supple and receptive to ink.",
    },
    {
      title: "Rest & Recovery",
      icon: <Moon size={20} />,
      desc: "A full night's sleep is mandatory. Your body's pain tolerance is significantly higher when well-rested. Avoid strenuous workouts immediately before your appointment.",
    },
    {
      title: "Substance Protocol",
      icon: <Droplets size={20} />,
      desc: "Strictly avoid alcohol, aspirin, or excessive caffeine for 24 hours prior. These act as blood thinners, which can lead to excessive bleeding and impact the final saturation of the ink.",
    },
    {
      title: "Skin Preparation",
      icon: <Zap size={20} />,
      desc: "Do not sunbathe or use tanning beds. We cannot tattoo over sunburnt or peeling skin. Arrive with the area clean; your artist will handle any necessary shaving to prevent skin irritation.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-[#E11D5C] pb-32">
      {/* HERO HEADER */}
      <header className="pt-32 pb-20 px-6 border-b border-zinc-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[#E11D5C] font-bold uppercase tracking-[0.6em] text-[10px] mb-4"
          >
            Preparation Protocol
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-serif italic text-white tracking-tighter leading-none"
          >
            Before the <br />{" "}
            <span className="text-zinc-800">First Spark.</span>
          </motion.h1>
        </div>
      </header>

      {/* ESSENTIALS LIST */}
      <main className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 gap-32">
          {protocols.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col md:flex-row gap-12 md:items-start"
            >
              {/* Numbering Background */}
              <span className="absolute -top-16 -left-4 text-[12rem] font-black text-zinc-900/20 select-none group-hover:text-[#E11D5C]/5 transition-colors duration-700">
                0{index + 1}
              </span>

              <div className="z-10 flex-shrink-0">
                <div className="w-16 h-16 border border-zinc-800 flex items-center justify-center text-[#E11D5C] group-hover:border-[#E11D5C] transition-colors">
                  {item.icon}
                </div>
              </div>

              <div className="z-10 space-y-6 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">
                  {item.title}
                </h2>
                <p className="text-lg md:text-xl text-zinc-100 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* FINAL CHECKLIST CTA */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="bg-zinc-950 border border-zinc-900 p-12 md:p-20 text-center space-y-8">
          <div className="flex justify-center">
            <CheckCircle size={48} className="text-[#E11D5C]" />
          </div>
          <h3 className="text-3xl font-serif italic text-white">
            Ready for the Chair?
          </h3>
          <p className="text-zinc-500 max-w-md mx-auto text-sm leading-relaxed uppercase tracking-widest font-bold">
            Following these steps ensures your skin is the perfect canvas for a
            lifetime piece.
          </p>
          <div className="pt-8">
            <button
              onClick={() => window.history.back()}
              className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#E11D5C] hover:text-white transition-all"
            >
              Return to Studio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
