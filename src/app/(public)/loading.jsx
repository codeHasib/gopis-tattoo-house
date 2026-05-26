"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0a0a0a] z-[9999] flex flex-col items-center justify-center px-6">
      {/* 1. THE LOGO/NAME PLACEHOLDER */}
      <div className="relative mb-12">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-white font-serif italic text-3xl md:text-5xl tracking-tighter select-none"
        >
          Studio <span className="text-zinc-800">Noir.</span>
        </motion.h2>
      </div>

      {/* 2. THE PROGRESS INDICATOR */}
      <div className="w-48 h-[1px] bg-zinc-900 relative overflow-hidden">
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[#E11D5C] w-1/2"
        />
      </div>

      {/* 3. TECHNICAL METADATA */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[8px] font-black uppercase tracking-[0.6em] text-zinc-600"
        >
          Establishing Connection
        </motion.span>

        {/* Subtle Pulse Dot */}
        <motion.div
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-1 h-1 bg-[#E11D5C] rounded-full"
        />
      </div>

      {/* BACKGROUND DECOR (Optional - Large Faded Text) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none overflow-hidden">
        <span className="text-[30vw] font-black uppercase whitespace-nowrap">
          LOADING
        </span>
      </div>
    </div>
  );
}
