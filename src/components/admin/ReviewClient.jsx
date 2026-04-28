"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  CheckCircle2, 
  Trash2, 
  Clock, 
  MessageSquareQuote,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function ReviewClient() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch("/api/review/admin");
    const data = await res.json();
    setReviews(data.data);
  }

  async function approve(id) {
    await fetch(`/api/review/${id}`, {
      method: "PUT",
    });
    load();
  }

  async function remove(id) {
    if (!confirm("Permanently delete this review?")) return;
    await fetch(`/api/review/${id}`, {
      method: "DELETE",
    });
    load();
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-20">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
        <div>
          <h1 className="text-5xl font-black tracking-tighter uppercase italic leading-none text-white">
            Feedback Desk
          </h1>
          <p className="text-zinc-500 mt-2 font-medium tracking-wide">
            Moderate and curate client experiences
          </p>
        </div>
        <div className="flex items-center gap-3 bg-zinc-900/50 px-5 py-2.5 rounded-full border border-zinc-800">
          <ShieldCheck size={18} className="text-green-500" />
          <span className="text-sm font-bold text-zinc-300">
            {reviews.filter(r => r.status === 'pending').length} Pending Requests
          </span>
        </div>
      </header>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {reviews.length > 0 ? (
            reviews.map((r) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={r._id}
                className={`group relative overflow-hidden bg-zinc-900/20 border ${
                  r.status === "approved" ? "border-zinc-800" : "border-amber-900/30 bg-amber-900/5"
                } rounded-[2rem] p-6 md:p-8 transition-all hover:border-zinc-700`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  
                  {/* Left Side: Review Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center text-white font-black text-xl uppercase italic">
                        {r.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">{r.name}</h2>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < r.rating ? "fill-white text-white" : "text-zinc-800"} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <MessageSquareQuote className="absolute -left-2 -top-2 text-zinc-800 -z-10" size={40} />
                      <p className="text-zinc-400 leading-relaxed italic pl-4">
                        "{r.message}"
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Status & Actions */}
                  <div className="flex flex-col items-end gap-4 min-w-[140px]">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${
                      r.status === "approved" 
                        ? "bg-green-500/10 text-green-500 border border-green-500/20" 
                        : "bg-amber-500/10 text-amber-500 border border-amber-500/20 animate-pulse"
                    }`}>
                      {r.status === "approved" ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {r.status}
                    </div>

                    <div className="flex gap-2 w-full">
                      {r.status !== "approved" && (
                        <button
                          onClick={() => approve(r._id)}
                          className="flex-1 bg-white text-black font-black py-3 px-4 rounded-xl hover:bg-zinc-200 transition-all text-xs uppercase flex items-center justify-center gap-2 shadow-xl shadow-white/5"
                        >
                          <CheckCircle2 size={16} /> Approve
                        </button>
                      )}
                      <button
                        onClick={() => remove(r._id)}
                        className={`py-3 px-4 rounded-xl transition-all flex items-center justify-center border ${
                          r.status === "approved" 
                            ? "w-full border-zinc-800 text-zinc-600 hover:border-red-500 hover:text-red-500" 
                            : "bg-red-950/20 border-red-900/30 text-red-500 hover:bg-red-500 hover:text-white"
                        }`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="py-20 text-center border-2 border-dashed border-zinc-900 rounded-[3rem]"
            >
              <AlertCircle className="mx-auto text-zinc-700 mb-4" size={48} />
              <p className="text-zinc-600 font-medium italic">No reviews found in the system.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}