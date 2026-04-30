"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ChevronRight,
  Info,
  Zap,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import Image from "next/image";

// Local Image Imports
import DipPortrait from "../../../public/images/myself.jpg"; // Add his personal photo here
import WorkImg1 from "../../../public/images/portTatto1.jpg";
import WorkImg2 from "../../../public/images/portTatto2.jpg";
import WorkImg3 from "../../../public/images/portTatto3.jpg";

// --- CUSTOM BRAND ICONS ---
const InstagramIcon = ({ size = 24, strokeWidth = 2, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const artistData = {
  name: "DIP DASH",
  alias: "DIP_INK",
  experience: "7+ Years",
  specialty: "Black & Grey / Realism",
  bio: "Mastering the balance between shadow and skin. Focused on custom large-scale realism and intricate fine-line work that ages as a legacy.",
  skills: [
    { name: "Portrait Realism", icon: <Info size={14} /> },
    { name: "Custom Stencil Design", icon: <Zap size={14} /> },
    { name: "Cover-up Specialist", icon: <ShieldCheck size={14} /> },
  ],
  gallery: [
    {
      id: 1,
      title: "The Lion’s Pride",
      type: "Full Sleeve",
      image: WorkImg1,
      hours: "12 Hours",
    },
    {
      id: 2,
      title: "Geometric Soul",
      type: "Back Piece",
      image: WorkImg2,
      hours: "8 Hours",
    },
    {
      id: 3,
      title: "Floral Anatomy",
      type: "Forearm",
      image: WorkImg3,
      hours: "5 Hours",
    },
  ],
  booking: {
    whatsapp: "https://wa.me/8801641651210",
    email: "dip.ink@gopis.com",
    studio: "GOPIS Tattoo Studio",
  },
};

export default function ArtistPortfolio() {
  const [selectedWork, setSelectedWork] = useState(0);

  return (
    <div className="bg-black text-white selection:bg-[#E11D5C]">
      {/* 1. HERO SECTION WITH PERSONAL IMAGE */}
      <section className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Text Content */}
        <div className="relative z-10 flex flex-col justify-end p-6 md:p-20 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-[#E11D5C]" />
              <span className="text-[#E11D5C] font-black uppercase tracking-[0.5em] text-xs">
                Resident Artist
              </span>
            </div>
            <h1 className="text-7xl md:text-[8vw] font-black uppercase tracking-tighter leading-[0.8] mb-6">
              {artistData.name}
            </h1>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-sm mb-8">
              {artistData.specialty} — {artistData.experience}
            </p>
            <p className="max-w-md text-zinc-400 font-medium leading-relaxed mb-10">
              {artistData.bio}
            </p>
            <div className="flex flex-wrap gap-3">
              {artistData.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="px-4 py-2 bg-zinc-950 border border-zinc-900 text-[10px] font-black uppercase tracking-widest hover:border-[#E11D5C] transition-colors"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Dip Dash Portrait Image */}
        <div className="relative h-[60vh] lg:h-screen order-1 lg:order-2">
          <Image
            src={DipPortrait}
            alt="Dip Dash Portrait"
            fill
            className="object-cover transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent lg:bg-gradient-to-l lg:from-black/20 lg:to-transparent" />
        </div>
      </section>

      {/* 2. RESPONSIVE GALLERY (Optimized for Mobile) */}
      <section className="py-24 px-6 md:px-20 border-t border-zinc-900">
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Master <span className="text-zinc-800">Gallery</span>
          </h2>
        </div>

        {/* Mobile View: Vertical Scroll Cards */}
        <div className="grid grid-cols-1 gap-6 lg:hidden">
          {artistData.gallery.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-950 border border-zinc-900 overflow-hidden"
            >
              <div className="relative aspect-[5/5]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2 border border-zinc-800 text-[10px] font-black text-[#E11D5C]">
                  {item.hours}
                </div>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#E11D5C] mb-1">
                  {item.type}
                </p>
                <h3 className="text-xl font-black uppercase tracking-tight">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Interactive Side-by-Side */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-4">
            {artistData.gallery.map((item, i) => (
              <button
                key={item.id}
                onMouseEnter={() => setSelectedWork(i)}
                className={`group w-full flex items-center justify-between p-8 border transition-all duration-500 ${
                  selectedWork === i
                    ? "bg-[#E11D5C] border-[#E11D5C]"
                    : "bg-zinc-950 border-zinc-900 hover:border-zinc-700"
                }`}
              >
                <div className="text-left">
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedWork === i ? "text-white" : "text-[#E11D5C]"}`}
                  >
                    {item.type}
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {item.title}
                  </h3>
                </div>
                <ChevronRight
                  className={`transition-transform duration-300 ${selectedWork === i ? "rotate-90" : "group-hover:translate-x-2"}`}
                />
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 relative h-[600px] overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedWork}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={artistData.gallery[selectedWork].image}
                  alt={artistData.gallery[selectedWork].title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="absolute top-8 right-8 bg-black/80 backdrop-blur-md px-6 py-3 border border-zinc-800">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-1">
                    Session Time
                  </p>
                  <p className="font-black text-[#E11D5C]">
                    {artistData.gallery[selectedWork].hours}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. CTA & FOOTER */}
      <section className="py-40 px-6 md:px-20 text-center relative overflow-hidden bg-zinc-950">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-7xl md:text-[15vw] font-black uppercase tracking-tighter leading-none mb-12">
            Get <br /> Marked.
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a
              href={artistData.booking.whatsapp}
              className="w-full md:w-auto px-12 py-6 bg-[#E11D5C] text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all flex items-center justify-center gap-3"
            >
              <Calendar size={16} /> Book a Consultation
            </a>
            <a
              href={`mailto:${artistData.booking.email}`}
              className="w-full md:w-auto px-12 py-6 border border-zinc-800 text-white font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition-all flex items-center justify-center gap-3"
            >
              <Mail size={16} /> Contact Studio
            </a>
          </div>
        </motion.div>
        <div className="absolute top-1/4 left-10 opacity-5">
          <InstagramIcon size={200} strokeWidth={1} />
        </div>
      </section>

      <footer className="py-10 px-6 md:px-20 border-t border-zinc-900 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">
        <p>© 2026 {artistData.alias}</p>
        <p>{artistData.booking.studio}</p>
      </footer>
    </div>
  );
}
