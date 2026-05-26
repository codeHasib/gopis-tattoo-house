"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] text-zinc-500 py-24 px-6 border-t border-zinc-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          {/* LEFT: LINKS */}
          <div className="flex flex-col gap-6">
            <nav className="flex flex-col gap-4">
              <Link
                href="/privacy-policy"
                className="text-[12px] font-black uppercase tracking-[0.4em] hover:text-[#E11D5C] transition-colors w-fit"
              >
                Privacy & Policy
              </Link>
              <Link
                href="/pre-tattoo-guide"
                className="text-[12px] font-black uppercase tracking-[0.4em] hover:text-[#E11D5C] transition-colors w-fit underline underline-offset-8 decoration-zinc-800 hover:decoration-[#E11D5C]"
              >
                Essential: Before Getting Inked
              </Link>
            </nav>
          </div>

          {/* RIGHT: CREDITS */}
          <div className="text-right flex flex-col items-end gap-2">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] leading-relaxed">
              Designed & Developed by{" "}
              <a
                href="https://codehasib-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#E11D5C] transition-colors border-b border-zinc-800 hover:border-[#E11D5C]"
              >
                Mohammad Hasib
              </a>
            </p>
            <span className="text-[12px] font-medium opacity-90 uppercase tracking-[0.5em]">
              © {currentYear} All Rights Reserved
            </span>
          </div>
        </div>

        {/* BOTTOM DECOR: LARGE FADED TEXT */}
        <div className="mt-24 pt-12 border-t border-zinc-900/30 flex justify-center overflow-hidden">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.03 }}
            className="text-5xl font-black uppercase tracking-tighter leading-none select-none whitespace-nowrap"
          >
            Studio Signature
          </motion.span>
        </div>
      </div>
    </footer>
  );
}
