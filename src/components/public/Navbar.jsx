"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/icon.png";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const leftNav = [
    { name: "Home", href: "/" },
    { name: "Our Works", href: "/works" },
    { name: "ARTISTS", href: "/artists" },
    { name: "Members", href: "/members" },
    { name: "Blogs", href: "/blogs" },
    { name: "Reviews", href: "/allreviews" },
  ];

  const rightNav = [
    { name: "Founder", href: "/founder" },
    { name: "Locate  us", href: "/locate" },
    { name: "Contact  Us", href: "/contact" },
    { name: "Courses", href: "/courses" },
  ];

  const allLinks = [...leftNav, ...rightNav];

  // Helper for active link coloring using inline Tailwind arbitrary values
  const getLinkStyles = (href) => {
    return pathname === href
      ? "text-[#E11D5C] font-medium"
      : "text-white hover:text-white/80";
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-black backdrop-blur-xl py-4 md:py-6 border-b border-zinc-900/50 z-90">
        <div className="container mx-auto px-6 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] md:gap-6">
          {/* --- MOBILE LOGO / DESKTOP HIDDEN --- */}
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="relative w-10 h-10 p-3 bg-white rounded-full">
              <Image
                src={Logo}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="font-black uppercase font-serif text-[20px] tracking-wide text-white block">
              {" "}
              Gopis Tattoo Studio
            </span>
          </Link>

          {/* --- DESKTOP: LEFT NAVIGATION --- */}
          <div className="hidden lg:flex justify-end items-center gap-10">
            {leftNav.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={`text-[13px] uppercase font-semibold tracking-wider transition-colors duration-300 ${getLinkStyles(link.href)}`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* --- DESKTOP: CENTER LOGO --- */}
          <Link
            href="/"
            className="hidden lg:flex flex-col items-center gap-1.5 group"
          >
            <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-105">
              <Image
                src={Logo}
                alt="Gopis Tattoo Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center">
              <span className="block font-black uppercase text-[12px] tracking-widest text-white leading-none mb-2">
                Gopis
              </span>
              <span className="block text-[8px] uppercase tracking-[0.4em] font-medium text-white">
                Tattoo STUDIO
              </span>
            </div>
          </Link>

          {/* --- DESKTOP: RIGHT NAVIGATION --- */}
          <div className="hidden lg:flex justify-start items-center gap-10">
            {rightNav.map((link) => (
              <Link key={link.name} href={link.href}>
                <span
                  className={`text-[13px] uppercase tracking-wider transition-colors duration-300 ${getLinkStyles(link.href)}`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <button
            className="lg:hidden p-2 text-white bg-zinc-900/50 rounded-lg hover:bg-zinc-800 transition-colors"
            onClick={() => setIsMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY DRAWER --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-black p-8 lg:hidden flex flex-col min-h-screen"
          >
            <div className="flex justify-between items-center mb-12 border-b border-zinc-900 pb-6">
              <div className="flex items-center gap-3 flex-col">
                <div className="relative w-10 h-10">
                  <Image
                    src={Logo}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-white tracking-widest uppercase italic text-sm">
                  Gopis TATTOO Studio
                </span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-3 bg-zinc-900 text-white rounded-full hover:bg-[#E11D5C] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {allLinks.map((link, i) => (
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  key={link.name}
                >
                  <Link href={link.href} onClick={() => setIsMobileOpen(false)}>
                    <span
                      className={`text-3xl font-extrabold uppercase italic tracking-tighter ${pathname === link.href ? "text-[#E11D5C]" : "text-zinc-500"}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
