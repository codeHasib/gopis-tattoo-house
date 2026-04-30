"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ArtistsCarousel() {
  const [artists, setArtists] = useState([]);

  // useEffect(() => {
  //   async function loadArtist() {
  //     const res = await fetch(`${process.env.BASE_URI}/api/artist`, {
  //       cache: "no-store",
  //     });

  //     const data = await res.json();
  //     const allArtists = data?.data || [];

  //     // Logic: Show 5 artists for a balanced horizontal layout
  //     // const newArtists = allArtists.slice(0, 5);

  //     setArtists(allArtists);
  //   }

  //   loadArtist();
  // }, []);

  // console.log(artists);

  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Logic: Check scroll progress to show/hide arrows
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      // Small 1px buffer for scrollWidth calculation
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // Add scroll listener on mount
  useEffect(() => {
    checkScroll();
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll);
      }
    };
  }, [artists]); // Rerun check when artists data loads

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (artists.length === 0) {
    return (
      <section className="bg-black py-24 px-6 text-center text-zinc-700 uppercase font-black tracking-widest border-y border-zinc-900">
        Loading The Collective...
      </section>
    );
  }

  return (
    <section className="bg-black py-24 px-0 relative group/section">
      {/* 1. SECTION HEADER AREA */}
      <div className="max-w-[1400px] mx-auto px-6 mb-16 flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <div>
          <span className="text-[#E11D5C] font-bold uppercase tracking-[0.4em] text-xs">
            The Collective
          </span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mt-4 text-white leading-[0.85]">
            Elite <br /> Tattooists
          </h2>
        </div>
        <p className="text-zinc-500 font-bold uppercase text-[11px] tracking-[0.2em] max-w-xs md:text-right">
          A dedicated union of masters blending traditional precision with
          modern artistry.
        </p>
      </div>

      {/* 2. THE CAROUSEL CONTAINER */}
      <div className="relative">
        {/* SCROLLABLE TRACK */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-0 cursor-grab active:cursor-grabbing"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {artists.map((artist) => (
            <Link
              key={artist._id}
              href={`/artists/${artist._id}`}
              className="relative flex-none w-full md:w-1/2 lg:w-1/3 snap-start group aspect-[3/4] overflow-hidden border-r border-zinc-900 last:border-r-0"
            >
              {/* IMAGE (Rectangle, grayscale to color) */}
              <Image
                src={artist.imageUrl || artist.mediaUrl}
                alt={artist.name}
                fill
                priority
                sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />

              {/* GRADIENT OVERLAY (Required for readability) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />

              {/* Minimal Text Overlay (Similar to image_1.png) */}
              <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2 leading-none">
                    {artist.name}
                  </h3>
                  <span className="text-[#E11D5C] font-black uppercase tracking-[0.3em] text-[10px]">
                    {artist.specialty || "Resident Artist"}
                  </span>
                </div>
                <ChevronRight
                  size={24}
                  className="text-white group-hover:translate-x-1 group-hover:text-[#E11D5C] transition-all"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* 3. NAVIGATION ARROWS (Placed ON THE PHOTO, only visible on hover) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 flex justify-between pointer-events-none z-20">
          {/* Previous Button */}
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous Artist"
            className={`w-16 h-16 rounded-full bg-black/60 text-white flex items-center justify-center border border-zinc-700 pointer-events-auto backdrop-blur-sm transition-all duration-300
              ${canScrollLeft ? "opacity-0 group-hover/section:opacity-100" : "opacity-0"} 
              hover:bg-[#E11D5C] hover:border-[#E11D5C]`}
          >
            <ChevronLeft size={30} />
          </button>

          {/* Next Button */}
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next Artist"
            className={`w-16 h-16 rounded-full bg-black/60 text-white flex items-center justify-center border border-zinc-700 pointer-events-auto backdrop-blur-sm transition-all duration-300
              ${canScrollRight ? "opacity-0 group-hover/section:opacity-100" : "opacity-0"}
              hover:bg-[#E11D5C] hover:border-[#E11D5C]`}
          >
            <ChevronRight size={30} />
          </button>
        </div>
      </div>
    </section>
  );
}
