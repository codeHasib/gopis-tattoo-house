"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, ShieldAlert } from "lucide-react";

const errorLogId = Math.random().toString(36).substr(2, 9).toUpperCase();

export default function AdminError({ error, reset }) {
  useEffect(() => {
    // Log the error to your analytics or console
    console.error("Admin Crash:", error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      {/* Error Badge */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl mb-6"
      >
        <ShieldAlert className="text-red-500" size={32} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white mb-4"
      >
        System Encountered <br /> An Issue
      </motion.h2>

      <p className="text-zinc-500 max-w-lg mx-auto mb-10 font-medium italic">
        We hit a temporary snag while processing that request. This is usually
        due to a connection drop or an invalid data entry.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Reset Button */}
        <button
          onClick={() => reset()}
          className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase italic hover:bg-zinc-200 transition-all shadow-xl shadow-white/5"
        >
          <RefreshCw size={18} />
          Try Again
        </button>

        {/* Back Home */}
        <button
          onClick={() => (window.location.href = "/admin/dashboard")}
          className="flex items-center justify-center gap-3 bg-zinc-900 text-zinc-400 border border-zinc-800 px-8 py-4 rounded-2xl font-black uppercase italic hover:bg-zinc-800 hover:text-white transition-all"
        >
          Go Back
        </button>
      </div>

      {/* Technical Details (Subtle) */}
      <p className="mt-12 text-[10px] text-zinc-700 uppercase tracking-widest font-bold">
        Error Log ID: {errorLogId}
      </p>
    </div>
  );
}
