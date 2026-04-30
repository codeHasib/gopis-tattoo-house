"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-16">
          <span className="text-[#E11D5C] font-bold uppercase tracking-[0.4em] text-xs">
            Testimonials
          </span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mt-4 text-black">
            Voices of <br /> The Inked
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-zinc-50 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            <AnimatePresence>
              {reviews.map((review, index) => (
                <ReviewCard key={review._id || index} review={review} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {reviews.length === 0 && !loading && (
          <p className="text-zinc-400 uppercase font-bold tracking-widest text-center py-20">
            No reviews shared yet.
          </p>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review, index }) {
  const { name, description, star } = review;
  const firstLetter = name?.charAt(0).toUpperCase() || "G";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="break-inside-avoid bg-zinc-50 p-8 rounded-[2rem] border border-zinc-100 hover:border-[#E11D5C]/30 transition-colors group"
    >
      {/* Stars Section */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${
              i < (star || 5) ? "fill-[#E11D5C] text-[#E11D5C]" : "text-zinc-200"
            }`}
          />
        ))}
      </div>

      {/* Description */}
      <p className="text-zinc-600 font-medium leading-relaxed mb-8 uppercase text-[13px] tracking-wide">
        "{description}"
      </p>

      {/* Profile Section */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white font-black text-lg group-hover:bg-[#E11D5C] transition-colors duration-300">
          {firstLetter}
        </div>
        <div>
          <h4 className="text-black font-black uppercase text-sm tracking-widest leading-none">
            {name}
          </h4>
          <span className="text-zinc-400 font-bold uppercase text-[9px] tracking-[0.2em] mt-1 block">
            Verified Client
          </span>
        </div>
      </div>
    </motion.div>
  );
}