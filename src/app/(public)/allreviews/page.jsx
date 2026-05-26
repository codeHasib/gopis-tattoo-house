"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, Quote, Loader2 } from "lucide-react";
import Link from "next/link";

const AllReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/review", { cache: "no-store" });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="text-[#E11D5C]" size={32} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-[#E11D5C] overflow-x-hidden">
      {/* --- HERO SECTION: DESTRUCTIVE TYPOGRAPHY --- */}
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="flex items-center justify-center opacity-10 pointer-events-none"
        >
          <h1 className="text-5xl font-black leading-none text-white select-none">
            REVIEWS
          </h1>
        </motion.div>

        <div className="z-10 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#E11D5C] font-bold uppercase tracking-[0.6em] text-[10px] mb-4"
          >
            The Collective Voice
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif italic text-white tracking-tighter"
          >
            Honest Insights. <br /> Elegant Results.
          </motion.h2>
        </div>
      </section>

      {/* --- REVIEWS MASONRY FEED --- */}
      <main className="max-w-[1600px] mx-auto px-6 py-24">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {reviews.map((rev, index) => (
            <ReviewCard key={rev._id || index} rev={rev} index={index} />
          ))}
        </div>
      </main>

      {/* --- SIGNATURE CTA --- */}
      <footer className="py-40 px-6 border-t border-zinc-900 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h3 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
            Be part of the <span className="italic">legacy</span>.
          </h3>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-6 group"
          >
            <span className="text-xs font-black uppercase tracking-[0.4em] group-hover:text-[#E11D5C] transition-colors">
              Submit Review
            </span>
            <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-[#E11D5C] group-hover:border-[#E11D5C] transition-all duration-500">
              <ArrowRight className="text-white" size={20} />
            </div>
          </Link>

          <div className="pt-24 opacity-20">
            <p className="text-[10px] font-bold tracking-[1em] uppercase">
              Mohammad Hasib Signature // 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* --- CARD COMPONENT --- */
const ReviewCard = ({ rev, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      className="break-inside-avoid bg-zinc-950 p-10 border border-zinc-900 hover:border-zinc-700 transition-all group relative overflow-hidden"
    >
      {/* Subtle Star Bar */}
      <div className="flex justify-between items-start mb-12">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-4 ${i < rev.rating ? "bg-[#E11D5C]" : "bg-zinc-900"}`}
            />
          ))}
        </div>
        <span className="text-[10px] font-bold text-zinc-800 italic uppercase">
          Ref. {index + 1}
        </span>
      </div>

      <Quote size={20} className="text-zinc-800 mb-6" />

      <p className="text-xl leading-relaxed text-zinc-100 font-medium tracking-tight mb-12">
        {rev.message}
      </p>

      <div className="flex flex-col border-t border-zinc-900 pt-8">
        <h4 className="text-sm font-black uppercase tracking-widest text-white group-hover:text-[#E11D5C] transition-colors">
          {rev.name}
        </h4>
        <p className="text-[9px] text-zinc-600 uppercase tracking-widest mt-1">
          Verified Experience
        </p>
      </div>

      {/* Aesthetic Grain Background effect (Optional via CSS) */}
      <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
    </motion.div>
  );
};

export default AllReviewsPage;
