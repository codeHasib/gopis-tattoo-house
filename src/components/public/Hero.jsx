"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BannerImg from "../../../public/images/banner.jpg";
import Image from "next/image";
import "../../../src/app/globals.css";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const words = ["STUDIO", "ARTISTS", "HOUSE", "LEGACY"];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black pt-20">
      {/* 1. Background Image with Grayscale Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={BannerImg}
          alt="Tattooing Background"
          className="w-full h-full object-cover opacity-30 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* 2. Main Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center">
        {/* Top Label - Upright and Spaced */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white font-bold uppercase tracking-[0.4em] text-lg md:text-xl mb-4"
        >
          The Best
        </motion.span>

        {/* BIG ANIMATED TEXT - Clean Upright Block Font */}
        <div className="relative h-[110px] md:h-[200px] w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={words[index]}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[70px] md:text-[180px] font-black leading-none uppercase tracking-tighter"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1562962230-16e4623d36e6?auto=format&fit=crop&q=80&w=1000')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {words[index]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtext Paragraph - Clean and Readable */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-xl text-zinc-500 text-[13px] md:text-[15px] leading-relaxed mt-6 mb-10 font-normal tracking-wide uppercase"
        >
          Where art meets skin. We specialize in custom ink, precision
          blackwork, and high-end tattoo artistry designed to last a lifetime.
        </motion.p>

        {/* Action Button */}
        <motion.a
          href="https://wa.me/8801641651210?text=Hello%20there!"
          target="_blank"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#E11D5C] text-white px-12 py-4 rounded-full font-bold uppercase tracking-widest text-[13px] transition-all hover:brightness-110 shadow-xl"
        >
          Connect Now
        </motion.a>
      </div>

      {/* 3. Bottom Services Ticker */}
      <div className="absolute bottom-0 w-full bg-zinc-950/50 backdrop-blur-sm border-t border-zinc-900 py-8 overflow-hidden">
        {/* The "Track" that moves */}
        <div className="flex w-max animate-infinite-scroll">
          {/* First Set of Items */}
          <div className="flex items-center gap-16 px-8">
            <ServiceItem text="Custom Design" />
            <ServiceItem text="Black & Gray" />
            <ServiceItem text="Minimalist" />
            <ServiceItem text="Realism" />
          </div>

          {/* Exact Duplicate for Seamless Looping */}
          <div className="flex items-center gap-16 px-8">
            <ServiceItem text="Custom Design" />
            <ServiceItem text="Black & Gray" />
            <ServiceItem text="Minimalist" />
            <ServiceItem text="Realism" />
          </div>

          {/* Exact Duplicate for Seamless Looping */}
          <div className="flex items-center gap-16 px-8">
            <ServiceItem text="Custom Design" />
            <ServiceItem text="Black & Gray" />
            <ServiceItem text="Minimalist" />
            <ServiceItem text="Realism" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ text }) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-8 h-[1px] bg-zinc-700" />
      <span className="text-zinc-300 font-bold uppercase tracking-[0.2em] text-[11px]">
        {text}
      </span>
    </div>
  );
}
