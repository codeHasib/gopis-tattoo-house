"use client";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BannerImg from "../../../public/images/banner.jpg";

export default function ArtistsSection() {
  // Static configuration for the high-impact featured image
  const featuredArtist = {
    name: "The Collective",
    specialty: "Master Artists & Elite Craft",
    // Replace this with your actual high-quality portrait or studio shot
    imageUrl: BannerImg,
  };

  return (
    <section className="bg-black py-24 px-6 relative group/section">
      {/* 1. SECTION HEADER */}
      <div className="max-w-[1400px] mx-auto mb-16 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <div>
          <span className="text-[#E11D5C] font-bold uppercase tracking-[0.4em] text-xs">
            Elite Craft
          </span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mt-4 text-white leading-[0.85]">
            Meet Your <br /> Master
          </h2>
        </div>
        <p className="text-zinc-500 font-bold uppercase text-[11px] tracking-[0.2em] max-w-xs md:text-right">
          A dedicated union of masters blending traditional precision with
          modern artistry.
        </p>
      </div>

      {/* 2. THE SINGLE STATIC HERO IMAGE */}
      <div className="max-w-[1400px] mx-auto relative group overflow-hidden border border-zinc-900">
        <Link
          href="/artists"
          className="relative block aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden"
        >
          {/* Main Feature Image */}
          <Image
            src={featuredArtist.imageUrl}
            alt="Elite Artists"
            fill
            priority
            className="object-cover group-hover:scale-105 transition-all duration-1000"
          />

          {/* Heavy Gradient for Mobile Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

          {/* Text Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-12 md:left-12 md:right-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none mb-2">
                {featuredArtist.name}
              </h3>
              <span className="text-[#E11D5C] font-black uppercase tracking-[0.3em] text-xs md:text-sm">
                {featuredArtist.specialty}
              </span>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-[11px] self-start md:self-center group-hover:bg-[#E11D5C] group-hover:text-white transition-colors">
              View All Artists
              <ChevronRight size={18} />
            </div>
          </div>
        </Link>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 p-24 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[15rem] font-black uppercase tracking-tighter text-white">
          Ink
        </span>
      </div>
    </section>
  );
}
