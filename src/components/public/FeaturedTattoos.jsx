"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import TattooOne from "../../../public/images/tattoo1.jpg";
import TattooTwo from "../../../public/images/tattoo2.jpg";
import TattooThree from "../../../public/images/tattoo3.jpg";

const TATTOOS = [
  {
    id: 1,
    title: "Realistic Portrait",
    category: "Black & Gray",
    src: TattooOne,
    color: "bg-zinc-900",
  },
  {
    id: 2,
    title: "Japanese Sleeve",
    category: "Traditional",
    src: TattooTwo,
    color: "bg-zinc-800",
  },
  {
    id: 3,
    title: "Minimalist Geometry",
    category: "Fine Line",
    src: TattooThree,
    color: "bg-zinc-700",
  },
];

export default function FeaturedTattoos() {
  return (
    <section className="relative bg-white pb-32">
      {/* SECTION HEADER - Stays centered while cards pass */}
      <div className="h-[40vh] flex flex-col items-center justify-center text-center px-6">
        <span className="text-[#E11D5C] font-bold uppercase tracking-[0.4em] text-xs mb-4">
          Masterpieces
        </span>
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-black">
          THE BEST <br /> WORK
        </h2>
      </div>

      {/* STACKING CARDS CONTAINER */}
      <div className="relative max-w-5xl mx-auto px-6">
        {TATTOOS.map((tattoo, i) => {
          return <Card key={tattoo.id} {...tattoo} i={i} />;
        })}
      </div>

      {/* FINAL CTA */}
      <div className="flex justify-center mt-32">
        <Link
          href="https://wa.me/8801641651210?text=Hello%20there!"
          target="_blank"
          className="group relative px-12 py-5 bg-[#E11D5C] text-white font-black uppercase tracking-widest text-sm rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(225,29,92,0.3)]"
        >
          <span className="relative z-10">Appoint Now</span>
          <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}

function Card({ title, category, src, color, i }) {
  return (
    <div className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: "-20%" }}
        transition={{ duration: 0.5 }}
        className={`relative w-full h-[450px] md:h-[550px] rounded-[30px] overflow-hidden shadow-2xl ${color} border border-white/10`}
        /* 
           The 'top' value here ensures they stack with a small gap visible 
           at the top, while the flex-center above keeps them in the middle 
        */
        style={{ top: `calc(10% + ${i * 30}px)` }}
      >
        <div className="absolute inset-0">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        {/* CARD CONTENT */}
        <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[#E11D5C] text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">
              {category}
            </span>
            <h3 className="text-white text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
              {title}
            </h3>
          </div>

          <span className="text-white/30 font-bold uppercase text-[9px] tracking-[0.3em]">
            Archive / 00{i + 1}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// function Card({ title, category, src, color, i }) {
//   // Logic to handle the "Stacking" scaling effect as we scroll
//   return (
//     <div className="h-screen flex items-center justify-center sticky top-0">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9, y: 50 }}
//         whileInView={{ opacity: 1, scale: 1, y: 0 }}
//         viewport={{ margin: "-10%" }}
//         transition={{ duration: 0.5 }}
//         className={`relative w-full h-[500px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl ${color} border border-white/10`}
//         style={{ top: `calc(-10% + ${i * 25}px)` }} // Offsets each card slightly
//       >
//         <div className="absolute inset-0">
//           <Image
//             src={src}
//             alt={title}
//             fill
//             className="object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
//         </div>

//         {/* CARD CONTENT */}
//         <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
//           <div>
//             <span className="text-[#E11D5C] text-xs font-bold uppercase tracking-[0.3em] mb-2 block">
//               {category}
//             </span>
//             <h3 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
//               {title}
//             </h3>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="w-12 h-[1px] bg-white/30 hidden md:block" />
//             <span className="text-white/50 font-bold uppercase text-[10px] tracking-widest">
//               Series 2026
//             </span>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }
