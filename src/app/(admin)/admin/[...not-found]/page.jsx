"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoveLeft, AlertTriangle } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      {/* Animated Icon */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative mb-8"
      >
        <AlertTriangle size={80} className="text-zinc-800" />
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <AlertTriangle size={80} className="text-white blur-sm" />
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white mb-4"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-zinc-500 max-w-md mx-auto mb-10 font-medium leading-relaxed italic"
      >
        The page you are looking for has been removed, renamed, or perhaps it
        never existed in this studio.
      </motion.p>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase italic hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
        >
          <MoveLeft size={20} />
          Return to Dashboard
        </Link>
      </motion.div>

      {/* Subtle Background Element */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,_#111_0%,_transparent_70%)] opacity-50" />
    </div>
  );
}
