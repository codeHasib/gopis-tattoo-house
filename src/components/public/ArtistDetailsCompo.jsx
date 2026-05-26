"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ArtistDetailsCompo = ({ theArtist }) => {
  if (!theArtist) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-zinc-500 uppercase tracking-widest font-black text-xs">
          Artist Not Found
        </p>
      </div>
    );
  }

  const whatsappNumber = "8801641651210";
  const whatsappMessage = encodeURIComponent(
    `Hi, I'm interested in booking a session with ${theArtist.name}.`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#E11D5C] overflow-x-hidden">
      {/* 1. TOP NAVIGATION - Increased backdrop-blur and z-index */}
      <nav className="backdrop-blur-md bg-black/20 lg:bg-transparent lg:mix-blend-difference py-6 px-3">
        <Link
          href="/artists"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">
            Back to Collective
          </span>
        </Link>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* 2. IMAGE SECTION - Fixed height and relative positioning */}
        <section className="relative h-[60vh] lg:h-screen lg:w-1/2 overflow-hidden bg-zinc-950 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-full w-full relative"
          >
            <Image
              src={theArtist.imageUrl || "/placeholder-artist.jpg"}
              alt={theArtist.name}
              fill
              priority
              className="object-cover transition-all duration-700"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Darker gradient at bottom for mobile name readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90 lg:hidden" />
          </motion.div>

          {/* Mobile Name Overlay - Absolute positioned over the image */}
          <div className="absolute bottom-10 left-6 lg:hidden z-10">
            <h1 className="text-5xl font-black uppercase tracking-tighter leading-none">
              {theArtist.name}
            </h1>
          </div>
        </section>

        {/* 3. INFO & WHATSAPP SECTION - Better padding for mobile flow */}
        <section className="lg:w-1/2 flex flex-col justify-center p-6 py-16 md:p-20 border-t lg:border-t-0 border-zinc-900 bg-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            {/* Desktop Only Header */}
            <div className="hidden lg:block mb-12">
              <span className="text-[#E11D5C] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
                Resident Artist
              </span>
              <h1 className="text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
                {theArtist.name}
              </h1>
            </div>

            <div className="space-y-10">
              {/* Description */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-[1px] h-full bg-[#E11D5C]/30" />
                <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl pl-6">
                  {theArtist.description}
                </p>
              </div>

              {/* THE PRIMARY WHATSAPP ACTION */}
              <div className="pt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full bg-[#E11D5C] text-white p-6 md:p-8 hover:bg-white hover:text-black transition-all duration-500 group relative z-10"
                >
                  <div className="flex items-center gap-4">
                    <MessageCircle
                      size={20}
                      fill="currentColor"
                      className="group-hover:text-black transition-colors"
                    />
                    <span className="text-base md:text-lg font-black uppercase tracking-tighter">
                      Book via WhatsApp
                    </span>
                  </div>
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </a>

                {/* Secondary Status Tag */}
                <div className="mt-8 flex items-center gap-3 text-zinc-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E11D5C] animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                    Now Booking for 2026
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* BACKGROUND DECOR - Fixed z-index to stay in back */}
      <div className="fixed bottom-0 right-0 p-10 opacity-[0.03] pointer-events-none select-none -z-[1] overflow-hidden hidden lg:block">
        <h2 className="text-[35vw] font-black leading-none uppercase translate-y-1/3">
          {theArtist.name.split(" ")[0]}
        </h2>
      </div>
    </div>
  );
};

export default ArtistDetailsCompo;
