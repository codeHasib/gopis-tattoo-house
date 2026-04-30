"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MyselfImg from "../../../public/images/myself.jpg";

export default function AboutSection() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* LEFT SIDE: IMAGE WITH ANIMATED FRAME */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative group"
          >
            {/* Decorative Pink Border Accent */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-[#E11D5C] z-0" />

            <div className="relative z-10 aspect-[4/5] overflow-hidden transition-all duration-700 shadow-2xl">
              <Image
                src={MyselfImg} // Replace with your friend's image path
                alt="Lead Artist Portrait"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Floating Decorative Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -right-8 bg-black text-white p-8 hidden md:block"
            >
              <span className="text-[#E11D5C] font-black text-4xl block">
                12+
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                Years of Mastery
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE: CONTENT */}
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[#E11D5C] font-bold uppercase tracking-[0.4em] text-xs">
                The Visionary
              </span>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 leading-none text-black">
                Crafting <br />
                <span className="text-zinc-300">Eternal</span> Ink
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-xl font-medium"
            >
              With a focus on precision and a deep respect for the tradition of
              tattooing, I transform personal narratives into permanent art. My
              philosophy is simple: every line must hold a purpose, and every
              piece must transcend time.
            </motion.p>

            {/* FEATURES LIST */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-8 border-y border-zinc-100 py-8"
            >
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest text-black">
                  Custom Design
                </h4>
                <p className="text-zinc-400 text-xs mt-2 uppercase font-semibold">
                  Unique to your story
                </p>
              </div>
              <div>
                <h4 className="font-black uppercase text-xs tracking-widest text-black">
                  Sterile Environment
                </h4>
                <p className="text-zinc-400 text-xs mt-2 uppercase font-semibold">
                  Medical grade safety
                </p>
              </div>
            </motion.div>

            {/* CTA NAVIGATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link
                href="/about"
                className="group flex items-center gap-4 text-black font-black uppercase tracking-widest text-sm"
              >
                <span className="relative overflow-hidden inline-block">
                  View Full Portfolio
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E11D5C] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                </span>
                <div className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-[#E11D5C] group-hover:border-[#E11D5C] group-hover:text-white transition-all duration-500">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* BACKGROUND TEXT DECORATION */}
      <div className="absolute top-1/2 -right-20 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <h3 className="text-[250px] font-black uppercase tracking-tighter leading-none">
          Gopis
        </h3>
      </div>
    </section>
  );
}
