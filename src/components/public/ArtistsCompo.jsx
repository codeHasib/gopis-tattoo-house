"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Using a Client Component wrapper to handle the animations
export default function ArtistsCompo({ artists = [] }) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#E11D5C]">
      {/* 1. HERO HEADER */}
      <section className="pt-24 pb-12 px-6 border-b border-zinc-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[1400px] mx-auto"
        >
          <span className="text-[#E11D5C] font-black uppercase tracking-[0.4em] text-[10px]">
            The Masterminds
          </span>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mt-4 leading-[0.8]">
            OUR <br /> <span className="text-zinc-800">ARTISTS</span>
          </h1>
          <p className="text-zinc-500 mt-8 max-w-sm font-medium uppercase tracking-tight text-xs leading-relaxed">
            A collective of specialists dedicated to permanent artistry and
            anatomical precision.
          </p>
        </motion.div>
      </section>

      {/* 2. ARTIST LIST (STACKED DESIGN) */}
      <section className="px-6 py-12">
        <div className="max-w-[1400px] mx-auto space-y-24">
          {artists.length === 0 ? (
            <div className="h-60 flex items-center justify-center border border-dashed border-zinc-900">
              <p className="text-zinc-700 font-black uppercase tracking-widest text-xs">
                The studio is currently empty
              </p>
            </div>
          ) : (
            artists.map((artist, index) => (
              <ArtistCard key={artist._id} artist={artist} index={index} />
            ))
          )}
        </div>
      </section>

      {/* 3. STUDIO VALUES / FOOTER PREVIEW */}
      <section className="bg-[#E11D5C] py-20 px-6 overflow-hidden">
        <div className="flex flex-col items-center text-center">
          <Star className="mb-6 animate-spin-slow" size={40} />
          <h2 className="text-4xl font-black uppercase tracking-tighter max-w-xs leading-none">
            Every line tells a story.
          </h2>
        </div>
      </section>
    </div>
  );
}

function ArtistCard({ artist, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="group relative flex flex-col gap-8"
    >
      {/* Index Number */}
      <div className="absolute -top-10 left-0 opacity-10">
        <span className="text-8xl font-black italic">0{index + 1}</span>
      </div>

      {/* Mobile-First Image Container */}
      <div className="relative aspect-[3/4] md:aspect-[16/9] w-full overflow-hidden bg-zinc-950 border border-zinc-900">
        <Image
          src={artist.imageUrl || "/placeholder-artist.jpg"}
          alt={artist.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

        {/* Bottom Left: Name Label */}
        <div className="absolute bottom-6 left-6">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            {artist.name}
          </h2>
        </div>
      </div>

      {/* Artist Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8">
          <p className="text-zinc-400 font-medium leading-relaxed text-sm md:text-base max-w-2xl">
            {artist.description}
          </p>
        </div>

        <div className="md:col-span-4 flex flex-col gap-4">
          <Link
            href={`/artists/${artist._id}`}
            className="w-full py-5 bg-zinc-950 border border-zinc-900 hover:border-[#E11D5C] flex items-center justify-between px-6 transition-all group/btn"
          >
            <span className="font-black uppercase tracking-widest text-[10px]">
              View Flash Book
            </span>
            <ArrowUpRight
              size={18}
              className="text-[#E11D5C] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"
            />
          </Link>

          <div className="flex gap-2">
            <div className="flex-1 p-4 bg-zinc-900 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E11D5C] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                Booking Open
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
