"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/review");
        const data = await res.json();
        setReviews(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Parallex effect for the background text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const xTransform = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="bg-black py-32 overflow-hidden relative">
      {/* BACKGROUND DECORATIVE TEXT */}
      <motion.div 
        style={{ x: xTransform }}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap opacity-[0.03] pointer-events-none select-none"
      >
        <span className="text-[20rem] font-black uppercase tracking-tighter text-white">
          Authentic Inked Authentic Inked
        </span>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-[#E11D5C]" />
              <span className="text-[#E11D5C] font-black uppercase tracking-[0.5em] text-[10px]">
                Testimonials
              </span>
            </div>
            <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.8]">
              The <br /> <span className="text-outline text-transparent">Bloodline</span>
            </h2>
          </div>
          <div className="text-right">
             <p className="text-zinc-500 font-bold uppercase text-[11px] tracking-[0.3em] max-w-[200px] leading-relaxed">
               Every mark tells a story. Every client leaves a legacy.
             </p>
          </div>
        </div>

        {loading ? (
          <div className="flex gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="min-w-[400px] h-64 bg-zinc-900 animate-pulse border border-zinc-800" />
            ))}
          </div>
        ) : (
          <div className="relative">
            {/* INFINITE MARQUEE EFFECT */}
            <div className="flex overflow-hidden group">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 40, repeat: Infinity }}
                className="flex gap-6 whitespace-nowrap py-10"
              >
                {/* Double the array for seamless looping */}
                {[...reviews, ...reviews].map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </motion.div>
            </div>
            
            {/* Gradient Fades for Slider Edge */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
          </div>
        )}

        {reviews.length === 0 && !loading && (
          <p className="text-zinc-800 uppercase font-black tracking-[0.4em] text-center py-20 text-3xl">
            Silence is Golden.
          </p>
        )}
      </div>

      <style jsx>{`
        .text-outline {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
        }
      `}</style>
    </section>
  );
}

function ReviewCard({ review }) {
  const { name, message, star } = review;

  return (
    <div className="w-[350px] md:w-[450px] flex-shrink-0 bg-zinc-900/50 backdrop-blur-sm p-10 border border-zinc-800 hover:border-[#E11D5C] transition-all duration-500 relative group">
      {/* Decorative Quote Icon */}
      <Quote className="absolute top-6 right-6 text-zinc-800 group-hover:text-[#E11D5C]/20 transition-colors" size={40} />
      
      {/* Stars */}
      <div className="flex gap-1 mb-8">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={12}
            className={`${
              i < (star || 5) ? "fill-[#E11D5C] text-[#E11D5C]" : "text-zinc-800"
            }`}
          />
        ))}
      </div>

      {/* Message */}
      <p className="text-white font-bold leading-relaxed mb-10 whitespace-normal text-lg uppercase tracking-tight italic">
        &quot;{message}&quot;
      </p>

      {/* Profile */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="w-14 h-14 bg-[#E11D5C] absolute -inset-1 opacity-20 blur-sm group-hover:opacity-40 transition-opacity" />
          <div className="w-14 h-14 bg-white flex items-center justify-center text-black font-black text-xl relative z-10">
            {name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div>
          <h4 className="text-white font-black uppercase text-sm tracking-widest leading-none">
            {name}
          </h4>
          <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-[0.3em] mt-2 block">
            Collective Member
          </span>
        </div>
      </div>

      {/* Hover Line Detail */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#E11D5C] group-hover:w-full transition-all duration-700" />
    </div>
  );
}