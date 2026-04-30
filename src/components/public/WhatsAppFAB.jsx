"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFAB() {
  // Replace with your actual business number (include country code, no symbols)
  const whatsappNumber = "8801641651210";
  const message =
    "Hello! I'd like to book an appointment with a Master Artist.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed bottom-8 right-8 z-[100] md:bottom-12 md:right-12">
      {/* Animated Pulse Ring */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-[#25D366] rounded-full blur-xl"
      />

      {/* Main Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative flex items-center gap-3 bg-[#25D366] text-white px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_50px_rgba(37,211,102,0.6)] transition-shadow group"
      >
        <MessageCircle size={24} className="fill-white" />
        <span className="font-black uppercase tracking-[0.2em] text-[12px] hidden md:block">
          Appoint Now
        </span>

        {/* Mobile Badge (Optional) */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#E11D5C] border-2 border-[#25D366] rounded-full md:hidden" />
      </motion.a>
    </div>
  );
}
