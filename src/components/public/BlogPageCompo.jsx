"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Zap, Volume2, VolumeX, Play, Pause } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export default function BlogPageCompo({ blogs = [] }) {
  const isVideo = (url = "") => url.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#E11D5C]">
      {/* HEADER */}
      <section className="pt-24 pb-12 px-6 border-b border-zinc-900">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#E11D5C] font-black uppercase tracking-[0.4em] text-[10px]">
            The Live Feed
          </span>
          <h1 className="text-6xl font-black uppercase tracking-tighter mt-4 leading-none">
            STUDIO <span className="text-zinc-800">JOURNAL</span>
          </h1>
        </div>
      </section>

      {/* VERTICAL FEED */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-2xl mx-auto space-y-24">
          {blogs.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-zinc-900">
              <p className="text-zinc-800 font-black uppercase tracking-widest text-[10px]">
                Feed is empty
              </p>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <VideoBlogCard
                key={blog._id}
                blog={blog}
                isVideo={isVideo(blog.mediaUrl)}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function VideoBlogCard({ blog, isVideo }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = (e) => {
    e.stopPropagation(); // Prevent play/pause when clicking mute
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col border-b border-zinc-900/50 pb-16 last:border-0">
      {/* MEDIA BOX */}
      <div className="relative aspect-[4/5] bg-zinc-950 border border-zinc-900 overflow-hidden mb-6 group">
        {isVideo ? (
          <div className="relative h-full w-full" onClick={togglePlay}>
            <video
              ref={videoRef}
              src={blog.mediaUrl}
              loop
              muted={isMuted}
              playsInline
              className={`w-full h-full object-cover transition-all duration-700 ${
                isPlaying ? "grayscale-0" : "grayscale"
              }`}
            />

            {/* OVERLAY CONTROLS */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* CENTER PLAY BUTTON (ONLY WHEN PAUSED) */}
            <AnimatePresence>
              {!isPlaying && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="bg-[#E11D5C] p-6 rounded-full shadow-2xl">
                    <Play size={24} fill="white" className="text-white ml-1" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* BOTTOM BUTTON BAR */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center z-20">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlay();
                  }}
                  className="p-3 bg-black/60 backdrop-blur-md border border-zinc-800 text-white rounded-full"
                >
                  {isPlaying ? (
                    <Pause size={16} fill="white" />
                  ) : (
                    <Play size={16} fill="white" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-3 bg-black/60 backdrop-blur-md border border-zinc-800 text-white rounded-full"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-zinc-800 text-[9px] font-black uppercase tracking-[0.2em]">
                {isPlaying ? "LIVE" : "PAUSED"}
              </div>
            </div>
          </div>
        ) : (
          <Image
            src={blog.mediaUrl}
            alt={blog.title}
            fill
            className="object-cover grayscale"
          />
        )}
      </div>

      {/* TEXT CONTENT */}
      <div className="space-y-4 px-2">
        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none text-white">
          {blog.title}
        </h2>
        <p className="text-zinc-500 text-sm font-medium leading-relaxed">
          {blog.description}
        </p>
        <div className="flex items-center gap-2 pt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#E11D5C] animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700">
            Published in Archive 0.1
          </span>
        </div>
      </div>
    </div>
  );
}
