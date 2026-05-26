"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Scissors,
  Droplets,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import SentrumPie from "../../../../public/images/sentrumPie.jpg";
import IndPie from "../../../../public/images/indPie.jpg";
import HelixPie from "../../../../public/images/helixPie.jpg";
import SmallRem from "../../../../public/images/smallRem.jpg";
import LargeRem from "../../../../public/images/largeRem.jpg";

export const dynamic = "force-dynamic";

// --- STATIC DATA ---
const staticCategories = [
  {
    id: "piercing",
    title: "Precision Piercing",
    icon: <Droplets className="text-[#E11D5C]" size={18} />,
    description: "Hygienic, medical-grade body art.",
    items: [
      {
        _id: "p1",
        title: "Septum Piercing",
        price: "4500",
        mediaUrl: SentrumPie,
      },
      {
        _id: "p2",
        title: "Industrial Bar",
        price: "6000",
        mediaUrl: IndPie,
      },
      {
        _id: "p3",
        title: "Helix Piercing",
        price: "3500",
        mediaUrl: HelixPie,
      },
    ],
  },
  {
    id: "removal",
    title: "Laser Removal",
    icon: <Zap className="text-[#E11D5C]" size={18} />,
    description: "Advanced Q-Switch technology.",
    items: [
      {
        _id: "r1",
        title: "Small Area",
        price: "8000",
        mediaUrl: SmallRem,
      },
      {
        _id: "r2",
        title: "Large Piece Fade",
        price: "15000",
        mediaUrl: LargeRem,
      },
    ],
  },
];

export default function TattooGalleryPage() {
  const [dynamicTattoos, setDynamicTattoos] = useState([]);
  useEffect(() => {
    async function fetchDynamicTattoos() {
      const res = await fetch("/api/tattoo", {
        cache: "no-store",
      });
      const data = await res.json();
      setDynamicTattoos(data?.data);
    }
    fetchDynamicTattoos();
  }, []);
  return (
    <div className="min-h-screen bg-black text-white py-16 selection:bg-[#E11D5C]">
      {/* Header */}
      <div className="px-6 mb-12">
        <span className="text-[#E11D5C] font-black uppercase tracking-[0.4em] text-[10px]">
          The Archive
        </span>
        <h1 className="text-5xl font-black uppercase tracking-tighter mt-2">
          GOPIS{" "}
          <span className="text-zinc-800 text-4xl block">STUDIO WORKS</span>
        </h1>
      </div>

      {/* 1. DYNAMIC TATTOOS */}
      <MobileServiceSlider
        title="Tattoos"
        data={dynamicTattoos}
        icon={<Scissors size={18} className="text-[#E11D5C]" />}
      />

      {/* 2. STATIC CATEGORIES */}
      {staticCategories.map((cat) => (
        <MobileServiceSlider
          key={cat.id}
          title={cat.title}
          data={cat.items}
          icon={cat.icon}
        />
      ))}
    </div>
  );
}

function MobileServiceSlider({ title, data, icon }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8; // Move 80% of screen width
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="mb-20">
      <div className="px-6 flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-xl font-black uppercase tracking-tight">
            {title}
          </h2>
        </div>

        {/* Navigation Arrows - Simplified for Mobile Taps */}
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="p-3 bg-zinc-950 border border-zinc-900 active:bg-[#E11D5C] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 bg-zinc-950 border border-zinc-900 active:bg-[#E11D5C] transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 px-6 no-scrollbar snap-x snap-mandatory"
      >
        {data.length === 0 ? (
          <div className="w-full py-10 border border-zinc-900 text-zinc-800 text-xs font-bold uppercase tracking-widest text-center">
            Coming Soon
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item._id}
              className="min-w-[75vw] md:min-w-[400px] snap-center bg-zinc-950 border border-zinc-900"
            >
              {/* Image Area */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={item.mediaUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {/* Fixed Overlay Label */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-zinc-800 px-3 py-1">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#E11D5C]">
                    Fixed Price
                  </p>
                </div>
              </div>

              {/* Bottom Info Section - Always Visible */}
              <div className="p-5 flex justify-between items-center border-t border-zinc-900">
                <div className="flex-1 pr-4">
                  <h3 className="text-sm font-black uppercase tracking-wide truncate">
                    {item.title}
                  </h3>
                  <p className="text-[#E11D5C] font-black text-lg">
                    ৳{item.price}
                  </p>
                </div>
                <div className="flex-shrink-0 bg-zinc-900 p-3">
                  <ArrowRight size={14} className="text-zinc-600" />
                </div>
              </div>
            </div>
          ))
        )}

        {/* Empty space at end to allow center snapping of last item */}
        <div className="min-w-[10vw] invisible" aria-hidden="true" />
      </div>
    </section>
  );
}
