"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Star } from "lucide-react";

export default function ReviewPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !message || !rating) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, rating }),
      });

      if (res.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
          setName("");
          setMessage("");
          setRating(5);
        }, 3000);
      }
    } catch (err) {
      console.error("Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#E11D5C] px-6 flex items-center justify-center py-20">
      <div className="max-w-2xl w-full">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* --- TITLE SECTION --- */}
              <header className="mb-20">
                <p className="text-[#E11D5C] font-bold uppercase tracking-[0.6em] text-[9px] mb-4">
                  Engagement Portal
                </p>
                <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter leading-none">
                  Share Your <br />{" "}
                  <span className="text-zinc-800">Experience.</span>
                </h1>
              </header>

              {/* --- FORM --- */}
              <form onSubmit={handleSubmit} className="space-y-16">
                {/* NAME FIELD */}
                <div className="relative group">
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-900 py-4 outline-none text-xl font-medium focus:border-[#E11D5C] transition-colors peer"
                    placeholder=" YOUR NAME "
                  />
                </div>

                {/* RATING SECTION */}
                <div className="space-y-4 mt-10">
                  <span className="text-[10px] inline-block font-black uppercase tracking-widest text-zinc-700">
                    Rating Selection
                  </span>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className="group relative"
                      >
                        <Star
                          size={24}
                          fill={rating >= num ? "#E11D5C" : "none"}
                          className={`transition-all duration-300 ${rating >= num ? "text-[#E11D5C] scale-110" : "text-zinc-900"}`}
                        />
                        {rating === num && (
                          <motion.div
                            layoutId="glow"
                            className="absolute inset-0 bg-[#E11D5C]/20 blur-xl rounded-full"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* MESSAGE FIELD */}
                <div className="relative group mt-10">
                  <textarea
                    required
                    rows={1}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent border-b border-zinc-900 py-4 outline-none text-xl font-medium focus:border-[#E11D5C] transition-colors peer resize-none"
                    placeholder=" ENTER YOUR REVIEW MESSAGE "
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  disabled={isSubmitting}
                  className="group flex items-center gap-6 disabled:opacity-50"
                >
                  <div className="w-16 h-16 rounded-full border border-zinc-800 flex items-center justify-center group-hover:bg-[#E11D5C] group-hover:border-[#E11D5C] transition-all duration-500">
                    {isSubmitting ? (
                      <Loader2 className="animate-spin text-white" size={20} />
                    ) : (
                      <ArrowRight className="text-white" size={20} />
                    )}
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.4em] group-hover:text-white transition-colors">
                    {isSubmitting ? "Processing" : "Publish Entry"}
                  </span>
                </button>
              </form>
            </motion.div>
          ) : (
            /* --- SUCCESS STATE --- */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <CheckCircle2 size={64} className="text-[#E11D5C]" />
              </div>
              <h2 className="text-4xl font-serif italic text-white">
                Gratitude.
              </h2>
              <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                Your experience has been archived.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
