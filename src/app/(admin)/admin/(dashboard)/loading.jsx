"use client";

import { motion } from "framer-motion";

export default function AdminLoading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6">
      {/* Central Brand Identity Pulse */}
      <div className="relative mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 1],
            opacity: [0.3, 1, 0.3] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.15)]"
        >
          {/* Subtle Logo Placeholder (Letter G for Gopis) */}
          <span className="text-black text-4xl font-black italic tracking-tighter">G</span>
        </motion.div>
        
        {/* Outer Ring Animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.5],
            opacity: [0.5, 0] 
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 border-2 border-white rounded-2xl"
        />
      </div>

      {/* Loading Text */}
      <div className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white text-xs font-black uppercase tracking-[0.5em] italic"
        >
          Initializing Studio Admin
        </motion.h2>

        {/* Minimalist Progress Bar */}
        <div className="w-48 h-[2px] bg-zinc-900 rounded-full overflow-hidden mx-auto">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1/2 h-full bg-white shadow-[0_0_15px_white]"
          />
        </div>
        
        <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-widest pt-2">
          Gopis Tattoo House • Secure Access
        </p>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] pointer-events-none" />
    </div>
  );
}