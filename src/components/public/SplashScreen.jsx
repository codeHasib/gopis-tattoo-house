"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/icon.png";

export default function SplashScreen({ finishLoading }) {
  const [isExpanding, setIsExpanding] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Stage 1: Reveal Logo in the dark
    const logoTimer = setTimeout(() => setShowLogo(true), 400);
    // Stage 2: Start the background color expansion
    const expandTimer = setTimeout(() => setIsExpanding(true), 2500);
    // Stage 3: Finish and hand over to Home Screen
    const finishTimer = setTimeout(() => finishLoading(), 3600);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(expandTimer);
      clearTimeout(finishTimer);
    };
  }, [finishLoading]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black">
      {/* THE TRANSFORMING BACKGROUND */}
      <motion.div
        initial={{ scale: 0, borderRadius: "100%" }}
        animate={
          isExpanding
            ? {
                scale: 4,
                borderRadius: "0%",
              }
            : {}
        }
        transition={{
          duration: 1.1,
          ease: [0.7, 0, 0.3, 1],
        }}
        className="absolute z-0 w-[100vw] h-[100vw] bg-white"
      />

      {/* CENTER LOGO SECTION */}
      <div className="relative z-10 flex flex-col items-center">
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
                filter: { duration: 0.5 }, // Smooth color flip
              }}
              className="relative mb-8"
            >
              {/* Subtle Glow Ring around Logo */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: isExpanding ? 0 : [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-white blur-2xl rounded-full"
              />

              {/* The Logo Image */}
              <div className="relative w-24 h-24 md:w-32 md:h-32">
                <Image
                  src={Logo}
                  alt="Gopis Tattoo Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* TEXT SECTION */}
        <div className="text-center">
          <div className="">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className={`text-5xl md:text-8xl font-black uppercase italic tracking-tighter transition-colors duration-500 ${
                isExpanding ? "text-black" : "text-white"
              }`}
            >
              <span className="text-[#E11D5C]">Gopis</span>
              Tattoo
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className={`text-5xl md:text-8xl font-black uppercase italic tracking-tighter -mt-2 transition-colors duration-500 ${
                isExpanding ? "text-black" : "text-white"
              }`}
            >
              Studio
            </motion.h1>
          </div>

          {/* Animated Line with Center-Out expansion */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "80px", opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className={`h-[2px] mx-auto mt-6 mb-4 transition-colors duration-500 ${
              isExpanding ? "bg-black" : "bg-zinc-700"
            }`}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className={`text-[10px] uppercase tracking-[0.8em] font-bold transition-colors duration-500 ${
              isExpanding ? "text-zinc-600" : "text-zinc-500"
            }`}
          >
            Since 2017
          </motion.p>
        </div>
      </div>

      {/* Cinematic Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://res.cloudinary.com/dlbv8ps7p/image/upload/v1680513197/grain_if9oog.png')]" />
    </div>
  );
}
