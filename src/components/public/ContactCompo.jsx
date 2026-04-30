"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";

// custom SVG components for the missing brand icons
const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const PinterestIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
  </svg>
);

export default function ContactSection() {
  const socials = [
    { name: "Instagram", icon: <InstagramIcon />, link: "#" },
    {
      name: "WhatsApp",
      icon: <MessageCircle size={20} />,
      link: "https://wa.me/8801641651210",
    },
    { name: "Facebook", icon: <FacebookIcon />, link: "https://www.facebook.com/Gopisfav55" },
    { name: "TikTok", icon: <TikTokIcon />, link: "" },
    { name: "Pinterest", icon: <PinterestIcon />, link: "https://in.pinterest.com/GopisFav1/" },
    {
      name: "Gmail",
      icon: <Mail size={20} />,
      link: "mailto:yourgmail@gmail.com",
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-6 border-t border-zinc-900 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT SIDE: DIGITAL CONNECTION */}
        <div className="space-y-12">
          <div>
            <span className="text-[#E11D5C] font-bold uppercase tracking-[0.4em] text-xs">
              Get Inked
            </span>
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mt-4 leading-[0.85]">
              Start Your <br /> <span className="text-zinc-800">Legacy</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.link}
                target="_blank"
                whileHover={{ x: 10 }}
                className="group flex items-center justify-between p-6 bg-zinc-950 border border-zinc-900 hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-zinc-500 group-hover:text-[#E11D5C] transition-colors">
                    {social.icon}
                  </span>
                  <span className="font-bold uppercase tracking-widest text-sm">
                    {social.name}
                  </span>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-zinc-800 group-hover:text-[#E11D5C] transition-colors"
                />
              </motion.a>
            ))}
          </div>

          {/* Direct Phone Contact */}
          <div className="p-8 bg-[#E11D5C] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Phone size={24} />
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest opacity-80">
                  Direct Line
                </p>
                <p
                  className="text-xl font-black line-nums"
                  style={{ fontVariantNumeric: "lining-nums" }}
                >
                  +880 1641 651210
                </p>
              </div>
            </div>
            <a
              href="tel:+8801641651210"
              className="bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-tighter text-xs hover:bg-black hover:text-white transition-all text-center"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* RIGHT SIDE: LOCATION */}
        <div className="relative flex flex-col h-full">
          <div className="bg-zinc-950 border border-zinc-900 p-10 h-full relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <MapPin size={200} strokeWidth={1} />
            </div>

            <div className="relative z-10 space-y-8">
              <h3 className="text-3xl font-black uppercase tracking-tighter">
                The Sanctuary
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-[#E11D5C] font-black uppercase tracking-widest text-[10px] mb-2">
                    Location
                  </p>
                  <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-xs">
                    Your Studio Address Street,
                    <br />
                    City, Zip Code,
                    <br />
                    Country
                  </p>
                </div>

                <div>
                  <p className="text-[#E11D5C] font-black uppercase tracking-widest text-[10px] mb-2">
                    Hours
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm font-bold uppercase tracking-tight text-zinc-300">
                    <p>Mon — Fri</p>{" "}
                    <p className="text-white text-right">11am — 9pm</p>
                    <p>Sat — Sun</p>{" "}
                    <p className="text-white text-right">12pm — 7pm</p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <motion.a
                  href="https://www.google.com/maps/place/Gopis+Tattoo+Studio/@22.3474009,91.814183,17z/data=!3m1!4b1!4m6!3m5!1s0x30acd902ce5fc937:0x60610ef88d7a8e9!8m2!3d22.3474009!4d91.8167579!16s%2Fg%2F11m6y1gkxy?entry=ttu&g_ep=EgoyMDI2MDQyOC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-48 bg-zinc-900 relative overflow-hidden flex items-center justify-center border border-zinc-800 cursor-pointer block"
                >
                  <span className="relative z-10 font-black uppercase tracking-[0.3em] text-[10px] bg-black px-6 py-3 border border-zinc-700">
                    Open in Google Maps
                  </span>
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER-LIKE BRANDING */}
      <div className="max-w-[1400px] mx-auto mt-24 pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.5em]">
          © 2026 GOPIS TATTOO STUDIO
        </p>
        <div className="flex gap-8 opacity-20 hover:opacity-100 transition-opacity">
          <span className="text-white font-black uppercase tracking-tighter text-4xl italic">
            AUTHENTIC
          </span>
          <span className="text-white font-black uppercase tracking-tighter text-4xl italic">
            INCORRUPTIBLE
          </span>
        </div>
      </div>
    </section>
  );
}
